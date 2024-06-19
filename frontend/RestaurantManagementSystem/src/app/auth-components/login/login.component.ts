import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth-services/auth-service/auth.service';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { StorageService } from '../../auth-services/storage-services/storage.service';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,NzSpinModule,NzFormModule,NzButtonModule,NzCheckboxModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm : FormGroup;
  isSpinning : boolean;

  constructor(private authservice: AuthService,
              private fb : FormBuilder,
            private router : Router  ){}

  ngOnInit(){
    this.loginForm = this.fb.group({
      email : [null, Validators.required],
      password : [null,Validators.required]
    })
  }

  login(){

  }

  submitForm(){
    console.log(this.loginForm.value);
    this.authservice.login(this.loginForm.value).subscribe((data)=>{
      console.log(data);
      if(data.userId != null){
        const user = {
          id : data.userId,
          role : data.userRole
        }
        console.log(user);
        StorageService.saveToken(data.jwt);
        StorageService.saveUser(user);
        if(StorageService.isAdminLoggedIn()){
          this.router.navigateByUrl("admin/dashboard");
        }else if(StorageService.isCustomerLoggedIn()){
          this.router.navigateByUrl("customer/dashboard");
        }
      }else{
        console.log("Wrong credentials");
      }
    })
  }

}
