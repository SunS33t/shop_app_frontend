import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  productList$!: Observable<any[]>;
  constructor(private service: ApiService) { }

  ngOnInit(): void {
    this.productList$ = this.service.getProductList();
  }

  

}
