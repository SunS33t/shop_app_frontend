import { Component, Inject, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../shared/api.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
 @Input() product:any;

 brandName:string;
 brandLogo: string;


  constructor(private service: ApiService, private userService: UserService) { }

  ngOnInit(): void {
   this.service.getManufacrer(this.product.manufacturerId).subscribe(prod=> {
      this.brandName = prod.brandName;
      this.brandLogo = prod.brandLogo;}
     );
  }

  addToCart(){
    this.userService.addToCart(this.product.productId);
  }



}
