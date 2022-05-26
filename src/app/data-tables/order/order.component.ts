import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orderList$!:Observable<any[]>;
  displayedColumns: string[] = ['customer', 'address','status','action'];
  dataSource: any = null;
  customerMap: Map<string, string> = new Map();
  customerList: any[];
  adressMap: Map<string, string> = new Map();
  adressList: any[];
  order: any;
  modalTitle = "";
  activateAddEditComponent:boolean = false;

  constructor(private service:ApiService) { }

  ngOnInit(): void {
    this.orderList$ = this.service.getOrderList();
    this.dataSource = this.orderList$;
    this.refreshAdressMap();
    this.refreshCustomerMap();
  }

  modalEdit(element:any){
    this.order = element;
    this.modalTitle = "Изменить информацию о заказе"
    this.activateAddEditComponent = true;
  }

  delete(element: any){
    if(confirm(`Вы уверены, что хотите удалить заказ "${element.orderId}"`)){
      this.service.deleteOrder(element.orderId).subscribe(res=>{
      var showDeleteSuccess = document.getElementById('delete-success-alert');
      if(showDeleteSuccess) {
        showDeleteSuccess.style.display = "block";
      }
      setTimeout(function() {
        if(showDeleteSuccess) {
          showDeleteSuccess.style.display = "none"
        }
      }, 4000);
      this.orderList$ = this.service.getOrderList();
      this.dataSource = this.orderList$;
      })
    }
  }

  modalClose(){
    this.activateAddEditComponent = false;
    this.orderList$ = this.service.getOrderList();
    this.dataSource = this.orderList$;
  }

  refreshAdressMap(){
    this.service.getAdressList().subscribe(data=>{
      this.adressList = data;
      for(let i = 0; i < data.length; i++){
        this.adressMap.set(this.adressList[i].adressId,
          this.adressList[i].city + ',' + this.adressList[i].street + '-' + this.adressList[i].homeNumber);
      }
    });
  }

  refreshCustomerMap(){
    this.service.getCustomerList().subscribe(data=>{
      this.customerList = data;
      for(let i = 0; i < data.length; i++){
        this.customerMap.set(this.customerList[i].userId,
          this.customerList[i].fullName);
      }
    });
  }
}
