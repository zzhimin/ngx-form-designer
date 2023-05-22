import { Component, OnInit, Input } from '@angular/core';
import { IBaseField, IField, IBaseFormSchema } from "../../dynamic-form.module";
@Component({
  selector: 'text-config',
  templateUrl: './text-config.component.html',
  styleUrls: []
})
export class TextConfigComponent implements OnInit {
  @Input() 
  get activeField() {
    return this._activeField;
  }
  set activeField(activeField) {
    if(activeField) this.fieldConf = activeField;
    this._activeField = activeField;
  }
  _activeField!: IField | null;
  fieldConf!: IField;

  constructor() {
  }
  ngOnInit(): void {
  }
}
