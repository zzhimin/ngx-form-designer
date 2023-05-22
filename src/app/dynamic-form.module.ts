type Layout = 'horizontal' | 'vertical';
export interface IBaseFormSchema {
  id: string | number;
  key: string;
  name: string;
  nameHeight: string;
  gutter: [number, number];
  layout: Layout,
  validators: {script: string; tipsText: string;};
  width: string;
  background: string;
}
export interface IFormSchema extends IBaseFormSchema {
  fields: Array<IField>;
}

interface ILabel {
  name: string; // 名称
  layout: number; // 栅格 Sm 24格
  require: boolean; // 当前项是否为必填，仅影响样式
  isColon: boolean;// 是否显示 label 后面的冒号
}
export interface IBaseField {
  value: any; // 初始化的值
  customKey: string; // 自定义key
  zh: string; // 中文名称
  layout: number;  // 所占的栅格数
  subWidth: number; // 子表单宽度
  hidden: boolean; // 字段是否隐藏
  relation: string; // 数据联动
  label: ILabel;
  control: { layout: number; errorTip?: string; };// nz-col 栅格 Sm 24格
  templateOptions: any;
}
export interface IField extends IBaseField {
  key: string; // formControlName所绑定的key
}
export interface IFormFields {
  desc: string;
  list: IBaseField[];
}