import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { IBaseField, IField } from "../../dynamic-form.module";
import { DynamicFormService } from "../../dynamic-form.service";
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
@Component({
  selector: 'field-config',
  templateUrl: './field-config.component.html',
  styleUrls: ['./field-config.component.scss']
})
export class FieldConfigComponent implements OnInit {
  @Input() activeField: IField | null;
  
  @Input() validateForm!: FormGroup;
  constructor() {

  }
  ngOnInit(): void {
  }
}
