import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IBaseField, IField, IBaseFormSchema } from "../../dynamic-form.module";
import { DynamicFormService } from "../../dynamic-form.service";
@Component({
  selector: 'layout-config',
  templateUrl: './layout-config.component.html',
  styleUrls: ['./layout-config.component.scss']
})
export class LayoutConfigComponent implements OnInit, OnDestroy {
  @Input() layoutConfig!: IField;

  constructor(private DFService: DynamicFormService) {

  }
  ngOnInit(): void {
  }
  ngOnDestroy(): void {
  }

  layoutChange = {
    fieldChange: () => {
      console.log('selectFields$.v :>> ', this.DFService.selectFields$.value);
    },
    labelChange: () => {
      console.log('selectFields$.v :>> ', this.DFService.selectFields$.value);
    },
    controlChange: () => {
      console.log('selectFields$.v :>> ', this.DFService.selectFields$.value);
    },
  }
}
