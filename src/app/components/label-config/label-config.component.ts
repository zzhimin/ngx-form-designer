import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IBaseField, IField, IBaseFormSchema } from "../../dynamic-form.module";
import { DynamicFormService } from "../../dynamic-form.service";
@Component({
  selector: 'label-config',
  templateUrl: './label-config.component.html',
  styleUrls: ['./label-config.component.scss']
})
export class LabelConfigComponent implements OnInit, OnDestroy {
  @Input() labelConfig!: IField;

  constructor(private DFService: DynamicFormService) {

  }
  ngOnInit(): void {
  }
  ngOnDestroy(): void {
  }

  labelChange = {
    nameChange: () => {
      console.log('selectFields$.v :>> ', this.DFService.selectFields$.value);
    },
    requireChange: () => {
      console.log('selectFields$.v :>> ', this.DFService.selectFields$.value);
    },
    isColonChange: () => {
      console.log('selectFields$.v :>> ', this.DFService.selectFields$.value);
    },
  }
}
