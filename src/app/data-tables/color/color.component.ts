import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  colorList$!:Observable<any[]>;
  displayedColumns: string[] = ['colorName', 'colorHex','preview','action'];
  dataSource: any = null;
  color: any;
  modalTitle = "";
  activateAddEditComponent:boolean = false;

  constructor(private service:ApiService) { }

  ngOnInit(): void {
    this.colorList$ = this.service.getColorList();
    this.dataSource = this.colorList$;
  }
  modalAdd(){
    this.color ={
      colorCode:"",
      colorName:"",
      colorHex:""
    }
    this.modalTitle = "Добавление нового цвета";
    this.activateAddEditComponent = true;
  }

  modalEdit(element:any){
    this.color = element;
    this.modalTitle = "Изменить информацию о цвете"
    this.activateAddEditComponent = true;
  }

  delete(element: any){
    if(confirm(`Вы уверены, что хотите удалить цвет "${element.colorName}"`)){
      this.service.deleteColor(element.colorCode).subscribe(res=>{
      var showDeleteSuccess = document.getElementById('delete-success-alert');
      if(showDeleteSuccess) {
        showDeleteSuccess.style.display = "block";
      }
      setTimeout(function() {
        if(showDeleteSuccess) {
          showDeleteSuccess.style.display = "none"
        }
      }, 4000);
      this.colorList$ = this.service.getColorList();
      this.dataSource = this.colorList$;
      })
    }
  }

  modalClose(){
    this.activateAddEditComponent = false;
    this.colorList$ = this.service.getColorList();
    this.dataSource = this.colorList$;
  }

}
