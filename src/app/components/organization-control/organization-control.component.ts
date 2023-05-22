import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IField } from "../../dynamic-form.module";
import { FieldControlComponent } from "../field-wraper/field-wraper.component";
@Component({
  selector: 'organization-control',
  templateUrl: './organization-control.component.html',
  styleUrls: []
})
export class OrganizationControlComponent implements FieldControlComponent {
  @Input() form!: FormGroup;
  @Input() field: IField;
}
