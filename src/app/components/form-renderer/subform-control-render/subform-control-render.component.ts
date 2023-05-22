import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { IBaseField, IField } from "../../../dynamic-form.module";
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { DynamicFormService } from "../../../dynamic-form.service";
import { guid } from 'src/app/utils';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
@Component({
  selector: 'subform-control-render',
  templateUrl: './subform-control-render.component.html',
  styleUrls: ['./subform-control-render.component.scss']
})
export class SubformControlRenderComponent implements OnInit, OnDestroy {
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

  parentWidth: number;
  isDel: number = -1;
  constructor(private fb: FormBuilder,
    private DFService: DynamicFormService,) {

  }
  ngOnInit(): void {
    this.form.setControl(this.field.key, this.fb.array([]));
    this.parentWidth = this.field.templateOptions.items.reduce((p: number, item: IField) => p + Number(item.subWidth) + 10, 0);
    this.addColumn();
  }
  ngOnDestroy(): void {
    this.addFieldSub?.unsubscribe();
  }

  get subFormContent(): FormArray {
    return this.form.get(this.field.key) as FormArray;
  }

  // 行 controls
  private rowControls(): FormGroup {
    const form = this.fb.group({});
    this.field.templateOptions.items.forEach((item: IField) => {
      // TODO 不能用 item.customKey 会报错
      form.addControl(item.customKey || item.key, this.fb.control({ value: null, disabled: item.templateOptions?.disable ?? false }, this.DFService.getValitator(item)))
    });
    return form;
  }

  public addColumn() {
    this.subFormContent.push(this.rowControls());
  }

  // 删除行
  public removeColumn(index: number): void {
    this.subFormContent.removeAt(index);
  }
}
