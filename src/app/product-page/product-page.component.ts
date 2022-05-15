import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../shared/api.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  productId: string;
  manufacturer: any;
  product: any;
  count: string;
  name:string;
  colorList$!: Observable<any[]>;
  colorMap: Map<string, string> = new Map();
  private sub: any;

  constructor(private route: ActivatedRoute, private service: ApiService, private userService: UserService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.productId = params['id'];
    });
    this.service.getProduct(this.productId).subscribe(product=> this.product = product);
    this.refreshColorMap()
    console.log(this.colorMap)
  }

  addToCart(){
    this.userService.addToCart(this.productId);
  }

  refreshColorMap(){
    let colorList
    this.service.getColorList().subscribe(data=>{
      colorList = data;
      for(let i = 0; i < data.length; i++){
        this.colorMap.set(colorList[i].colorCode, '#' + colorList[i].colorHex);
      }
    });
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}
