import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CustomerService } from '../../customer-service/customer.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-view-products-by-category',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,NgFor],
  templateUrl: './view-products-by-category.component.html',
  styleUrl: './view-products-by-category.component.css'
})
export class ViewProductsByCategoryComponent {

  categoryId : number=this.activatedroute.snapshot.params["categoryId"];
  validateForm : FormGroup;
  Products = [];

  constructor(private activatedroute : ActivatedRoute,
    private service : CustomerService,
    private fb : FormBuilder
  ){}

  ngOnInit(){
    this.validateForm = this.fb.group({
      title : [null,Validators.required]
    })
    this.getProductsByCategory();
  }

  submitForm(){
    this.Products = [];
    this.service.getAllProductsByCategoryAndTitle(this.categoryId,this.validateForm.get(['title']).value).subscribe((resp)=>{
      console.log(resp);
      resp.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,'+element.returnedImg;
        this.Products.push(element);
      })
    })
  }

  getProductsByCategory(){
    this.service.getProductsByCategory(this.categoryId).subscribe((resp)=>{
      console.log(resp);
      resp.forEach(element=>{
        element.processedImg = 'data:image/jpeg;base64,'+element.returnedImg;
        this.Products.push(element);
      })
    })
  }

}
