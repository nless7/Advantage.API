import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from 'src/environments/environment';

@Injectable()
export class OrderService {

  constructor(private _http: Http) { }

  /// <summary>
  /// Get all orders by page index and page size.
  /// </summary>
  /// <param name="pageIndex">The page index.</param>
  /// <param name="pageSize">The page size.</param>
  /// <returns>The orders.</returns>
  getOrders(pageIndex: number, pageSize: number) {
    return this._http.get(`${environment.apiURL }/api/order/${pageIndex}/${pageSize}`)
      .map(res => res.json());
  }

  getOrdersByCustomer(n: number) {
    return this._http.get(`${ environment.apiURL }/api/order/bycustomer/${n}`)
      .map(res => res.json());
  }

  getOrdersByState() {
    return this._http.get(`${environment.apiURL }/api/order/bystate/`)
      .map(res => res.json());
  }
}
