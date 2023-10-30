import { Component, OnDestroy, OnInit } from '@angular/core';
import { IRowSelectionEventArgs, ISimpleComboSelectionChangingEventArgs } from '@infragistics/igniteui-angular';
import { Subject, take, takeUntil } from 'rxjs';
import { OrderDetailDto } from '../models/northwind-apiv-2/order-detail-dto';
import { CustomerDto } from '../models/northwind-apiv-2/customer-dto';
import { OrderDto } from '../models/northwind-apiv-2/order-dto';
import { NorthwindAPIv2Service } from '../services/northwind-apiv2.service';

@Component({
  selector: 'app-combo-details',
  templateUrl: './combo-details.component.html',
  styleUrls: ['./combo-details.component.scss']
})
export class ComboDetailsComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  private _varCustomer?: CustomerDto;
  public get varCustomer(): CustomerDto | undefined {
    return this._varCustomer;
  }
  public set varCustomer(value: CustomerDto | undefined) {
    this._varCustomer = value;
    this.northwindAPIv2OrderDto$.next();
  }
  public rtCustomerID?: string;

  private _varOrderID?: number = 10643;
  public get varOrderID(): number | undefined {
    return this._varOrderID;
  }
  public set varOrderID(value: number | undefined) {
    this._varOrderID = value;
    this.northwindAPIv2OrderDetailDto$.next();
  }
  public varCustomerID: string = 'ALFKI';
  public northwindAPIv2CustomerDto: CustomerDto[] = [];
  public northwindAPIv2OrderDto: OrderDto[] = [];
  public northwindAPIv2OrderDto$: Subject<void> = new Subject<void>();

  public northwindAPIv2OrderDetailDto: OrderDetailDto[] = [];
  public northwindAPIv2OrderDetailDto$: Subject<void> = new Subject<void>();


  constructor(
    private northwindAPIv2Service: NorthwindAPIv2Service,
  ) {}

  ngOnInit() {
    this.northwindAPIv2Service.getCustomerDto('ALFKI').pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => this.varCustomer = data,
      error: (_err: any) => this.varCustomer = undefined
    });
    this.northwindAPIv2Service.getCustomerDtoList().pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => this.northwindAPIv2CustomerDto = data,
      error: (_err: any) => this.northwindAPIv2CustomerDto = []
    });
    this.northwindAPIv2Service.getOrderDtoList(this.varCustomer?.customerId as any).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => this.northwindAPIv2OrderDto = data,
      error: (_err: any) => this.northwindAPIv2OrderDto = []
    });
    this.northwindAPIv2OrderDto$.pipe(takeUntil(this.destroy$)).subscribe(
      () => this.northwindAPIv2Service.getOrderDtoList(this.varCustomer?.customerId as any).pipe(take(1)).subscribe({
        next: (data) => this.northwindAPIv2OrderDto = data,
        error: (_err: any) => this.northwindAPIv2OrderDto = []
    }));
    this.northwindAPIv2Service.getOrderDetailDtoList(this.varOrderID as any).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => this.northwindAPIv2OrderDetailDto = data,
      error: (_err: any) => this.northwindAPIv2OrderDetailDto = []
    });
    this.northwindAPIv2OrderDetailDto$.pipe(takeUntil(this.destroy$)).subscribe(
      () => this.northwindAPIv2Service.getOrderDetailDtoList(this.varOrderID as any).pipe(take(1)).subscribe({
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

  public singleSelectComboSelectionChanging(event: ISimpleComboSelectionChangingEventArgs) {
    this.varCustomer = event.newSelection as CustomerDto;
  }

  public gridRowSelectionChanging(event: IRowSelectionEventArgs) {
    this.varOrderID = event.newSelection[0]?.orderId as number;
  }
}
