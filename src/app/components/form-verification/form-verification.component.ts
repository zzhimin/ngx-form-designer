import { Component, OnInit, OnDestroy, Input, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IBaseField, IField, IBaseFormSchema } from "../../dynamic-form.module";
import { DynamicFormService } from "../../dynamic-form.service";
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Ace } from 'ace-builds';
import { getAce } from "../ace.models";
/*
* @Author: zouzm
* @ComponentName: 表单提交校验
* @Description: 用于配置表单提交时的验证规则
*/
@Component({
  selector: 'form-verification',
  templateUrl: './form-verification.component.html',
  styleUrls: ['./form-verification.component.scss']
})
export class FormVerificationComponent implements OnInit, OnDestroy {

  @ViewChild('javascriptInput', { static: true })
  javascriptInputElmRef!: ElementRef;

  editor!: Ace.Editor;

  content: any;

  text: string = '';

  tipsText: string = '';

  constructor(private DFService: DynamicFormService,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,) {

  }
  ngOnInit(): void {
    this.createEditor(this.javascriptInputElmRef, this.content);
  }
  ngOnDestroy(): void {
  }

  get inputValue() {
    return this.editor.getValue();
  }

  createEditor(editorElementRef: ElementRef, content: string | undefined): void {
    const editorElement = editorElementRef.nativeElement;
    let editorOptions: Partial<Ace.EditorOptions> = {
      mode: 'ace/mode/javascript',
      // theme: 'ace/theme/github',
      fontSize: 16, // 编辑器内字体大小
      showGutter: true,
      showPrintMargin: false,
    };

    const advancedOptions = {
      enableSnippets: true,
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true
    };

    editorOptions = { ...editorOptions, ...advancedOptions };
    getAce().subscribe(
      (ace) => {
        this.editor = ace.edit(editorElement, editorOptions);
        this.editor.session.setUseWrapMode(true);
        if (content) this.editor.setValue(content, -1);
      }
    );
  }
}
