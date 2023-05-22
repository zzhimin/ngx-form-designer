import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgZorroAntdModule } from "../ngZorroAntd.module";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';

import { BasicInputComponent } from "./input/basic-input.component";
import { BasicTextareaComponent } from "./textarea/basic-textarea.component";
import { BasicRadioComponent } from "./radio/basic-radio.component";
import { BasicCheckboxComponent } from "./checkbox/basic-checkbox.component";
import { BasicSwitchComponent } from "./switch/basic-switch.component";
import { BasicSelectComponent } from "./select/basic-select.component";
import { DatetimeComponent } from "./datetime/datetime.component";
import { OrganizationSelectComponent } from "./organization-select/organization-select.component";
import { DashboardSelectComponent } from "./dashboard-select/dashboard-select.component";
import { ImageUploadComponent } from "./image-upload/image-upload.component";

const component: any = [
  BasicInputComponent,
  BasicTextareaComponent,
  BasicRadioComponent,
  BasicCheckboxComponent,
  BasicSwitchComponent,
  BasicSelectComponent,
  DatetimeComponent,
  OrganizationSelectComponent,
  DashboardSelectComponent,
  ImageUploadComponent,
];

@NgModule({
  providers: [],
  declarations: component,
  imports: [
    CommonModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    FormsModule,
    NzFormModule,
  ],
  exports: component,
})
export class BasicFieldModule {}
