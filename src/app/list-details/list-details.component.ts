import { Component, OnDestroy, OnInit } from '@angular/core';
import { IRowSelectionEventArgs } from '@infragistics/igniteui-angular';
import { Subject, take, takeUntil } from 'rxjs';
import { OrderDto } from '../models/northwind-apiv-2/order-dto';
import { CustomerDto } from '../models/northwind-apiv-2/customer-dto';
import { OrderDetailDto } from '../models/northwind-apiv-2/order-detail-dto';
import { NorthwindAPIv2Service } from '../services/northwind-apiv2.service';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.scss']
})
export class ListDetailsComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public customerID?: string;
  public rtCustomerID?: string;

  private _orderID?: number = 10643;
  public get orderID(): number | undefined {
    return this._orderID;
  }
  public set orderID(value: number | undefined) {
    this._orderID = value;
    this.northwindAPIv2OrderDetailDto$.next();
  }

  private _customer?: CustomerDto;
  public get customer(): CustomerDto | undefined {
    return this._customer;
  }
  public set customer(value: CustomerDto | undefined) {
    this._customer = value;
    this.northwindAPIv2OrderDto$.next();
  }
  public northwindAPIv2OrderDto: OrderDto[] = [];
  public northwindAPIv2OrderDto$: Subject<void> = new Subject<void>();

  public northwindAPIv2OrderDetailDto: OrderDetailDto[] = [];
  public northwindAPIv2OrderDetailDto$: Subject<void> = new Subject<void>();


  constructor(
    private northwindAPIv2Service: NorthwindAPIv2Service,
  ) {}

  ngOnInit() {
    this.northwindAPIv2Service.getCustomerDto('ALFKI').pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => this.customer = data,
      error: (_err: any) => this.customer = undefined
    });
    this.northwindAPIv2Service.getOrderDtoList(this.customer?.customerId as any).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => this.northwindAPIv2OrderDto = data,
      error: (_err: any) => this.northwindAPIv2OrderDto = []
    });
    this.northwindAPIv2OrderDto$.pipe(takeUntil(this.destroy$)).subscribe(
      () => this.northwindAPIv2Service.getOrderDtoList(this.customer?.customerId as any).pipe(take(1)).subscribe({
        next: (data) => this.northwindAPIv2OrderDto = data,
        error: (_err: any) => this.northwindAPIv2OrderDto = []
    }));
    this.northwindAPIv2Service.getOrderDetailDtoList(this.orderID as any).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => this.northwindAPIv2OrderDetailDto = data,
      error: (_err: any) => this.northwindAPIv2OrderDetailDto = []
    });
    this.northwindAPIv2OrderDetailDto$.pipe(takeUntil(this.destroy$)).subscribe(
      () => this.northwindAPIv2Service.getOrderDetailDtoList(this.orderID as any).pipe(take(1)).subscribe({
        next: (data) => this.northwindAPIv2OrderDetailDto = data,
        error: (_err: any) => this.northwindAPIv2OrderDetailDto = []
    }));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.northwindAPIv2OrderDto$.complete();
    this.northwindAPIv2OrderDetailDto$.complete();
    this.destroy$.complete();
  }

  public gridRowSelectionChanging(event: IRowSelectionEventArgs) {
    this.orderID = event.newSelection[0]?.orderId as number;
  }
}
