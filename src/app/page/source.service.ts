import { Injectable } from "@angular/core";
// import { HttpClient } from "@angular/common/http";
import { forkJoin, Observable, Subscriber } from "rxjs";
import { filter } from "rxjs/operators";
import { IItem, Item } from "./Item";

@Injectable({
  providedIn: "root",
})
export class SourceService implements ISource {
  constructor(/* private http: HttpClient */) {}

  add(env: string, item: () => IItem) {
    console.log(env + " | service add ");
    console.log(item());
    // return this.http.post(`/api/v1/environments/${env}/items`, item());
    return new Observable(s => {});
  }

  delete(env: string, ids: () => string[]) {
    console.log(env + " | service delete " + ids());
    return forkJoin(
      ids().map(id =>
        // this.http.delete(`/api/v1/environments/${env}/items/${id}`)
        new Observable(s => {})
      )
    );
  }

  load(env: string, sort?: Sort): Observable<Item[]> {
    return new Observable((s) =>
      s.next([
        { 
          id: "b1ccfe1a-c025-4d8a-80f6-70ca7b8f50c7",
          name: "Волга",
          coupon: "Бесплатный автомобиль",
          fio: "Деточкин Юрис",
          address: "Ленина 1",
          company: "Волга",
          createDate: "2018-04-09T12:51:15Z",
          expireDate: "2018-05-09T12:51:15Z"
        },
        {

          id: "c1ccfe1a-b54e-4d8a-80f6-70ca7b8f50c8",
          name: "Динозавр",
          coupon: "Sale Dino 100%",
          fio: "Фред Флинстоун",
          address: "Птеродатилев п.1",
          company: "Stone",
          createDate: "0000-00-00T00:00:01Z",
          expireDate: "2050-05-09T12:51:15Z"
        },
      ])
    );
    // return this.http
    //   .get<Item[]>(`/api/v1/environments/${env}/items`)
    //   .pipe(filter(item => item !== undefined));
  }
}

export interface Sort {
  field: string;
  direction: string;
}

export interface ISource {
  add(env: string, item: () => IItem);

  delete(env: string, ids: () => string[]);

  load(env: string, sort?: Sort): Observable<Item[]>;
}
