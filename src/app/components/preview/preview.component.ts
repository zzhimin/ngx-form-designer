import { Component, OnInit, OnDestroy, Input, ViewContainerRef, ViewChild, TemplateRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DynamicFormService } from "../../dynamic-form.service";
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from "ng-zorro-antd/message";
import { deepClone } from "../../utils";
import { IField, IFormSchema } from "../../dynamic-form.module";
import { FormRendererComponent } from "../form-renderer/form-renderer.component";
import { set } from 'lodash';

@Component({
  selector: 'preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit, OnDestroy {
  @ViewChild('tplFormJsonContent') tplFormJsonContent: TemplateRef<void>;

  @ViewChild('pc') pcComponent: FormRendererComponent;
  @ViewChild('mobile') mobileComponent: FormRendererComponent;

  optType = 'A';

  // validateForm!: FormGroup;

  formJson = this.DFService.formJson$.value;
  selectFields = this.DFService.selectFields$.value;

  // 提供给form-renderer PC端
  pcFormSchema: IFormSchema = (() => {
    const formSchema = deepClone(this.DFService.formJson$.value);
    const fields = deepClone(this.DFService.selectFields$.value);
    return Object.assign(formSchema, {fields});
  })();

  // 提供给form-renderer 移动端
  mobileFormSchema: IFormSchema = (() => {
    const formSchema = deepClone(this.DFService.formJson$.value);
    formSchema.layout = 'vertical';
    const fields = deepClone(this.DFService.selectFields$.value);
    fields.forEach(field => {
      field.layout = 24;
      field.label.layout = 24;
      field.control.layout = 24;
    });
    return Object.assign(formSchema, {fields});
  })();

  isPc: boolean = true;
  pcStyle = {
    width: '630px',
    height: '800px',
  };
  mobileStyle = {
    width: '300px',
    height: '650px',
  };

  constructor(private DFService: DynamicFormService,
    private modal: NzModalService,
    private message: NzMessageService,
    private viewContainerRef: ViewContainerRef,
    private fb: FormBuilder,) {

  }
  ngOnInit(): void {
    // this.validateForm = this.fb.group(this.generateFormControl());
  }
  ngOnDestroy(): void {
  }
  generateFormControl() {
    let group: any = {};
    this.selectFields.forEach(field => {
      const valitator = [];
      const require = field.templateOptions.require;
      const maxLength = field.templateOptions.maxLength ? field.templateOptions.maxLength : false;
      const minLength = field.templateOptions.minLength ? field.templateOptions.minLength : false;
      const email = field.templateOptions.email ? field.templateOptions.email : false;
      if (require) valitator.push(Validators.required);
      if (maxLength) valitator.push(Validators.maxLength(field.templateOptions.maxLength));
      if (minLength) valitator.push(Validators.minLength(field.templateOptions.minLength));
      if (email) valitator.push(Validators.email);

      group[field.key] = [{value: null, disabled: field.templateOptions?.disable ?? false}, valitator];
    });
    return group;
  }

  optChange($event: any) {
    switch ($event) {
      case 'A':
        this.isPc = true;
        break;
      case 'B':
        this.isPc = false;
        break;
      case 'C':
        this.formData();
        break;
      case 'D':
        this.seeFormJSON();
        break;
      default:
        break;
    }
  }
  formData() {
    const formData = this.generateFormData();
    const formDataText = JSON.stringify(formData, null, 4);
    const modal = this.modal.create({
      nzTitle: '表单数据',
      nzWidth: '50%',
      nzContent: this.tplFormJsonContent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
        formData: formDataText,
      },
      nzFooter: null
    });
  }

  seeFormJSON() {
    const formJson = JSON.parse(JSON.stringify(this.DFService.formJson$.value));
    formJson['fields'] = this.DFService.selectFields$.value;
    const formJsonText = JSON.stringify(formJson, null, 4);
    const modal = this.modal.create({
      nzTitle: '表单json',
      nzWidth: '50%',
      nzContent: this.tplFormJsonContent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
        formData: formJsonText,
      },
      nzFooter: null
    });
  }

  public generateFormData() {
    const pcFormValue = this.pcComponent?.validateForm.value;
    const mobileFormValue = this.mobileComponent?.validateForm.value;
    const formData = this.isPc ? pcFormValue : mobileFormValue;
    if (this.selectFields.length <= 0) return formData;
    const valueMap = new Map<string, string>();
    const keys = this.selectFields.map((field: IField) => {
      valueMap.set(field.customKey || field.key, formData[field.key]);
      return field.customKey || field.key;
    });

    let obj: { [key: string]: any } = {};
    keys.forEach(key => set(obj, key, valueMap.get(key)));
    return obj;
  }
}
