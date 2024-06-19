import { Component } from '@angular/core';
import { AdminService } from '../../admin-services/admin.service';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button'; 


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor,RouterLink,ReactiveFormsModule,NzButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  categories : any = [];
  validateForm : FormGroup;

  constructor(private service : AdminService,
    private fb : FormBuilder
  ){}

  ngOnInit(){
    this.validateForm = this.fb.group({
      categoryName : [null,Validators.required]
    })
    this.getAllCategories();
    
  }

  submitForm(){
    this.categories = [];
    console.log(this.validateForm.get(['categoryName']).value);
    this.service.getAllCategoriesByTitle(this.validateForm.get(['categoryName']).value).subscribe((resp)=>{
      console.log(resp);
      resp.forEach(element =>{
        element.returnedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.categories.push(element);
      })
    })
  }

  getAllCategories(){
    this.categories = [];
    this.service.getAllCategories().subscribe((resp)=>{
      console.log(resp);
      resp.forEach(element => {
        element.returnedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.categories.push(element);
      });
    })
  }

}
