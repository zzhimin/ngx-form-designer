import { Component, OnInit, OnDestroy, Input, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IBaseField, IField, IBaseFormSchema } from "../../dynamic-form.module";
import { DynamicFormService } from "../../dynamic-form.service";
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { EditScriptComponent } from "../edit-script/edit-script.component";
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { letterReg } from "../../utils";
@Component({
  selector: 'input-config',
  templateUrl: './input-config.component.html',
  styleUrls: ['./input-config.component.scss']
})
export class InputConfigComponent implements OnInit, OnDestroy {
  @ViewChild('inputRef', { static: false }) inputRef?: ElementRef;

  @Input() 
  get activeField() {
    return this._activeField;
  }
  set activeField(activeField) {
    if(activeField) this.inputConf = activeField;
    this._activeField = activeField;
  }
  _activeField!: IField | null;

  inputConf!: IField;

  @Input() validateForm!: FormGroup;

  isSub: boolean = false; // 是子表单

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
    const content = this.inputConf.relation;
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
            this.inputConf.relation = inputValue;
            console.log('this.inputConf.relation :>> ', this.inputConf.relation);
            modal.close();
          }
        }
      ]
    });
  }

  disableChange($event: boolean) {
    if($event) {
      this.validateForm.get(this.inputConf.key)?.disable();
    } else {
      this.validateForm.get(this.inputConf.key)?.enable();
    }
  }

  customKeyChange($event: any) {
    if(letterReg.test($event) || $event === '') {
      this.inputConf.customKey = $event;
    }
    this.inputRef!.nativeElement.value = this.inputConf.customKey;
  }
}
