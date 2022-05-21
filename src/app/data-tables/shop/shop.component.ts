import {Component, ElementRef, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {

  shopList$!: Observable<any[]>;
  adressList$!: Observable<any[]>;
  adressList:any = [];
  productList:any = [];
  displayedColumns: string[] = ['name','adress','availability','action'];
  shop: any;
  modalTitle = "";
  activateAddEditComponent:boolean = false;

  adressMap: Map<string, string> = new Map();
  productMap: Map<string, string> = new Map();

  dataSource = new MatTableDataSource<any>();

  constructor(private service:ApiService) { }

  ngOnInit(): void {
    this.shopList$ = this.service.getShopList();
    this.shopList$.subscribe();
    this.adressList$ = this.service.getAdressList();
    this.shopList$.subscribe(items=> {
      this.dataSource.data = items;
    })
    this.refreshAdressMap();
    this.refreshProductMap();
  }

  modalAdd(){
    this.shop = {
      shopId: "",
      shopName:"",
      adressId:"" 
    }
    this.modalTitle ="Добавление нового магазина";
    this.activateAddEditComponent = true;
  }

  modalEdit(element:any){
    this.shop = element;
    this.modalTitle = "Изменить информацию о магазине";
    this.activateAddEditComponent = true;
  }

  delete(element:any){
    if(confirm(`Вы уверены, что хотите удалить магазин "${element.shopName}"?`)){
      this.service.deleteShop(element.shopId).subscribe(res=>{
      var showDeleteSuccess = document.getElementById('delete-success-alert');
      if(showDeleteSuccess) {
        showDeleteSuccess.style.display = "block";
      }
      setTimeout(function() {
        if(showDeleteSuccess) {
          showDeleteSuccess.style.display = "none"
        }
      }, 4000);
      this.shopList$ = this.service.getShopList();
      this.shopList$.subscribe(items=> {
        this.dataSource.data = items;
      });
      })
    }
  }

  modalClose(){
    this.activateAddEditComponent = false;
    this.shopList$ = this.service.getShopList();
    this.shopList$.subscribe(items=> {
      this.dataSource.data = items;
    });
  }

  refreshAdressMap(){
    this.service.getAdressList().subscribe(data=>{
      this.adressList = data;
      for(let i = 0; i < data.length; i++){
        this.adressMap.set(this.adressList[i].adressId,
          this.adressList[i].city + ' ' + this.adressList[i].street + ' '  + ' ' + this.adressList[i].homeNumber);
      }
    });
  }

  refreshProductMap(){
    this.service.getProductList().subscribe(data=>{
      this.productList = data;
      for(let i = 0; i < data.length; i++){
        this.productMap.set(this.productList[i].productId,
          this.productList[i].name);
      }
    });
  }
}
