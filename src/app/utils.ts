export function guid(): string {
  function s4(): string {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

export function deepClone<T>(target: T, ignoreFields?: string[]): T {
  if (target === null) {
    return target;
  }
  if (target instanceof Date) {
    return new Date(target.getTime()) as any;
  }
  if (target instanceof Array) {
    const cp = [] as any[];
    (target as any[]).forEach((v) => { cp.push(v); });
    return cp.map((n: any) => deepClone<any>(n)) as any;
  }
  if (typeof target === 'object' && target !== {}) {
    const cp = { ...(target as { [key: string]: any }) } as { [key: string]: any };
    Object.keys(cp).forEach(k => {
      if (!ignoreFields || ignoreFields.indexOf(k) === -1) {
        cp[k] = deepClone<any>(cp[k]);
      }
    });
    return cp as T;
  }
  return target;
}

export function getKey(target: string): string {
  if (target) {
    const value = target.split('.');
    const key = value[value.length - 1];
    return key;
  } else {
    return target;
  }
}
export const letterReg = /^[a-zA-Z\.]+$/; //只能输入字母正则


export const headers = { 'X-Authorization': 'Bearer ' + localStorage.getItem('jwt_token') };
export interface SortOrder {
  property: string;
  direction: Direction;
}
export enum Direction {
  ASC = 'ASC',
  DESC = 'DESC'
}
export class PageLink {

  textSearch: string;
  pageSize: number;
  page: number;
  sortOrder: SortOrder;
  //@ts-ignore
  constructor(pageSize: number, page: number = 0, textSearch: string = null, sortOrder: SortOrder = null) {
    this.textSearch = textSearch;
    this.pageSize = pageSize;
    this.page = page;
    this.sortOrder = sortOrder;
  }

  public toQuery(): string {
    let query = `?pageSize=${this.pageSize}&page=${this.page}`;
    if (this.textSearch && this.textSearch.length) {
      const textSearch = encodeURIComponent(this.textSearch);
      query += `&textSearch=${textSearch}`;
    }
    if (this.sortOrder) {
      query += `&sortProperty=${this.sortOrder.property}&sortOrder=${this.sortOrder.direction}`;
    }
    return query;
  }

}