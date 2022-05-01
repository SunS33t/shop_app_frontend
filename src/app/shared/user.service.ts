import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import{HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb:FormBuilder, private http: HttpClient) { }
  readonly BaseURI = "https://localhost:44380/api"

  formModel = this.fb.group({
    UserName:['', Validators.required],
    FullName:['',Validators.required],
    Email:['',Validators.required],
    Passwords : this.fb.group({
      Password:['', [Validators.required,Validators.minLength(4)]],
      ConfirmPassword:['', Validators.required]
    },{validator: this.comparePasswords})
    
  });

  comparePasswords(fb: FormGroup){
    let confirmPswd = fb.get('ConfirmPassword');
    if(confirmPswd.errors == null || 'passwordMissmatch' in confirmPswd.errors){
      if(fb.get('Password').value != confirmPswd.value)
        confirmPswd.setErrors({passwordMissmatch: true});
        else
        confirmPswd.setErrors(null);
    }
  }

  register(){
    var body = {
      UserName: this.formModel.value.UserName,
      FullName: this.formModel.value.FullName,
      Email: this.formModel.value.Email,
      Password: this.formModel.value.Passwords.Password,
    };
    return this.http.post(this.BaseURI + '/ApplicationUser/Register', body);
  }
}
