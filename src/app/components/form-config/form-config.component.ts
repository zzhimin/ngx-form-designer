import { Component, OnInit, Input, ChangeDetectorRef, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';
import { IBaseField, IField } from "../../dynamic-form.module";
import { DynamicFormService } from "../../dynamic-form.service";
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { FormVerificationComponent } from "../form-verification/form-verification.component";
/*
* @Author: zouzm
* @Description: 表单属性
*/
@Component({
  selector: 'form-config',
  templateUrl: './form-config.component.html',
  styleUrls: ['./form-config.component.scss']
})
export class FormConfigComponent implements OnInit {
  formConf = {
    width: 100,
    unit: '%',
    name: this.DFService.formJson$.value.name,
    id: this.DFService.formJson$.value.id,
    key: this.DFService.formJson$.value.key,
    layout: this.DFService.formJson$.value.layout,
    nameHeight: this.DFService.formJson$.value.nameHeight,
    background: this.DFService.formJson$.value.background,
    horizontal: this.DFService.formJson$.value.gutter[0], // 水平间距
    vertical: this.DFService.formJson$.value.gutter[1], // 垂直间距
    widthChange: () => {
      if(this.formConf.unit == '%' && this.formConf.width > 100) {
        this.formConf.width = 100;
        this.cd.detectChanges();
      };
      const value = `${this.formConf.width}${this.formConf.unit}`;
      const newData = Object.assign(this.DFService.formJson$.value, {width: value});
      this.DFService.formJson$.next(newData);
    },
    change: ($event: string, key: any) => {
      const newData = Object.assign(this.DFService.formJson$.value, {[key]: $event});
      this.DFService.formJson$.next(newData);
    },
    gutterChange: () => {
      const gutter = [this.formConf.horizontal, this.formConf.vertical];
      const newData = Object.assign(this.DFService.formJson$.value, {gutter});
      this.DFService.formJson$.next(newData);
    }
  }
  constructor(private DFService: DynamicFormService,
    private modal: NzModalService, 
    private viewContainerRef: ViewContainerRef,
    private cd: ChangeDetectorRef,) {

  }
  ngOnInit(): void {
  }

  addCondition() {
    const content = this.DFService.formJson$.value.validators.script;
    const tipsText = this.DFService.formJson$.value.validators.tipsText;
    const modal = this.modal.create({
      nzTitle: '配置校验规则',
      nzWidth: '40%',
      nzContent: FormVerificationComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
        content: content,
        text: `配置校验规则：f(selectFields, formValue)`,
        tipsText: tipsText
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
            const validators = {
              script: componentInstance?.inputValue,
              tipsText: componentInstance?.tipsText
            }
            const formJson = this.DFService.formJson$.value;
            const newValue = Object.assign(formJson, {validators: validators});
            this.DFService.formJson$.next(newValue);
            modal.close();
          }
        }
      ]
    });
    const instance = modal.getContentComponent();
    modal.afterOpen.subscribe(() => {

    });
    modal.afterClose.subscribe(() => {
      
    });
  }
}
