import { ENTER, X } from '@angular/cdk/keycodes';
import { DatePipe } from '@angular/common';
import { StringMapWithRename } from '@angular/compiler/src/compiler_facade_interface';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, Observable, startWith } from 'rxjs';
import { ApiService } from 'src/app/shared/api.service';
import { GuidGeneratorService } from 'src/app/shared/guid-generator.service';

@Component({
  selector: 'app-shop-add-edit',
  templateUrl: './shop-add-edit.component.html',
  styleUrls: ['./shop-add-edit.component.css']
})
export class ShopAddEditComponent implements OnInit {
  shopList$!: Observable<any[]>;
  adressList$!: Observable<any[]>;
  productList$!: Observable<any[]>;


  separatorKeysCodes: number[] = [ENTER];  // *Клавиши для добавления нового значения
  productCtrl = new FormControl();    // * Форма с инпутом для текста
  filteredProducts: Observable<any[]>;  //* Отфильтрованный дроп лист с учетом значения в formCtrl
  selectedProducts: any[] = [];  //* Список значений чипсов
  allProducts: any[] = [];  //* Список всех возможных значений


  @Input() shop: any;
  shopName: string = ""
  adressId: string = "";
  date = new FormControl(new Date());
  
  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;


  constructor(private service: ApiService, private guidGen: GuidGeneratorService) {

  }

  ngOnInit(): void {
    this.shopName = this.shop.shopName;
    this.adressId = this.shop.adressId;
    this.adressList$ = this.service.getAdressList();
    this.productList$ = this.service.getProductList();
    this.productList$.subscribe(products => {
      this.allProducts = products;
      if(this.shop.shopId)
      this.shop.productLists.forEach((element:any) => {
        this.selectedProducts.push({product: this.allProducts.find(x=> x.productId == element.productId), count: 1, date: new Date()});
      });
      this.filteredProducts = this.productCtrl.valueChanges.pipe(
        startWith(null),
        map((product: any | null) => (product ? this._filter(product) : this.allProducts.slice())),
      );
    });
  }

dateToAspFormat(date: string):string{
  if(!date){
    return null;
  }
  let pipe = new DatePipe('en-US');
  return pipe.transform(date, 'yyyy-MM-ddTh:mm:ss.865')+'Z';
}

check(){
  console.log(this.adressId)
}

  addShop(){
    var id = this.guidGen.newGuid();
    var shop = {
      shopId: id,
      shopName: this.shopName,
      adressId: this.adressId
    }
    this.service.addShop(shop).subscribe(res=>{
      this.selectedProducts.forEach(elem=>{
        this.service.addProductToShop({shopId: id, productId: elem.product.productId, count: elem.count,deliveryDate: this.dateToAspFormat(elem.date)}).subscribe();
      });

      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn) {
        closeModalBtn.click();
      }
      var showAddSuccess = document.getElementById('add-success-alert');
      if(showAddSuccess) {
        showAddSuccess.style.display = "block";
      }
      setTimeout(function() {
        if(showAddSuccess) {
          showAddSuccess.style.display = "none"
        }
      }, 4000);
    });
  }

  updateShop(){

  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our product
    if (value && this.allProducts.includes(value)) {
      this.selectedProducts.push({product:value, count: 0, date: null});
      this.allProducts = this.allProducts.filter(x => x != value);
    }
    // Clear the input value
    event.chipInput!.clear();
    this.productCtrl.setValue(null);
  }

  remove(product: any): void {
    const index = this.selectedProducts.findIndex(x => x.product == product);
    this.allProducts.push(product);
    if (index >= 0) {
      this.selectedProducts.splice(index, 1);
    }
    this.productCtrl.setValue(null);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedProducts.push({product:event.option.value, count: 0, date: null});
    this.allProducts = this.allProducts.filter(x=> x != event.option.value);
    this.fruitInput.nativeElement.value = '';
    this.productCtrl.setValue(null);
  }

  private _filter(value: any): any[] {
    var filterValue:any;
    if(value.name){
      filterValue = value.name.toLowerCase();
    }else{
      filterValue = value.toLowerCase();
    }
    return this.allProducts.filter(product => product.name.toLowerCase().includes(filterValue));
  }

}
