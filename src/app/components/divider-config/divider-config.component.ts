import { Component, OnInit, Input } from '@angular/core';
import { IField } from "../../dynamic-form.module";
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'divider-config',
  templateUrl: './divider-config.component.html',
  styleUrls: []
})
export class DividerConfigComponent implements OnInit {
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

  @Input() validateForm!: FormGroup;

  constructor() {

  }
  ngOnInit(): void {
  }

}
