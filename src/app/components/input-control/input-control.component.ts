import { Component, Input } from '@angular/core';
import { IField } from "../../dynamic-form.module";
import { FormGroup } from '@angular/forms';
import { FieldControlComponent } from "../field-wraper/field-wraper.component";
@Component({
  selector: 'input-control',
  templateUrl: './input-control.component.html',
  styleUrls: []
})
export class InputControlComponent implements FieldControlComponent {
  @Input() form: FormGroup;
  @Input() field: IField;
}
