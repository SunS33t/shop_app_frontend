import { P } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DonateDialogComponent } from '../donate-dialog/donate-dialog.component';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userDetails: any;
  balance: number;
  constructor(public router:Router, private service: UserService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.service.getUserProfile().subscribe(
      res => {
        this.userDetails = res;
      },
      err => {
        console.log(err);
      },
    );
    if(this.checkCustomerRole){
      this.service.getCustomerInfo().subscribe((cust:any)=>this.balance = cust.balance);
    }
  }

  openDialog(){
    const dialogRef = this.dialog.open(DonateDialogComponent,{
      data:{number:"",password:"", amount:""}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.service.donate(result.number,result.password,result.amount);
      setTimeout(()=>{
        this.refreshBalance();
      },500)
    });
  }

  refreshBalance(){
    this.service.getCustomerInfo().subscribe((x:any)=> this.balance = x.balance);
  }

  checkAdminRole(){
    return this.service.roleMatch(['Admin']);
  }

  checkCustomerRole(){
    return this.service.roleMatch(['Customer']);
  }

  onLogout(){
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }
}
