import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-adress',
  templateUrl: './adress.component.html',
  styleUrls: ['./adress.component.css']
})
export class AdressComponent implements OnInit {

  adressList$!:Observable<any[]>;
  displayedColumns: string[] = ['city', 'street', 'homeNumber','additionalInformation', 'action'];
  dataSource: any = null;
  adress: any;
  modalTitle = "";
  activateAddEditComponent:boolean = false;

  constructor(private service:ApiService) { }

  ngOnInit(): void {
    this.adressList$ = this.service.getAdressList();
    this.dataSource = this.adressList$;
  }

  modalAdd(){
    this.adress ={
      adressId:"",
      city:"",
      street:"",
      homeNumber: 0,
      additionalInformation:""
    }
    this.modalTitle = "Добавление нового адреса";
    this.activateAddEditComponent = true;
  }

  modalEdit(element:any){
    this.adress = element;
    this.modalTitle = "Изменить информацию об адресе";
    this.activateAddEditComponent = true;
  }

  delete(element: any){
    if(confirm(`Вы уверены, что хотите удалить адрес "${element.city}  ${element.street} ${element.number}"`)){
      this.service.deleteAdress(element.adressId).subscribe(res=>{
      var showDeleteSuccess = document.getElementById('delete-success-alert');
      if(showDeleteSuccess) {
        showDeleteSuccess.style.display = "block";
      }
      setTimeout(function() {
        if(showDeleteSuccess) {
          showDeleteSuccess.style.display = "none"
        }
      }, 4000);
      this.adressList$ = this.service.getAdressList();
      this.dataSource = this.adressList$;
      })
    }
  }

  modalClose(){
    this.activateAddEditComponent = false;
    this.adressList$ = this.service.getAdressList();
    this.dataSource = this.adressList$;
  }

}
