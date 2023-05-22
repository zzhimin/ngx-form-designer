import { Component, Input, forwardRef, OnInit } from '@angular/core';
import { IField } from "../../dynamic-form.module";
import { differenceInCalendarDays, setHours } from 'date-fns';
import { DisabledTimeFn, DisabledTimePartial } from 'ng-zorro-antd/date-picker';
import {
  FormGroup,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
} from '@angular/forms';
@Component({
  selector: 'datetime',
  templateUrl: './datetime.component.html',
  styleUrls: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatetimeComponent),
      multi: true,
    },
  ],
})
export class DatetimeComponent implements ControlValueAccessor, OnInit  {
  @Input() field: IField;
  today = new Date();
  selectTime: null | number = null;

  constructor() {

  }
  ngOnInit(): void {
  }

  onChange($event: Date | Date[]) {
    let time: number | number[];
    if(Array.isArray($event)) {
      time = $event.map(item => new Date(item).getTime());
    } else {
      time = new Date($event).getTime();
    }
    
    this.propagateChange(time);
  }

  disabledDate = (current: Date): boolean => {
    // Can not select days before today and today
    return differenceInCalendarDays(current, this.today) > 0;
  };

  writeValue(value: any) {
    if (value) {
      // TODO
      this.selectTime = 1657849474944;
    }
  }
  propagateChange = (_: any) => {};

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) {}
}
