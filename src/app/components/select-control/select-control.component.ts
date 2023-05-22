import { Component, Input } from '@angular/core';
import { IField } from "../../dynamic-form.module";
import { FormGroup } from '@angular/forms';
import { FieldControlComponent } from "../field-wraper/field-wraper.component";
@Component({
  selector: 'select-control',
  templateUrl: './select-control.component.html',
  styleUrls: []
})
export class SelectControlComponent implements FieldControlComponent {
  @Input() form!: FormGroup;
  @Input() field: IField;
}
