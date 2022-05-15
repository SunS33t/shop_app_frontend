import { Component, Input, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/api.service';
import { GuidGeneratorService } from 'src/app/shared/guid-generator.service';

@Component({
  selector: 'app-product-add-edit',
  templateUrl: './product-add-edit.component.html',
  styleUrls: ['./product-add-edit.component.css']
})
export class ProductAddEditComponent implements OnInit {

  productList$!: Observable<any[]>;
  manufacturerList$!: Observable<any[]>;
  colorList$!: Observable<any[]>;

  constructor(private service:ApiService,private guidGen:GuidGeneratorService) { }
  
  @Input() product:any;
  picture:string = "";
  name:string= "";
  type: string = "";
  cost: number = 0;
  size: string = "";
  description: string = "";
  weight:string =  "";
  difficulty: string = "";
  productId: string = "";
  manufacturerId: string = "";
  colorLists: any[] = [];

  private selectedFile: File = null;
  private base64textString: string = "";

  ngOnInit(): void {
    this.picture = this.product.picture;
    this.name = this.product.name;
    this.type = this.product.type;
    this.cost = this.product.cost;
    this.size = this.product.size;
    this.description = this.product.description;
    this.weight = this.product.weight;
    this.difficulty = this.product.difficulty;
    this.productId = this.product.productId;
    this.manufacturerId = this.product.manufacturerId;
    this.colorLists = this.product.colorLists.map((x:any)=>x.colorCode);
    this.productList$ = this.service.getProductList();
    this.manufacturerList$ = this.service.getManufacrerList();
    this.colorList$ = this.service.getColorList();
  }

  onSelectFile(fileInput: any) {
    this.selectedFile = <File>fileInput.target.files[0];
    var reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(this.selectedFile);
  }

  _handleReaderLoaded(readerEvt: any) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
  }

  deleteImage(){
    this.picture = "";
  }

  addProduct(){
    var id = this.guidGen.newGuid();

    var productColorList = [];
    for(let i = 0; i < this.colorLists.length; i++){
      productColorList.push({productId: id,colorCode: this.colorLists[i]});
    }
    var product = {
      picture: this.base64textString,
      name: this.name,
      type: this.type,
      cost: this.cost,
      size: this.size,
      description: this.description,
      weight: this.weight,
      difficulty: this.difficulty,
      productId: id,
      manufacturerId: this.manufacturerId,
      colorLists: productColorList
    }
    this.service.addProduct(product).subscribe(res=>{
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

  updateProduct(){
    var productColorList = [];

    for(let i = 0; i < this.colorLists.length; i++){
      productColorList.push({productId: this.product.productId,colorCode: this.colorLists[i]});
    }

    var product = {
      picture: this.base64textString == ""? this.product.picture : this.base64textString,
      name: this.name,
      type: this.type,
      cost: this.cost,
      size: this.size,
      description: this.description,
      weight: this.weight,
      difficulty: this.difficulty,
      productId: this.product.productId,
      manufacturerId: this.manufacturerId,
      colorLists: productColorList
    }

    var id:string = this.product.productId;
    this.service.deleteAllColors(id).subscribe(x=> {
      product.colorLists.forEach(color =>this.service.addProductColor({productId: id, colorCode:color.colorCode}).subscribe(
        y=>{
          this.service.updateProduct(id,product).subscribe(res=>{
            var closeModalBtn = document.getElementById('add-edit-modal-close');
            if(closeModalBtn) {
              closeModalBtn.click();
            }
            var showUpdateSuccess = document.getElementById('update-success-alert');
            if(showUpdateSuccess) {
              showUpdateSuccess.style.display = "block";
            }
            setTimeout(function() {
              if(showUpdateSuccess) {
                showUpdateSuccess.style.display = "none"
              }
            }, 4000);
          });
        }
      ));
    });
  }

}
