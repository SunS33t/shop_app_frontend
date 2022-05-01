import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(public service: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.formModel.reset();
  }

  onSubmit(){
    this.service.register().subscribe(
      (res:any) => {
        if(res.succeeded){
          this.service.formModel.reset();
          this.toastr.success('Пользователь создан.','Регистрация прошла успешно');
        }
        else {
          res.errors.forEach((element:any) => {
            switch(element.code){
              case 'DuplicateUserName':
                this.toastr.error('Имя пользователя занято','Ошбка при регистрации');
                break;
                default:
                  this.toastr.error(element.description,'Ошбка при регистрации');
                break;
            }
          });
        }
      },
      err => {
        console.log(err);
      }
    );
  }

}
