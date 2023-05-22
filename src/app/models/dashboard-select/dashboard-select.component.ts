import {
  Component,
  OnInit,
  forwardRef,
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Direction, PageLink, headers } from "../../utils";
interface IOptions {
  label: string;
  value: string;
}
/*
 * @Author: zouzm
 * @WidgetName: 仪表板选择器
 * @WidgetCode: bk-dashboard-select
 */
@Component({
  selector: 'bk-dashboard-select',
  templateUrl: './dashboard-select.component.html',
  styleUrls: ['./dashboard-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DashboardSelectComponent),
      multi: true,
    },
  ],
})
export class DashboardSelectComponent implements ControlValueAccessor, OnInit {
  pageLink = new PageLink(1000, 0, '', {
    property: 'title',
    direction: Direction.ASC
  });
  url = `/api/basekit/tenant/dashboards${this.pageLink.toQuery()}`;

  optionList: IOptions[] = [];

  selectedDashboard = null;

  isLoading = false;

  // tslint:disable:no-any
  getRandomNameList: Observable<IOptions[]> = this.http
    .get(this.url, { headers })
    .pipe(map((res: any) => res.data))
    .pipe(
      map((list: any) => {
        return list.map((item: any) => {
          return {label: item.name, value: item.id.id}
        });
      })
    );


  constructor(private http: HttpClient) { }

  modelChange($event: any) {
    this.propagateChange($event);
  }

  ngOnInit(): void {
    this.loadMore();
  }
  loadMore(): void {
    this.isLoading = true;
    this.getRandomNameList.subscribe(data => {
      this.isLoading = false;
      this.optionList = [...this.optionList, ...data];
    });
  }

  writeValue(value: any) {
    if (value) {
      // TODO
    }
  }
  propagateChange = (_: any) => { };

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) { }
}
