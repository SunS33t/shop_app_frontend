import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../shared/api.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-customer-cart',
  templateUrl: './customer-cart.component.html',
  styleUrls: ['./customer-cart.component.css']
})
export class CustomerCartComponent implements OnInit {

  cart:any = [];
  productCounts:Map<string,number> = new Map();

  constructor(private service:ApiService, private userService: UserService) { }

  ngOnInit(): void {
    this.service.getCustomer(this.userService.getCustomerId()).subscribe(x=>{  
      for(let i = 0; i < x.customerCarts.length;i++){
        this.service.getProduct(x.customerCarts[i].productId).subscribe(p=>{
          this.cart.push(p); 
          this.productCounts.set(x.customerCarts[i].productId, x.customerCarts[i].count);
        });
      }
    });
  }

  clearCart(){
    this.userService.clearCart();
  }

  minusProduct(productId:string){
    if(this.productCounts.get(productId) > 1){
      this.userService.removeFromCart(productId);
      this.productCounts.set(productId,(this.productCounts.get(productId)??0) - 1);
    }
  }

  plusProduct(productId:string){
    this.userService.addToCart(productId);
    this.productCounts.set(productId,(this.productCounts.get(productId)??0) + 1);
  }

  removeFromCart(productId:string){
    this.userService.deleteProductFromCart(productId);
    this.cart = this.cart.filter((prod:any )=>prod.productId !== productId);
    this.productCounts.delete(productId);
  }

  getSumCount(){
    let sum = 0;
    this.productCounts.forEach(x=> sum+=x);
    return sum;
  }

  getSumPrice(){
    let sum = 0;
    this.cart.forEach((x:any) => {
      sum+=x.cost * this.productCounts.get(x.productId);
    });
    return sum;
  }

}
