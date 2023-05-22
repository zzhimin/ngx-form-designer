import { Component, OnInit, ChangeDetectorRef, ViewContainerRef, OnDestroy  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { DynamicFormService } from "./dynamic-form.service";
import { formFields } from "./field-list";
import { IBaseField, IField } from "./dynamic-form.module";
import { guid, getKey } from "./utils";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { PreviewComponent } from "./components/preview/preview.component";
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  activeField$ = this.DFService.getActiveField();

  formJson$ = this.DFService.getFormJson();

  formFields = formFields; // 左侧选择列表

  validateForm!: FormGroup;
  selectFields$ = this.DFService.getSelectFields();

  excludeField: string[] = [// 描述、分割线等类型无需生成表单项
    'text', 
    'divider'
  ];

  constructor(private DFService: DynamicFormService,
    private cd: ChangeDetectorRef,
    private fb: FormBuilder,
    private modal: NzModalService, 
    private viewContainerRef: ViewContainerRef,
    private drawerService: NzDrawerService) {

  }
  ngOnInit(): void {
    this.validateForm = this.fb.group({});
  }
  ngOnDestroy(): void {
  }

  drop(event: CdkDragDrop<IField[]>) {
    moveItemInArray(this.DFService.selectFields$.value, event.previousIndex, event.currentIndex);
  }

  selectField(field: IBaseField) { // 点击左侧选择字段触发
    field = JSON.parse(JSON.stringify(field));

    const key = guid();
    const keyField = Object.assign(field, {key});
    if(!this.excludeField.includes(field.templateOptions.key)) {
      this.validateForm.addControl(key, this.fb.control({value: null, disabled: field.templateOptions?.disable ?? false}, this.DFService.getValitator(field)));
    }

    this.DFService.selectFields$.next([...this.DFService.selectFields$.value, keyField]);

  }

  clickField(field: IField) {
    this.DFService.activeField$.next(field);
  }

  // 表单中删除字段
  delField(field: IField) {
    this.validateForm.removeControl(getKey(field.key));
    const selectField = this.DFService.selectFields$.value;
    const idx = selectField.findIndex(f => getKey(f.key) == getKey(field.key));
    if(idx > -1) {
      selectField.splice(idx, 1);
      this.DFService.selectFields$.next(selectField);
    };
  }
  // 预览
  preview() {
    const drawerRef = this.drawerService.create<PreviewComponent, { selectFields: Observable<IField[]> }, string>({
      nzTitle: '表单预览',
      nzWidth: '100%',
      nzBodyStyle: {
        backgroundColor: '#f4f6f9'
      },
      nzContent: PreviewComponent,
      nzContentParams: {
      }
    });
  }


  alert(value: any) {
    console.log('value :>> ', value);
  }
}
