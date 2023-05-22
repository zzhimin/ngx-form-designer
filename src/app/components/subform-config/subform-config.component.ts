import { Component, OnInit, OnDestroy, Input, ViewContainerRef, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IBaseField, IField, IBaseFormSchema } from "../../dynamic-form.module";
import { DynamicFormService } from "../../dynamic-form.service";
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { EditScriptComponent } from "../edit-script/edit-script.component";
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { deepClone, guid, letterReg } from 'src/app/utils';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import { cloneDeep } from 'lodash';

import { InputConfigComponent } from "../input-config/input-config.component";
import { TextareaConfigComponent } from "../textarea-config/textarea-config.component";
import { RadioConfigComponent } from "../radio-config/radio-config.component";
import { SwitchConfigComponent } from "../switch-config/switch-config.component";
import { SelectConfigComponent } from "../select-config/select-config.component";

@Component({
  selector: 'subform-config',
  templateUrl: './subform-config.component.html',
  styleUrls: ['./subform-config.component.scss']
})
export class SubformConfigComponent {
  @ViewChild('inputRef', { static: false }) inputRef?: ElementRef;
  @Input()
  get activeField() {
    return this._activeField;
  }
  set activeField(activeField) {
    if (activeField) this.fieldConf = activeField;
    this._activeField = activeField;
  }
  _activeField!: IField | null;

  fieldConf!: IField;

  isadd: boolean = false;
  selectSubField: string = 'Default';
  fieldType: Array<{ label: string; value: string; }> = [
    {
      label: '输入框',
      value: 'input'
    },
    {
      label: '文本域',
      value: 'textarea'
    },
    {
      label: '单选框',
      value: 'radio'
    },
    {
      label: '开关',
      value: 'switch'
    },
    {
      label: '选择框',
      value: 'select'
    },
    {
      label: '组织选择',
      value: 'organization'
    },
    {
      label: '仪表板选择',
      value: 'dashboard-select'
    },
  ]

  @Input() validateForm!: FormGroup;

  ids: number = 2;

  constructor(
    private cdr: ChangeDetectorRef,
    private drawerService: NzDrawerService,
    private DFService: DynamicFormService,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef) {
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


  addField($event: { label: string; value: string; }) {
    console.log('$event :>> ', $event);
    const fs = this.DFService.formFields$.value;
    let f;
    fs.forEach(item => {
      item.list.forEach(l => {
        if(l.templateOptions.key == $event.value) {
          f = deepClone(l);
        }
      })
    });
    if(f) {
      const nf = Object.assign(f, {key: guid()}) as IField;
      this.fieldConf.templateOptions.items.push(nf);
      this.fieldConf.templateOptions.hooks.updateSubFormControls();
    }
    this.isadd = false;
  }
  removeOpt(i: number) {
    this.fieldConf.templateOptions.items.splice(i, 1);
  }

  drop(event: CdkDragDrop<IField[]>) {
    moveItemInArray(this.fieldConf.templateOptions.items, event.previousIndex, event.currentIndex);
  }
  editSubField(field: IField) {
    let component;
    switch (field.templateOptions.key) {
      case 'input':
        component = InputConfigComponent;
        break;
      case 'textarea':
        component = TextareaConfigComponent;
        break;
      case 'radio':
        component = RadioConfigComponent;
        break;
      case 'switch':
        component = SwitchConfigComponent;
        break;
      case 'select':
        component = SelectConfigComponent;
        break;
      default:
        component = InputConfigComponent;
        break;
    }
    const drawerRef = this.drawerService.create<any, any, string>({
      nzTitle: field.zh,
      nzMask: true,
      nzContent: component,
      nzContentParams: {
        activeField: field,
        validateForm: this.validateForm,
        isSub: true
      }
    });

    drawerRef.afterOpen.subscribe(() => {
    });

    drawerRef.afterClose.subscribe(data => {
      this.fieldConf.templateOptions.hooks.updateSubFormControls();
      this.cdr.detectChanges();
      this.cdr.markForCheck();
    });
  }

  customKeyChange($event: any) {
    if(letterReg.test($event) || $event === '') {
      this.fieldConf.customKey = $event;
    }
    this.inputRef!.nativeElement.value = this.fieldConf.customKey;
  }
}
