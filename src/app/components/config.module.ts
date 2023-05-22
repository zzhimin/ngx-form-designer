import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgZorroAntdModule } from "../ngZorroAntd.module";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BasicFieldModule } from "../models/basicField.module";

import { FormRendererComponent } from "./form-renderer/form-renderer.component";
import { SubformControlRenderComponent } from "./form-renderer/subform-control-render/subform-control-render.component";
import { FieldWraperComponent } from "./field-wraper/field-wraper.component";
import { AnchorComponent } from "./anchor/anchor.component";
import { FieldConfigComponent } from "./field-config/field-config.component";
import { LabelConfigComponent } from "./label-config/label-config.component";
import { LayoutConfigComponent } from "./layout-config/layout-config.component";
import { PreviewComponent } from "./preview/preview.component";
import { FormConfigComponent } from "./form-config/form-config.component";
import { FormVerificationComponent } from "./form-verification/form-verification.component";
import { EditScriptComponent } from "./edit-script/edit-script.component";

// 基础字段 config
import { InputConfigComponent } from "./input-config/input-config.component";
import { TextareaConfigComponent } from "./textarea-config/textarea-config.component";
import { RadioConfigComponent } from "./radio-config/radio-config.component";
import { CheckboxConfigComponent } from "./checkbox-config/checkbox-config.component";
import { SwitchConfigComponent } from "./switch-config/switch-config.component";
import { SelectConfigComponent } from "./select-config/select-config.component";
import { DatetimeConfigComponent } from "./datetime-config/datetime-config.component";
import { TextConfigComponent } from "./text-config/text-config.component";
import { DividerConfigComponent } from "./divider-config/divider-config.component";
// 增强字段 config
import { SubformConfigComponent } from "./subform-config/subform-config.component";
import { OrganizationConfigComponent } from "./organization-config/organization-config.component";
import { DashboardSelectConfigComponent } from "./dashboard-select-config/dashboard-select-config.component";
import { ImageUploadConfigComponent } from "./image-upload-config/image-upload-config.component";

// control
import { InputControlComponent } from "./input-control/input-control.component";
import { TextareaControlComponent } from "./textarea-control/textarea-control.component";
import { RadioControlComponent } from "./radio-control/radio-control.component";
import { CheckboxControlComponent } from "./checkbox-control/checkbox-control.component";
import { SwitchControlComponent } from "./switch-control/switch-control.component";
import { SelectControlComponent } from "./select-control/select-control.component";
import { DatetimeControlComponent } from "./datetime-control/datetime-control.component";
import { TextControlComponent } from "./text-control/text-control.component";
import { DividerControlComponent } from "./divider-control/divider-control.component";
import { SubformControlComponent } from "./subform-control/subform-control.component";
import { OrganizationControlComponent } from "./organization-control/organization-control.component";
import { DashboardSelectControlComponent } from "./dashboard-select-control/dashboard-select-control.component";
import { ImageUploadControlComponent } from "./image-upload-control/image-upload-control.component";

const fieldConfigComponent: any = [
  FormRendererComponent,
  SubformControlRenderComponent,
  FieldWraperComponent,
  AnchorComponent,
  FieldConfigComponent,
  LabelConfigComponent,
  LayoutConfigComponent,
  PreviewComponent,
  FormConfigComponent,
  FormVerificationComponent,
  EditScriptComponent,
  
  InputConfigComponent,
  TextareaConfigComponent,
  RadioConfigComponent,
  CheckboxConfigComponent,
  SwitchConfigComponent,
  SelectConfigComponent,
  DatetimeConfigComponent,
  TextConfigComponent,
  DividerConfigComponent,
  SubformConfigComponent,
  OrganizationConfigComponent,
  DashboardSelectConfigComponent,
  ImageUploadConfigComponent,
  
  InputControlComponent,
  TextareaControlComponent,
  RadioControlComponent,
  CheckboxControlComponent,
  SwitchControlComponent,
  SelectControlComponent,
  DatetimeControlComponent,
  TextControlComponent,
  DividerControlComponent,
  SubformControlComponent,
  OrganizationControlComponent,
  DashboardSelectControlComponent,
  ImageUploadControlComponent,
];

@NgModule({
  providers: [],
  declarations: fieldConfigComponent,
  imports: [
    CommonModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    FormsModule,
    NzFormModule,
    DragDropModule,
    BasicFieldModule,
  ],
  exports: fieldConfigComponent,
})
export class ConfigModule {}
