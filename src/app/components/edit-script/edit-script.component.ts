import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Ace } from 'ace-builds';
import { getAce } from "../ace.models";
/*
* @Author: zouzm
* @ComponentName: 脚本编辑
* @Description: 
*/
@Component({
  selector: 'edit-script',
  templateUrl: './edit-script.component.html',
  styleUrls: ['./edit-script.component.scss']
})
export class EditScriptComponent implements OnInit, OnDestroy {
  @ViewChild('javascriptInput', {static: true})
  javascriptInputElmRef!: ElementRef;

  editor!: Ace.Editor;

  content: any;

  text: string = '';

  get inputValue() {
    return this.editor.getValue();
  }

  constructor() { }

  ngOnInit(): void {
    this.createEditor(this.javascriptInputElmRef, this.content);
  }
  ngOnDestroy(): void {
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

    editorOptions = {...editorOptions, ...advancedOptions};
    getAce().subscribe(
      (ace) => {
        this.editor = ace.edit(editorElement, editorOptions);
        this.editor.session.setUseWrapMode(true);
        if(content) this.editor.setValue(content, -1);
      }
    );
  }
}
