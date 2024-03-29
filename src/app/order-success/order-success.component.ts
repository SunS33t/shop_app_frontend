import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToOrders(){
    this.router.navigateByUrl("/home/order-list");
  }

  goToMain(){
    this.router.navigateByUrl("/home");
  }

}

