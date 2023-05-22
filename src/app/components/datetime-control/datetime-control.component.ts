import { Component, Input } from '@angular/core';
import { IField } from "../../dynamic-form.module";
import { FormGroup } from '@angular/forms';
import { FieldControlComponent } from "../field-wraper/field-wraper.component";
@Component({
  selector: 'datetime-control',
  templateUrl: './datetime-control.component.html',
  styleUrls: []
})
export class DatetimeControlComponent implements FieldControlComponent {
  @Input() form!: FormGroup;
  @Input() field: IField;
}
