import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/api.service';
@Component({
  selector: 'app-manufacturer',
  templateUrl: './manufacturer.component.html',
  styleUrls: ['./manufacturer.component.css']
})
export class ManufacturerComponent implements OnInit {

  manufacturerList$!:Observable<any[]>;
  displayedColumns: string[] = ['name', 'country', 'logo', 'action'];
  dataSource: any = null;
  manufacturer: any;
  modalTitle = "";
  activateAddEditComponent:boolean = false;

  constructor(private service:ApiService) { }

  ngOnInit(): void {
    this.manufacturerList$ = this.service.getManufacrerList();
    this.dataSource = this.manufacturerList$;
  }

  modalAdd(){
    this.manufacturer ={
      manufacturerId:"",
      brandLogo:"",
      brandName:"",
      country:""
    }
    this.modalTitle = "Добавление нового производителя";
    this.activateAddEditComponent = true;
  }

  modalEdit(element:any){
    this.manufacturer = element;
    this.modalTitle = "Изменить информацию о производителе"
    this.activateAddEditComponent = true;
  }

  delete(element: any){
    if(confirm(`Вы уверены, что хотите удалить производителя "${element.brandName}"`)){
      this.service.deleteManufacturer(element.manufacturerId).subscribe(res=>{
      var showDeleteSuccess = document.getElementById('delete-success-alert');
      if(showDeleteSuccess) {
        showDeleteSuccess.style.display = "block";
      }
      setTimeout(function() {
        if(showDeleteSuccess) {
          showDeleteSuccess.style.display = "none"
        }
      }, 4000);
      this.manufacturerList$ = this.service.getManufacrerList();
      this.dataSource = this.manufacturerList$;
      })
    }
  }

  modalClose(){
    this.activateAddEditComponent = false;
    this.manufacturerList$ = this.service.getManufacrerList();
    this.dataSource = this.manufacturerList$;
  }

}
