import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { GuidGeneratorService } from 'src/app/shared/guid-generator.service';

@Component({
  selector: 'app-color-add-edit',
  templateUrl: './color-add-edit.component.html',
  styleUrls: ['./color-add-edit.component.css']
})
export class ColorAddEditComponent implements OnInit {


  constructor(private service:ApiService, private guidGen:GuidGeneratorService) { }

  @Input() color:any;
  colorCode: string = "";
  colorName: string = "";
  colorHex: string = "";
  ngOnInit(): void {
    this.colorCode = this.color.colorCode;
    this.colorName = this.color.colorName;
    this.colorHex = this.color.colorHex;
  }

  addColor(){
    var color ={
      colorCode: this.guidGen.newGuid(), 
      colorName :  this.colorName,
      colorHex: this.colorHex
    }

    this.service.addColor(color).subscribe(res=>{
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

  updateColor(){
    var color = {
      colorCode: this.colorCode,
      colorHex: this.colorHex,
      colorName: this.colorName
    }
    var id:string = color.colorCode;
    this.service.updateColor(id,color).subscribe(res=>{
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
