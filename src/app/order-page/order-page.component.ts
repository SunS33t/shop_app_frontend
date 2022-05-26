import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ApiService } from '../shared/api.service';
import { GuidGeneratorService } from '../shared/guid-generator.service';
import { UserService } from '../shared/user.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {
  customer: any;
  customerCart: {product:any, count:number} [] = [];
  adressList$!: Observable<any>;
  adressMap: Map<string,string> = new Map();
  availableShops: any[] = [];
  init: boolean = false;
  sumCost = 0;
  //stepper
  shopFormGroup: FormGroup;
  useraddressFormGroup: FormGroup;
  checkFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  selected = new FormControl('valid', [Validators.required, Validators.pattern('valid')]);
  matcher = new MyErrorStateMatcher();

  /* 
    TODO:  Доделать вывод данных в форме проверки, сделать чекбокс
    TODO:  Проверка баланса при совершении покупки
    TODO:  Если покупка проходит: очистить корзину, минус баланс, перекинуть на страницу "Спасибо за покупку"
    TODO:  Добавить наполнению на вкладку "Мои заказы"
    ??     Добвить *ngIf для потенциально пустых мест(корзина)
    TODO:  Добавить таблицу с заказами для администратора
    ??     Стилизация подробной информации
  */

  constructor(private guider:GuidGeneratorService, private router:Router ,private _formBuilder: FormBuilder,private service: ApiService, private userService: UserService, public toastr: ToastrService) { }

  ngOnInit(): void {
    //stepper
    this.shopFormGroup = this._formBuilder.group({
      shop: ['', Validators.required],
    });

    this.useraddressFormGroup = this._formBuilder.group({
      city: ['', Validators.required, ],
      street: ['', Validators.required],
      number: ['', Validators.required],
      additional: ['', Validators.required],

    })
    this.checkFormGroup = this._formBuilder.group({
      checkCtrl: ['', Validators.requiredTrue],
    });
    //Заполнение корзины
    this.userService.getCustomerInfo().subscribe((customer:any) => {
      this.customer = customer;
      this.service.getProductList().subscribe((products:any[])=>{
        for(let i = 0; i < customer.customerCarts.length;i++){   
            this.customerCart.push({product: products.find(p=>p.productId ==customer.customerCarts[i].productId ), count: customer.customerCarts[i].count}); 
            this.sumCost+= products.find(p=>p.productId == customer.customerCarts[i].productId).cost * customer.customerCarts[i].count;
          }
        this.checkShops();
      })
  });
  this.init = true;
  }

  //Поиск магазина со всеми товарами из корзины
  checkShops(){
    let check = true;
    this.service.getShopList().subscribe((shops:any)=>{
      shops.forEach((shop:any)=>{
        check = true;
        this.customerCart.forEach((pair)=>{
          if(!shop.productLists.some((pr:any)=> pr.productId == pair.product.productId && pr.count > pair.count)){
            check = false;
          }
        });
        if(check){
          this.availableShops.push(shop);
        }
      });
    });
  }
  
  order(){
    if(this.sumCost < this.customer.balance){
      //Определение адреса
      let addressId = "";
      if(this.shopFormGroup.controls['shop'].value) {
        addressId = this.shopFormGroup.controls['shop'].value.adressId;
        this.createOrder(addressId);
      }
      else {
        addressId = this.guider.newGuid();
        let address = {
          street: this.useraddressFormGroup.controls['street'].value,
          city:this.useraddressFormGroup.controls['city'].value,
          homeNumber: this.useraddressFormGroup.controls['number'].value,
          additionalInformation: this.useraddressFormGroup.controls['additional'].value, 
          adressId: addressId
        }
        this.service.addAdress(address).subscribe(_=>{
          //Создание заказа
          this.createOrder(addressId);
        });
      }
    }
    else{
      this.toastr.error("Недостаточно средств","Ошибка при совершении заказа");
    }
  }
  createOrder(addressId:string){
    let orderId = this.guider.newGuid();
          
    let orderList : {productId:string, orderId: string, count: number}[] = [];
    this.customerCart.forEach(x=>{
      orderList.push({productId: x.product.productId, orderId: orderId, count: x.count})
    });

    let order = {
      orderId: orderId,
      userId: this.customer.userId,
      adressId: addressId,
      status:"Сборка заказа",
      orderLists: orderList
    }

    this.service.addOrder(order).subscribe();
    //Уменьшение баланса
    this.userService.pay(this.sumCost);
    this.userService.clearCart();
    this.router.navigateByUrl('/order-success');
  }

}
