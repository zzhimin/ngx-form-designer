import { Component, OnInit, OnDestroy, Input, ViewContainerRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IBaseField, IField, IBaseFormSchema, IFormSchema } from "../../dynamic-form.module";
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from "ng-zorro-antd/message";
import { getKey } from "../../utils";
import { cloneDeep } from 'lodash';
@Component({
  selector: 'form-renderer',
  templateUrl: './form-renderer.component.html',
  styleUrls: ['./form-renderer.component.scss']
})
export class FormRendererComponent implements OnInit, OnDestroy {
  @Input() formSchema!: IFormSchema;

  getKey = getKey;

  validateForm: FormGroup;
  valueChangeSub!: Subscription;

  subscriptions: Subscription[] = [];
  constructor(
    private modal: NzModalService,
    private message: NzMessageService,
    private viewContainerRef: ViewContainerRef,
    private fb: FormBuilder,) {

  }
  ngOnInit(): void {
    console.log('this.formSchema :>> ', this.formSchema);

    this.validateForm = this.fb.group(this.generateFormControl());
    console.log('this.validateForm :>> ', this.validateForm);

    this.generateValue(); // 字段数据联动 js脚本 
    
    // TODO表单提交验证 
    // 流程提交的时候需触发的函数验证 暂时先放这里 
    this.valueChangeSub = this.validateForm.valueChanges.subscribe(formValue => {
      setTimeout(() => {
        this.setupValidators(formValue);
      }, 16);
    })
  }
  ngOnDestroy(): void {
    this.valueChangeSub?.unsubscribe();
    this.subscriptions?.forEach(subscription => subscription.unsubscribe());
    this.subscriptions.length = 0;
  }

  generateFormControl() {
    let group: any = {};
    cloneDeep(this.formSchema).fields.forEach(field => {
      const valitator = [];
      const require = field.templateOptions.require;
      const maxLength = field.templateOptions.maxLength ? field.templateOptions.maxLength : false;
      const minLength = field.templateOptions.minLength ? field.templateOptions.minLength : false;
      const email = field.templateOptions.email ? field.templateOptions.email : false;
      if (require) valitator.push(Validators.required);
      if (maxLength) valitator.push(Validators.maxLength(field.templateOptions.maxLength));
      if (minLength) valitator.push(Validators.minLength(field.templateOptions.minLength));
      if (email) valitator.push(Validators.email);

      group[getKey(field.customKey || field.key)] = [{value: null, disabled: field.templateOptions?.disable ?? false}, valitator];

    });
    return group;
  }
  
  // 表单提交验证
  setupValidators(formValue: { [key: string]: any }) {
    const validators = this.formSchema.validators;
    if(!validators.script) return;
    let defaultValueFunction = null;
    try {
      defaultValueFunction = new Function('selectFields', 'formValue', validators.script);
    } catch (error) {
      defaultValueFunction = null;
    };

    if (defaultValueFunction) {
      // 初始化的时候需返回一个默认值
      const value = defaultValueFunction(this.formSchema.fields, formValue);
      if(!value) {
        this.message.info(validators.tipsText);
      }
    }
  }

  generateValue() {
    this.formSchema.fields.forEach(field => {
      this.setupFieldDefaultValue(field);
    })
  }
  // 字段数据联动
  setupFieldDefaultValue(currentField: IField) {
    let defaultValueFunction = null;
    try {
      defaultValueFunction = new Function('currentField', 'validateForm', 'selectFields', currentField.relation);
    } catch (error) {
      defaultValueFunction = null;
    };

    if (defaultValueFunction) {
      // 订阅了 在页面卸载的时候需取消订阅
      const subscriptions = defaultValueFunction(currentField, this.validateForm, this.formSchema.fields);
      if(subscriptions) {
        subscriptions.forEach((sub: any) => this.subscriptions.push(sub));
      }
    }
  }
}
