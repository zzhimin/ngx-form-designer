import { Component, OnInit, OnDestroy, Input, ViewContainerRef, ElementRef, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IBaseField, IField, IBaseFormSchema } from "../../dynamic-form.module";
import { DynamicFormService } from "../../dynamic-form.service";
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { EditScriptComponent } from "../edit-script/edit-script.component";
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { letterReg } from "../../utils";
@Component({
  selector: 'checkbox-config',
  templateUrl: './checkbox-config.component.html',
  styleUrls: ['./checkbox-config.component.scss']
})
export class CheckboxConfigComponent implements OnInit, OnDestroy {
  @ViewChild('inputRef', { static: false }) inputRef?: ElementRef;
  @Input() 
  get activeField() {
    return this._activeField;
  }
  set activeField(activeField) {
    if(activeField) this.fieldConf = activeField;
    this._activeField = activeField;
  }
  _activeField!: IField | null;

  fieldConf!: IField;

  @Input() validateForm!: FormGroup;

  ids: number = 3;

  constructor(private DFService: DynamicFormService,
    private modal: NzModalService, 
    private viewContainerRef: ViewContainerRef,) {

  }
  ngOnInit(): void {
  }
  ngOnDestroy(): void {
  }

  // 数据联动
  editJS() {
    const content = this.fieldConf.relation;
    const modal = this.modal.create({
      nzTitle: '数据联动',
      nzWidth: '50%',
      nzContent: EditScriptComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
        content: content,
        text: `数据联动：f(currentField, validateForm, selectFields)`
      },
      nzFooter: [
        {
          label: '取消',
          type: 'default',
          onClick: componentInstance => {
            modal.close();
          }
        },
        {
          label: '确定',
          type: 'primary',
          onClick: componentInstance => {
            const inputValue = componentInstance!.inputValue;
            this.fieldConf.relation = inputValue;
            console.log('this.fieldConf.relation :>> ', this.fieldConf.relation);
            modal.close();
          }
        }
      ]
    });
  }

  addOpts() {
    this.fieldConf.templateOptions.options.push(
      {
        label: `选项${++this.ids}`,
        value: `value${this.ids}`
      }
    )
  }
  removeOpt(opt: {label: string; value: string | number}) {
    const ids = this.fieldConf.templateOptions.options.findIndex((o: {label: string; value: string | number}) => o.value === opt.value);
    if(ids > -1) {
      this.fieldConf.templateOptions.options.splice(ids, 1);
    }
  }

  customKeyChange($event: any) {
    if(letterReg.test($event) || $event === '') {
      this.fieldConf.customKey = $event;
    }
    this.inputRef!.nativeElement.value = this.fieldConf.customKey;
  }
}
