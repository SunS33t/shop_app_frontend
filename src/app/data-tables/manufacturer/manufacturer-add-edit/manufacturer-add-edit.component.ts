import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/api.service';
import { GuidGeneratorService } from 'src/app/shared/guid-generator.service';

@Component({
  selector: 'app-manufacturer-add-edit',
  templateUrl: './manufacturer-add-edit.component.html',
  styleUrls: ['./manufacturer-add-edit.component.css']
})
export class ManufacturerAddEditComponent implements OnInit {

  constructor(private service:ApiService,private guidGen:GuidGeneratorService) { }

  @Input() manufacturer:any;
  manufacturerId: string = "";
  brandName: string = "";
  country: string = "";
  brandLogo: string = "";

  private selectedFile: File = null;
  private base64textString: String = "";

  ngOnInit(): void {
    this.manufacturerId = this.manufacturer.manufacturerId;
    this.brandName = this.manufacturer.brandName;
    this.country = this.manufacturer.country;
    this.brandLogo = this.manufacturer.brandLogo;
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
    this.brandLogo = "";
  }

  addManufacturer(){
    var manufacturer ={
      manufacturerId: this.guidGen.newGuid(), 
      brandName :  this.brandName,
      country : this.country,
      brandLogo : this.base64textString
    }
    this.service.addManufacturer(manufacturer).subscribe(res=>{
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

  updateManufacturer(){
    var manufacturer = {
      manufacturerId: this.manufacturerId,
      brandName: this.brandName,
      brandLogo: this.base64textString == "" ? this.brandLogo : this.base64textString,
      country: this.country
    }
    var id:string = this.manufacturerId;
    this.service.updateManufacturer(id,manufacturer).subscribe(res=>{
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
}
