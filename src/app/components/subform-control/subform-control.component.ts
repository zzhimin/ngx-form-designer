import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { IBaseField, IField } from "../../dynamic-form.module";
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { DynamicFormService } from "../../dynamic-form.service";
import { guid } from 'src/app/utils';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { cloneDeep } from 'lodash';
import { FieldControlComponent } from "../field-wraper/field-wraper.component";
@Component({
  selector: 'subform-control',
  templateUrl: './subform-control.component.html',
  styleUrls: ['./subform-control.component.scss']
})
export class SubformControlComponent implements OnInit, OnDestroy, FieldControlComponent {
  @Input() form!: FormGroup;
  @Input()
  get field() {
    return this._field;
  }
  set field(f: IField) {
    this._field = f;
  }
  _field: IField;

  addFieldSub: Subscription | null;

  rows = new Subject<Array<IField>>();
  constructor(private fb: FormBuilder,
    private DFService: DynamicFormService,) {

  }
  ngOnInit(): void {
    this.form.setControl(this.field.key, this.fb.array([]));
    this.addSubItem();
    // 
    this.field.templateOptions.hooks.updateSubFormControls = this.updateSubFormControls.bind(this);
  }
  ngOnDestroy(): void {
    this.addFieldSub?.unsubscribe();
  }

  get subFormContent(): FormArray {
    return this.form.get(this.field.key) as FormArray;
  }

  // 增加行
  public addSubItem() {
    this.rows.asObservable().subscribe((data) => {
      this.form.setControl(this.field.key, this.fb.array([]));
      const formArr = this.fb.group({});
      cloneDeep(data).forEach((item: IField) => {
        formArr.addControl(item.customKey || item.key, this.fb.control({ value: null, disabled: item.templateOptions?.disable ?? false }, this.DFService.getValitator(item)))
      });
      this.subFormContent.push(formArr);
    })
  }

  // 删除行
  public removeSubItem(index: number): void {
    this.subFormContent.removeAt(index);
  }

  // 子表单增加控件
  public updateSubFormControls() {
    this.rows.next(this.field.templateOptions.items);
  }
}
