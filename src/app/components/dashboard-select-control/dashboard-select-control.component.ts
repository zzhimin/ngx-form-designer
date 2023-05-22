import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IField } from "../../dynamic-form.module";
import { FieldControlComponent } from "../field-wraper/field-wraper.component";
@Component({
  selector: 'dashboard-select-control',
  templateUrl: './dashboard-select-control.component.html',
  styleUrls: []
})
export class DashboardSelectControlComponent implements FieldControlComponent {
  @Input() form!: FormGroup;
  @Input() field: IField;
}
