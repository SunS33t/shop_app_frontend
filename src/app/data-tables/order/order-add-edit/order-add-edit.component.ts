import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { GuidGeneratorService } from 'src/app/shared/guid-generator.service';

@Component({
  selector: 'app-order-add-edit',
  templateUrl: './order-add-edit.component.html',
  styleUrls: ['./order-add-edit.component.css']
})
export class OrderAddEditComponent implements OnInit {

  constructor(private service:ApiService, private guidGen:GuidGeneratorService) { }

  @Input() order:any;
  userId: string = "";
  adressId: string = "";
  status: string = "";

  ngOnInit(): void {
    this.userId = this.order.userId;
    this.adressId = this.order.adressId;
    this.status = this.order.status;
  }

  updateOrder(){
    var order = {
      orderId: this.order.orderId,
      userId: this.userId,
      adressId: this.adressId,
      status: this.status
    }
    var id:string = this.order.orderId;
    this.service.updateOrder(id,order).subscribe(res=>{
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

  setStatus(status: string){
    this.status = status;
  }
}
