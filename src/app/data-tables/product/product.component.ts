import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productList$!: Observable<any[]>;
  colorList$!: Observable<any[]>;
  colorList:any = [];
  manufacturerList$!: Observable<any[]>;
  manufacturerList: any = [];
  displayedColumns: string[] = ['picture','name',
   'type', 'cost', 'size','description','weight',
   'difficulty','manufacturer','colors','action'];
  //dataSource: any = null;
  product: any;
  modalTitle = "";
  activateAddEditComponent:boolean = false;

  colorMap: Map<string, string> = new Map();
  manufacturerMap: Map<string, string> = new Map();

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;

  constructor(private service:ApiService) { }

  ngOnInit(): void {
    this.productList$ = this.service.getProductList();
    this.colorList$ = this.service.getColorList();
    this.manufacturerList$ = this.service.getManufacrerList();
    this.productList$.subscribe(items=> {
      this.dataSource.data = items;
      this.dataSource.paginator = this.paginator;
    })
    this.refreshMaps();
  }

  modalAdd(){
    this.product = {
      productId: "",
      name:"",
      picture:"",
      type:"",
      cost: 0,
      size:"",
      description:"",
      weight:"",
      difficulty:"",
      manufacturerId:"",
      colorLists: []
    }
    this.modalTitle ="Добавление нового товара";
    this.activateAddEditComponent = true;

  }

  modalEdit(element:any){
    this.product = element;
    this.modalTitle = "Изменить информацию о товаре";
    this.activateAddEditComponent = true;
  }

  delete(element:any){
    if(confirm(`Вы уверены, что хотите удалить товар "${element.name}"?`)){
      this.service.deleteProduct(element.productId).subscribe(res=>{
      var showDeleteSuccess = document.getElementById('delete-success-alert');
      if(showDeleteSuccess) {
        showDeleteSuccess.style.display = "block";
      }
      setTimeout(function() {
        if(showDeleteSuccess) {
          showDeleteSuccess.style.display = "none"
        }
      }, 4000);
      this.productList$ = this.service.getProductList();
      this.productList$.subscribe(items=> {
        this.dataSource.data = items;
        this.dataSource.paginator = this.paginator;
      });
      })
    }
  }

  modalClose(){
    this.activateAddEditComponent = false;
    this.productList$ = this.service.getProductList();
    this.productList$.subscribe(items=> {
      this.dataSource.data = items;
      this.dataSource.paginator = this.paginator;
    });
  }

  refreshColorMap(){
    this.service.getColorList().subscribe(data=>{
      this.colorList = data;
      for(let i = 0; i < data.length; i++){
        this.colorMap.set(this.colorList[i].colorCode, this.colorList[i].colorName);
      }
    });
  }

  refreshManufacturerMap(){
    this.service.getManufacrerList().subscribe(data=>{
      this.manufacturerList = data;
      for(let i = 0; i < data.length; i++){
        this.manufacturerMap.set(this.manufacturerList[i].manufacturerId, this.manufacturerList[i].brandName);
      }
    });
  }

  refreshMaps(){
    this.refreshColorMap();
    this.refreshManufacturerMap();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
