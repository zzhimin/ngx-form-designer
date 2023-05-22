import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  forwardRef,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
  Validators,
  ControlValueAccessor,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { headers } from "../../utils";
/*
 * @Author: zouzm
 * @WidgetName: 组织选择框
 * @WidgetCode: bk-organization-select
 */
@Component({
  selector: 'bk-organization-select',
  templateUrl: './organization-select.component.html',
  styleUrls: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OrganizationSelectComponent),
      multi: true,
    },
  ],
})
export class OrganizationSelectComponent implements ControlValueAccessor, OnInit {

  validateForm!: FormGroup;

  nodes: any = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      org: [null, [Validators.required]],
    });

    this.validateForm.get('org')!.valueChanges.subscribe((value) => {
      if (this.nodes.length === 0) {
        return;
      }
      if (value === this.nodes[0].key) {
        this.propagateChange({
          id: value,
          entityType: 'TENANT',
        });
      } else {
        this.propagateChange(
          value
            ? {
                id: value,
                entityType: 'CUSTOMER',
              }
            : null
        );
      }
    });

    this.getOrganizationTree().subscribe((res: any) => {
      this.nodes = [
        {
          title: res.root.title,
          key: res.root.id.id,
          children: res.customers,
        },
      ];
    });
  }

  writeValue(value: any) {
    if (value) {
      this.validateForm.get('org')!.setValue(value.id);
    }
  }
  propagateChange = (_: any) => {};

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) {}

  // 获取组织树
  public getOrganizationTree() {
    const url = `/api/basekit/hierarchy/organization`;
    return this.http.get(url, { headers });
  }
}
