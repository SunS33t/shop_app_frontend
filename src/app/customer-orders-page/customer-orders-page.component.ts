import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../shared/api.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-customer-orders-page',
  templateUrl: './customer-orders-page.component.html',
  styleUrls: ['./customer-orders-page.component.css']
})
export class CustomerOrdersPageComponent implements OnInit {
  
  customer: Observable<any>;
  orders: {products:{product:any, count:number}[],status:string, addressId:string}[] = [];
  adressMap: Map<string,string> = new Map();
  adressList: any[] = [];

  constructor(private userService: UserService, private service: ApiService) { }

  ngOnInit(): void {

    this.userService.getCustomerInfo().subscribe((customer:any)=>{
      customer.orders.forEach((order:any) => {
        console.log(order);
        this.service.getOrderProductList(order.orderId).subscribe(orderLists=>{
          let products : any[] = [];
          orderLists.forEach((orderList:any)=>{
            products.push({product:orderList.product, count: orderList.count});

          });
          this.orders.push({products: products, status: order.status,addressId:order.adressId});
        });
      });
    });
    this.refreshAddress()
  }

  refreshAddress(){
    this.service.getAdressList().subscribe(data=>{
      this.adressList = data;
      for(let i = 0; i < data.length; i++){
        this.adressMap.set(this.adressList[i].adressId, this.adressList[i].city + ' ' + this.adressList[i].street + ' ' + this.adressList[i].homeNumber);
      }
    });
  }

}
