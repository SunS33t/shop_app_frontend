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

  addColor(){
    
  }

  updateColor(){
   
  }
}
