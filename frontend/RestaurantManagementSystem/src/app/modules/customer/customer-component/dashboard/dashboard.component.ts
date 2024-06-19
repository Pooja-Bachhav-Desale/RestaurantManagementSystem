import { Component } from '@angular/core';
import { AdminService } from '../../../admin/admin-services/admin.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { CustomerService } from '../../customer-service/customer.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,NgFor],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  categories : any = [];
  validateForm : FormGroup;

  constructor(private service : CustomerService,
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
      });
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
