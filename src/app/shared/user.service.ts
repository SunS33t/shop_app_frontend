import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import{HttpClient, HttpHeaders} from "@angular/common/http";
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb:FormBuilder, private http: HttpClient, private service: ApiService) { }
  readonly BaseURI = "https://localhost:44380/api"

  formModel = this.fb.group({
    UserName:['', Validators.required],
    FullName:['',Validators.required],
    Email:['',Validators.required],
    Passwords : this.fb.group({
      Password:['', [Validators.required,Validators.minLength(4)]],
      ConfirmPassword:['', Validators.required]
    },{validator: this.comparePasswords})
    
  });

  comparePasswords(fb: FormGroup){
    let confirmPswd = fb.get('ConfirmPassword');
    if(confirmPswd.errors == null || 'passwordMissmatch' in confirmPswd.errors){
      if(fb.get('Password').value != confirmPswd.value)
        confirmPswd.setErrors({passwordMissmatch: true});
        else
        confirmPswd.setErrors(null);
    }
  }

  register(){
    var body = {
      UserName: this.formModel.value.UserName,
      FullName: this.formModel.value.FullName,
      Email: this.formModel.value.Email,
      Password: this.formModel.value.Passwords.Password,
    };
    return this.http.post(this.BaseURI + '/ApplicationUser/Register', body);
  }

  login(formData: any){
    return this.http.post(this.BaseURI + '/ApplicationUser/Login', formData);
  }

  getUserProfile(){
    return this.http.get(this.BaseURI + '/UserProfile');
  }

  roleMatch(allowedRoles: any[]): boolean {
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    var userRole = payLoad.role;
    return !!allowedRoles.find((element:any) => {
      return (userRole == element)
    });
  }

  getCustomerId(){
    var token = localStorage.getItem('token');
    let payload;
    if(token){
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload).UserID;
    }
    else{
      return null;
    }
  }

  addToCart(productId: string){
    var customerId = this.getCustomerId();
    this.service.getCustomer(customerId).subscribe(customer => {
      let cart = [];
      cart = customer.customerCarts;
      if(cart.some((x:any) => x.productId == productId)){
          this.service.addCountToCart(customerId, productId, ++cart.filter((x:any) => x.productId == productId)[0].count).subscribe();   
      }
      else{
        this.service.addCustomerCarts(customerId, productId, 1).subscribe();
      }
    });
  }

  removeFromCart(productId:string){
    var customerId = this.getCustomerId();
    this.service.getCustomer(customerId).subscribe(customer => {
      let cart = [];
      cart = customer.customerCarts;
      if(cart.some((x:any) => x.productId == productId && x.count > 1)){
          this.service.deleteCountFromCart(customerId, productId, --cart.filter((x:any) => x.productId == productId)[0].count).subscribe();   
      }
      else{
        this.service.deleteProductFromCart(customerId, productId).subscribe();
      }
    });
  }

  deleteProductFromCart(productId:string){
    var customerId = this.getCustomerId();
    this.service.deleteProductFromCart(customerId,productId).subscribe();
  }
}
