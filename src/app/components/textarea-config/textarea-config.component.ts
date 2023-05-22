import { Component, OnInit, OnDestroy, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { IBaseField, IField, IBaseFormSchema } from "../../dynamic-form.module";
import { DynamicFormService } from "../../dynamic-form.service";
import { letterReg } from "../../utils";
@Component({
  selector: 'textarea-config',
  templateUrl: './textarea-config.component.html',
  styleUrls: ['./textarea-config.component.scss']
})
export class TextareaConfigComponent implements OnInit, OnDestroy {
  @ViewChild('inputRef', { static: false }) inputRef?: ElementRef;
  @Input() 
  get activeField() {
    return this._activeField;
  }
  set activeField(activeField) {
    if(activeField) this.inputConf = activeField;
    this._activeField = activeField;
  }
  _activeField!: IField | null;

  inputConf!: IField;

  @Input() validateForm!: FormGroup;

  isSub: boolean = false; // 是子表单

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
    layoutChange: () => {
      console.log('selectFields$.v :>> ', this.DFService.selectFields$.value);
    },
    requireChange: () => {
      console.log('selectFields$.v :>> ', this.DFService.selectFields$.value);
    },
    isColonChange: () => {
      console.log('selectFields$.v :>> ', this.DFService.selectFields$.value);
    },
  }

  customKeyChange($event: any) {
    if(letterReg.test($event) || $event === '') {
      this.inputConf.customKey = $event;
    }
    this.inputRef!.nativeElement.value = this.inputConf.customKey;
  }
}
