import { Component, OnInit } from '@angular/core';
import { delay, filter, map, Observable } from 'rxjs';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  productList$!: Observable<any[]>;
  filterValue: string;
  constructor(private service: ApiService) { }

  ngOnInit(): void {
    this.productList$ = this.service.getProductList();
  }

  onValChange(value:any){
    switch(value){
      case "all":{
        this.productList$ = this.service.getProductList();
        break;
      }
      case "2x2":{
        this.productList$ = this.service.getProductList().pipe(
          map(product => product.filter((prod:any) => prod.type.includes('Куб 2')))
           );
        break;
      }
      case "3x3":{
        this.productList$ = this.service.getProductList().pipe(
          map(product => product.filter((prod:any) => prod.type.includes('Куб 3')))
           );
        break;
      }
      case "cube":{
        this.productList$ = this.service.getProductList().pipe(
          map(product => product.filter((prod:any) => prod.type.includes('Куб')))
           );
        break;
      }
      case "pir":{
        this.productList$ = this.service.getProductList().pipe(
          map(product => product.filter((prod:any) => prod.type.includes('ирамид')))
           );
        break;
      }
      case "mega":{
        this.productList$ = this.service.getProductList().pipe(
          map(product => product.filter((prod:any) => prod.type.includes('егамин')))
           );
        break;
      }
      case "sqweb":{
        this.productList$ = this.service.getProductList().pipe(
          map(product => product.filter((prod:any) => prod.type.includes('кьюб')))
           );
        break;
      }
      case "sqwaer":{
        this.productList$ = this.service.getProductList().pipe(
          map(product => product.filter((prod:any) => prod.type.includes('ваер')))
           );
        break;
      }
      case "forms":{
        this.productList$ = this.service.getProductList().pipe(
          map(product => product.filter((prod:any) => prod.type.includes('форму')))
           );
        break;
      }
    }
    
    this.onValChangeSort(this.filterValue);
  }
  
  onValChangeSort(value:any){
    this.filterValue = value;
    switch(value){
      case "name":{
        this.productList$ = this.productList$.pipe(
          map((data:any)=>{
            data.sort((a:any,b:any) =>{
              return a.name < b.name ? -1 : 1;
            })
            return data;
          }
        ));
        break;
      }
      case "cost-up":{
        this.productList$ = this.productList$.pipe(
          map((data:any)=>{
            data.sort((a:any,b:any) =>{
              return a.cost > b.cost ? -1 : 1;
            })
            return data;
          }
        ));
        break;
      }
      case "cost-down":{
        this.productList$ = this.productList$.pipe(
          map((data:any)=>{
            data.sort((a:any,b:any) =>{
              return a.cost < b.cost ? -1 : 1;
            })
            return data;
          }
        ));
        break;
      }
    }
  }
}
