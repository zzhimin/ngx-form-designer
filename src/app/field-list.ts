import { IFormFields } from "./dynamic-form.module";
export const formFields: IFormFields[] = [
    {
        desc: '基础字段',
        list: [
            {
                value: ``,
                customKey: '',
                zh: '输入框',
                layout: 12,
                subWidth: 200, // 子表单宽度
                hidden: false,
                relation: '',
                label: {
                    name: '年龄',
                    layout: 6,
                    require: true,
                    isColon: false,
                },
                control: {
                    layout: 14,
                    errorTip: '出错了'
                },
                templateOptions: { // 类型定义
                    key: 'input', // 什么类型
                    type: 'text', // text | password
                    size: 'default', // 'large' | 'small' | 'default' 
                    placeholder: '请输入',
                    disable: false,
                    require: true,
                    maxLength: 12,
                    minLength: 1,
                    email: false,
                }
            },
            {
                value: ``,
                customKey: '',
                zh: '文本域',
                layout: 24,
                subWidth: 200, // 子表单宽度
                hidden: false,
                relation: '',
                label: {
                    name: '文本域',
                    layout: 3,
                    require: false,
                    isColon: false,
                },
                control: {
                    layout: 17,
                    errorTip: '请输入'
                },
                templateOptions: { // 类型定义
                    key: 'textarea', // 什么类型
                    placeholder: '请输入',
                    disable: false,
                    require: false,
                    minRows: 1,
                    maxRows: 6,
                }
            },
            {
                value: `A`,
                customKey: '',
                zh: '单选框',
                layout: 12,
                subWidth: 200, // 子表单宽度
                hidden: false,
                relation: '',
                label: {
                    name: '单选框',
                    layout: 6,
                    require: true,
                    isColon: false,
                },
                control: {
                    layout: 14,
                },
                templateOptions: { // 类型定义
                    key: 'radio', // 什么类型
                    disable: false,
                    require: false,
                    // nzButtonStyle: 'solid', // solid | outline  //无法生效
                    options: [
                        {
                            label: '选项1',
                            value: 'value1'
                        },
                        {
                            label: '选项2',
                            value: 'value2'
                        },
                    ]
                }
            },
            {
                value: ``,
                customKey: '',
                zh: '多选框',
                layout: 12,
                subWidth: 200, // 子表单宽度
                hidden: false,
                relation: '',
                label: {
                    name: '多选框',
                    layout: 6,
                    require: true,
                    isColon: false,
                },
                control: {
                    layout: 14,
                },
                templateOptions: { // 类型定义
                    key: 'checkbox', // 什么类型
                    disable: false,
                    require: true,
                    options: [
                        {
                            label: '选项1',
                            value: 'value1',
                            checked: true
                        },
                        {
                            label: '选项2',
                            value: 'value2',
                            checked: false
                        },
                        {
                            label: '选项3',
                            value: 'value3',
                            checked: true
                        },
                    ]
                }
            },
            {
                value: ``,
                customKey: '',
                zh: '开关',
                layout: 12,
                subWidth: 200, // 子表单宽度
                hidden: false,
                relation: '',
                label: {
                    name: '开关',
                    layout: 6,
                    require: true,
                    isColon: false,
                },
                control: {
                    layout: 6,
                },
                templateOptions: { // 类型定义
                    key: 'switch', // 什么类型
                    disable: false,
                    require: true,
                    size: 'default', // 两种default 小small
                    nzCheckedChildren: '开',
                    nzUnCheckedChildren: '关'
                }
            },
            {
                value: ``,
                customKey: '',
                zh: '选择框',
                layout: 24,
                subWidth: 200, // 子表单宽度
                hidden: false,
                relation: '',
                label: {
                    name: '选择框',
                    layout: 3,
                    require: true,
                    isColon: false,
                },
                control: {
                    layout: 17,
                },
                templateOptions: { // 类型定义
                    key: 'select', // 什么类型
                    disable: false,
                    require: true,
                    size: 'default',
                    allowClear: true,
                    nzShowSearch: true,
                    placeholder: '请选择',
                    mode: 'default', //是否是多选 [] 'multiple' | 'default'
                    nzServerSearch: false,
                    nzShowArrow: true,
                    options: [
                        {
                            label: '选项1',
                            value: 'value1'
                        },
                        {
                            label: '选项2',
                            value: 'value2'
                        },
                    ]
                }
            },
            {
                value: ``,
                customKey: '',
                zh: '日期时间',
                layout: 12,
                subWidth: 200,
                hidden: false,
                relation: '',
                label: {
                    name: '日期时间',
                    layout: 6,
                    require: true,
                    isColon: false,
                },
                control: {
                    layout: 18,
                },
                templateOptions: {
                    key: 'datetime',
                    disable: false,
                    require: true,
                    size: 'default',
                    mode: 'date',
                    type: 'time',
                    showTime: true,
                }
            },
            {
                value: ``,
                customKey: '',
                zh: '描述',
                layout: 12,
                subWidth: 200, // 子表单宽度
                hidden: false,
                relation: '',
                label: {
                    name: '注',
                    layout: 3,
                    require: true,
                    isColon: false,
                },
                control: {
                    layout: 9,
                },
                templateOptions: { // 类型定义
                    key: 'text', // 什么类型
                    content: '自定义文字'
                }
            },
            {
                value: ``,
                customKey: '',
                zh: '分割线',
                layout: 24,
                subWidth: 200, // 子表单宽度
                hidden: false,
                relation: '',
                label: {
                    name: '',
                    layout: 0,
                    require: true,
                    isColon: false,
                },
                control: {
                    layout: 24,
                },
                templateOptions: { // 类型定义
                    key: 'divider', // 什么类型
                    isDashed: false,
                    text: '我是一条分割线',
                    plain: false,
                    orientation: 'center' // 'center | left | right
                }
            },
        ]
    },
    {
        desc: '增强字段',
        list: [
            {
                value: '',
                customKey: '',
                zh: '子表单',
                layout: 24,
                subWidth: 200, // 子表单宽度
                hidden: false,
                relation: '',
                label: {
                    name: '子表单',
                    layout: 3,
                    require: true,
                    isColon: true,
                },
                control: {
                    layout: 24,
                    errorTip: '出错了'
                },
                templateOptions: { // 类型定义
                    key: 'subform', // 什么类型
                    items: [],
                    hooks: {}
                }
            },
            {
                value: '',
                customKey: '',
                zh: '组织选择',
                layout: 12,
                subWidth: 200,
                hidden: false,
                relation: '',
                label: {
                    name: '所属组织',
                    layout: 6,
                    require: true,
                    isColon: false,
                },
                control: {
                    layout: 14,
                },
                templateOptions: {
                    key: 'organization',
                }
            },
            {
                value: '',
                customKey: '',
                zh: '图片',
                layout: 12,
                subWidth: 200,
                hidden: false,
                relation: '',
                label: {
                    name: '图片',
                    layout: 6,
                    require: true,
                    isColon: false,
                },
                control: {
                    layout: 14,
                },
                templateOptions: {
                    key: 'image-upload',
                    uploadUrl: 'https://www.mocky.io/v2/5cc8019d300000980a055e76'
                }
            },
        ]
    },

]