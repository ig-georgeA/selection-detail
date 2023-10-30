import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerDto } from '../models/northwind-apiv-2/customer-dto';
import { OrderDetailDto } from '../models/northwind-apiv-2/order-detail-dto';
import { OrderDto } from '../models/northwind-apiv-2/order-dto';

const API_ENDPOINT = 'https://data-northwind.indigo.design';

@Injectable({
  providedIn: 'root'
})
export class NorthwindAPIv2Service {
  constructor(
    private http: HttpClient
  ) { }

  public getCustomerDto(id: string): Observable<CustomerDto> {
    const options = {
      headers: {
        Authorization: 'Bearer <auth_value>',
      },
    };
    return this.http.get<CustomerDto>(`${API_ENDPOINT}/Customers/${id}`, options);
  }

  public getOrderDtoList(id: string = 'ALFKI'): Observable<OrderDto[]> {
    const options = {
      headers: {
        Authorization: 'Bearer <auth_value>',
      },
    };
    return this.http.get<OrderDto[]>(`${API_ENDPOINT}/Customers/${id}/Orders`, options);
  }

  public getOrderDetailDtoList(id: string): Observable<OrderDetailDto[]> {
    const options = {
      headers: {
        Authorization: 'Bearer <auth_value>',
      },
    };
    return this.http.get<OrderDetailDto[]>(`${API_ENDPOINT}/Orders/${id}/Details`, options);
  }

  public getCustomerDtoList(): Observable<CustomerDto[]> {
    const options = {
      headers: {
        Authorization: 'Bearer <auth_value>',
      },
    };
    return this.http.get<CustomerDto[]>(`${API_ENDPOINT}/Customers`, options);
  }
}
