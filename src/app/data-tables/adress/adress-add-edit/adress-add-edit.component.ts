import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { GuidGeneratorService } from 'src/app/shared/guid-generator.service';

@Component({
  selector: 'app-adress-add-edit',
  templateUrl: './adress-add-edit.component.html',
  styleUrls: ['./adress-add-edit.component.css']
})
export class AdressAddEditComponent implements OnInit {
  constructor(private service:ApiService,private guidGen:GuidGeneratorService) { }

  @Input() adress:any;
  adressId: string = "";
  city: string = "";
  street: string = "";
  homeNumber: number = 0;
  additionalInformation: string = "";

  ngOnInit(): void {
    this.adressId = this.adress.adressId;
    this.city = this.adress.city;
    this.street = this.adress.street;
    this.homeNumber = this.adress.homeNumber;
    this.additionalInformation = this.adress.additionalInformation;
  }

  addAdress(){
    var adress ={
      adressId: this.guidGen.newGuid(), 
      city :  this.city,
      street : this.street,
      homeNumber : this.homeNumber,
      additionalInformation: this.additionalInformation
    }
    this.service.addAdress(adress).subscribe(res=>{
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

  updateAdress(){
    var adress = {
      adressId: this.adressId,
      city: this.city,
      street: this.street,
      homeNumber: this.homeNumber,
      additionalInformation: this.additionalInformation
    }
    var id:string = this.adressId;
    this.service.updateAdress(id,adress).subscribe(res=>{
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
