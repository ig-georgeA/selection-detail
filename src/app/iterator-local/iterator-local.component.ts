import { Component, OnDestroy, OnInit } from '@angular/core';
import { IComboSelectionChangingEventArgs, IRowSelectionEventArgs } from '@infragistics/igniteui-angular';
import { Subject, take, takeUntil } from 'rxjs';
import { OrderDto } from '../models/northwind-apiv-2/order-dto';
import { CustomerDto } from '../models/northwind-apiv-2/customer-dto';
import { NorthwindAPIv2Service } from '../services/northwind-apiv2.service';

@Component({
  selector: 'app-iterator-local',
  templateUrl: './iterator-local.component.html',
  styleUrls: ['./iterator-local.component.scss']
})
export class IteratorLocalComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  private _varCustomerID?: string = 'ALFKI';
  public get varCustomerID(): string | undefined {
    return this._varCustomerID;
  }
  public set varCustomerID(value: string | undefined) {
    this._varCustomerID = value;
    this.northwindAPIv2OrderDto$.next();
  }
  public varOrderID?: number;
  public varOrder?: OrderDto;
  public varCustomer: CustomerDto[] = [];
  public northwindAPIv2CustomerDto: CustomerDto[] = [];
  public northwindAPIv2OrderDto: OrderDto[] = [];
  public northwindAPIv2OrderDto$: Subject<void> = new Subject<void>();


  constructor(
    private northwindAPIv2Service: NorthwindAPIv2Service,
  ) {}

  ngOnInit() {
    this.northwindAPIv2Service.getCustomerDtoList().pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => this.northwindAPIv2CustomerDto = data,
      error: (_err: any) => this.northwindAPIv2CustomerDto = []
    });
    this.northwindAPIv2Service.getOrderDtoList(this.varCustomerID as any).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => this.northwindAPIv2OrderDto = data,
      error: (_err: any) => this.northwindAPIv2OrderDto = []
    });
    this.northwindAPIv2OrderDto$.pipe(takeUntil(this.destroy$)).subscribe(
      () => this.northwindAPIv2Service.getOrderDtoList(this.varCustomerID as any).pipe(take(1)).subscribe({
        next: (data) => this.northwindAPIv2OrderDto = data,
        error: (_err: any) => this.northwindAPIv2OrderDto = []
    }));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.northwindAPIv2OrderDto$.complete();
    this.destroy$.complete();
  }

  public comboSelectionChanging(event: IComboSelectionChangingEventArgs) {
    this.varCustomer = event.newSelection as CustomerDto[];
  }

  public gridRowSelectionChanging(event: IRowSelectionEventArgs) {
    this.varOrder = event.newSelection[0] as OrderDto;
  }
}
