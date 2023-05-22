import { Component, Input, forwardRef, OnInit } from '@angular/core';
import { IField } from "../../dynamic-form.module";
import {
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
} from '@angular/forms';
@Component({
  selector: 'basic-checkbox',
  templateUrl: './basic-checkbox.component.html',
  styleUrls: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BasicCheckboxComponent),
      multi: true,
    },
  ],
})
export class BasicCheckboxComponent implements ControlValueAccessor, OnInit  {
  @Input() field: IField;

  constructor(private fb: FormBuilder,) {

  }
  ngOnInit(): void {
  }

  valueChange($event: any) {
    // TODO 需要整理数据格式
    const select = $event.filter((item: any) => item.checked);
    this.propagateChange(select);
  }

  writeValue(value: any) {
    if (value) {
      // this.checkOptions = value;
    }
  }
  propagateChange = (_: any) => {};

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) {}
}
