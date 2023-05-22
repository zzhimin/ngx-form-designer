import { Injectable } from "@angular/core";
import { Validators } from "@angular/forms";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { IFormFields, IField, IBaseFormSchema, IBaseField } from "./dynamic-form.module";
import { formFields } from "./field-list";
/**
* 以下示例代码根据字段名称找到key，根据validateForm值得变化做一系列操作
* 此demo为输入框输入为111的时候，隐藏文本域字段
* currentField 当前字段
* validateForm 表单对象
* selectFields 当前表单选中的字段
if (selectFields) {
  const age = selectFields.filter(field => field.label.name == '年龄');
  const desc = selectFields.filter(field => field.label.name == '文本域');
  let sub = [];

  if (age.length > 0 && desc.length > 0) {
      const ageSub = validateForm.get(age[0].key).valueChanges.subscribe(v => {
          if(v === '111') {
              desc[0].hidden = true;
          } else {
              desc[0].hidden = false;
          }
      });
      sub.push(ageSub);
  }
  return sub;
}
 */

/**
 * 根据输入框的内容 禁用其他控件
 *if (selectFields) {
  const age = selectFields.filter(field => field.label.name == '年龄1');
  const desc = selectFields.filter(field => field.label.name == '年龄2');
  let sub = [];

  if (age.length > 0 && desc.length > 0) {
      const ageSub = validateForm.get(age[0].key).valueChanges.subscribe(v => {
          if(v === '111') {
              validateForm.get(desc[0].key).disable();
          } else {
              validateForm.get(desc[0].key).enable();
          }
      });
      sub.push(ageSub);
  }
  return sub;
}
 */

/**
 * 字段数据联动 demo
if(selectFields) {
    const age1 = selectFields.filter(f => f.label.name == '年龄1');
    const age2 = selectFields.filter(f => f.label.name == '年龄2');
    let sub = [];
    let a1 = 0;
    let a2 = 0;
    if(age1.length > 0 && age2.length > 0) {
        const age1Sub = validateForm.get(age1[0].key).valueChanges.subscribe(v => {
            a1 = v;
            patchValue(a1, a2);
        });
        const age2Sub = validateForm.get(age2[0].key).valueChanges.subscribe(v => {
            a2 = v;
            patchValue(a1, a2);
        });
        sub.push(age1Sub);
        sub.push(age2Sub);
    }
}
function patchValue(a1, a2) {
    validateForm.get(currentField.key).setValue(Number(a1) - Number(a2));
}
 */

/**
 * form验证条件demo
 * 两次输入密码不一致，请重新输入
 * if(selectFields) {
    const age1 = selectFields.filter(f => f.label.name == '年龄1');
    const age2 = selectFields.filter(f => f.label.name == '年龄2');
    
    if(age1.length > 0 && 
        age2.length > 0 && 
        formValue[age1[0].key] !== formValue[age2[0].key]) {
        return false;
    } else {
        return true;
    }
}
 */
@Injectable({
  providedIn: "root"
})
export class DynamicFormService {
  formJson$ = new BehaviorSubject<IBaseFormSchema>({
    id: new Date().getTime(), // 表单id
    key: 'formname',
    name: '表单名称',
    nameHeight: '80',
    gutter: [8, 8], // 水平间距，垂直间距
    layout: 'horizontal',
    validators: {
      script: '',
      tipsText: ''
    }, // 表单提交校验规则
    width: '100%',
    background: '#fff',
  });
  getFormJson(): Observable<IBaseFormSchema> {
    return this.formJson$.asObservable();
  }
  
  formFields$ = new BehaviorSubject<Array<IFormFields>>(formFields);
  getFormFields(): Observable<Array<IFormFields>> {
    return this.formFields$.asObservable();
  }

  activeField$ = new Subject<IField>();
  getActiveField(): Observable<IField> {
    return this.activeField$.asObservable();
  }

  selectFields$ = new BehaviorSubject<Array<IField>>([]);
  getSelectFields(): Observable<Array<IField>> {
    return this.selectFields$.asObservable();
  }

  getValitator(field: IBaseField) {
    const valitator = [];
    const require = field.templateOptions.require;
    const maxLength = field.templateOptions.maxLength ? field.templateOptions.maxLength : false;
    const minLength = field.templateOptions.minLength ? field.templateOptions.minLength : false;
    const email = field.templateOptions.email ? field.templateOptions.email : false;
    if (require) valitator.push(Validators.required);
    if (maxLength) valitator.push(Validators.maxLength(field.templateOptions.maxLength));
    if (minLength) valitator.push(Validators.minLength(field.templateOptions.minLength));
    if (email) valitator.push(Validators.email);

    return valitator;
  }
}
