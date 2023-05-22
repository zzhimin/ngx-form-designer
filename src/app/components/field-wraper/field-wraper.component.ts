import { Component, OnInit, Input, ViewChild, ViewContainerRef, ComponentRef, OnDestroy, ComponentFactoryResolver } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IBaseField, IField } from "../../dynamic-form.module";
import { AnchorComponent } from "../anchor/anchor.component";
import { InputControlComponent } from "../input-control/input-control.component";
import { TextareaControlComponent } from "../textarea-control/textarea-control.component";
import { DividerControlComponent } from "../divider-control/divider-control.component";
import { RadioControlComponent } from "../radio-control/radio-control.component";
import { CheckboxControlComponent } from "../checkbox-control/checkbox-control.component";
import { SwitchControlComponent } from "../switch-control/switch-control.component";
import { SelectControlComponent } from "../select-control/select-control.component";
import { DatetimeControlComponent } from "../datetime-control/datetime-control.component";
import { SubformControlComponent } from "../subform-control/subform-control.component";
import { SubformControlRenderComponent } from "../form-renderer/subform-control-render/subform-control-render.component";
import { OrganizationControlComponent } from "../organization-control/organization-control.component";
import { DashboardSelectControlComponent } from "../dashboard-select-control/dashboard-select-control.component";
import { TextControlComponent } from "../text-control/text-control.component";
import { ImageUploadControlComponent } from "../image-upload-control/image-upload-control.component";

export interface FieldControlComponent {
  form: FormGroup;
  field: IField;
}
@Component({
  selector: 'field-wraper',
  templateUrl: './field-wraper.component.html',
  styleUrls: ['./field-wraper.component.scss']
})
export class FieldWraperComponent implements OnInit, OnDestroy {
  @ViewChild("fieldContainer", { static: true }) fieldContainer!: AnchorComponent;

  @Input() form!: FormGroup;
  @Input() field: IField;

  @Input() isPreview: boolean; // 是否是预览 form-renderer

  protected componentRef!: ComponentRef<any>;
  constructor() {

  }
  ngOnInit(): void {
    this.createFormControlComponent();
  }
  ngOnDestroy(): void {
    this.componentRef.destroy();
  }

  protected createFormControlComponent(): void {
    const componentType = this.selectComponentByType();

    if (componentType !== null) {
      const viewContainerRef = this.fieldContainer.viewContainerRef;
      viewContainerRef.clear();
      this.componentRef = viewContainerRef.createComponent<FieldControlComponent>(componentType!);
      const component = this.componentRef.instance;
      component.form = this.form;
      component.field = this.field;
    }
  }

  private selectComponentByType() {
    let component;
    switch (this.field.templateOptions.key) {
      case 'input':
        component = InputControlComponent;
        break;
      case 'textarea':
        component = TextareaControlComponent;
        break;
      case 'radio':
        component = RadioControlComponent;
        break;
      case 'checkbox':
        component = CheckboxControlComponent;
        break;
      case 'switch':
        component = SwitchControlComponent;
        break;
      case 'select':
        component = SelectControlComponent;
        break;
      case 'datetime':
        component = DatetimeControlComponent;
        break;
      case 'text':
        component = TextControlComponent;
        break;
      case 'divider':
        component = DividerControlComponent;
        break;
      case 'subform':
        if(this.isPreview) {
          component = SubformControlRenderComponent;
        } else {
          component = SubformControlComponent;
        }
        break;
      case 'organization':
        component = OrganizationControlComponent;
        break;
      case 'dashboard-select':
        component = DashboardSelectControlComponent;
        break;
      case 'image-upload':
        component = ImageUploadControlComponent;
        break;
      default:
        break;
    };

    return component;
  }
}
