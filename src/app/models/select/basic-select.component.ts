import { Component, Input, forwardRef, OnInit } from '@angular/core';
import { IField } from "../../dynamic-form.module";
import {
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
} from '@angular/forms';
@Component({
  selector: 'basic-select',
  templateUrl: './basic-select.component.html',
  styleUrls: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BasicSelectComponent),
      multi: true,
    },
  ],
})
export class BasicSelectComponent implements ControlValueAccessor, OnInit  {
  @Input() field: IField;

  validateForm!: FormGroup;

  constructor(private fb: FormBuilder,) {

  }
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      value: [null],
    });

    this.validateForm.get('value')!.valueChanges.subscribe((value) => {
      this.propagateChange(value);
    });
  }

  writeValue(value: any) {
    if (value) {
      this.validateForm.get('value')!.setValue(value);
    }
  }
  propagateChange = (_: any) => {};

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) {}
}
