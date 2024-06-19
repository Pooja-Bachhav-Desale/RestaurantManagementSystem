import { Component } from '@angular/core';
import { AdminService } from '../../admin-services/admin.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-products',
  standalone: true,
  imports: [RouterLink,NgFor,ReactiveFormsModule],
  templateUrl: './view-products.component.html',
  styleUrl: './view-products.component.css'
})
export class ViewProductsComponent {

  categoryId : any = this.activatedRoute.snapshot.params['categoryId'];
  Products : any = [];
  categories : any = [];
  validateForm : FormGroup;

constructor( private adminService : AdminService,
  private activatedRoute : ActivatedRoute,
  private fb : FormBuilder,
  private router : Router
 ){}

 ngOnInit(){
  this.validateForm = this.fb.group({
    title : [null,Validators.required]
  })
  this.getProductsByCategory();
 }
  getProductsByCategory() {
    this.adminService.getProductsByCategory(this.categoryId).subscribe((resp)=>{
      console.log(resp);
      resp.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,'+element.returnedImg;
        this.Products.push(element);
      });
    })
  }

  submitForm(){
    this.Products = [];
    this.adminService.getAllProductsByCategoryAndTitle(this.categoryId,this.validateForm.get(['title']).value).subscribe((resp)=>{
      console.log(resp);
      resp.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,'+element.returnedImg;
        this.Products.push(element);
      })
    })
  }

  deleteProduct(productId : number){
    console.log(productId);
    this.adminService.deleteProduct(productId).subscribe((resp)=>{
      console.log(resp);
      if(resp == null){
        this.router.navigateByUrl("/admin/dashboard");
      }
    })
  }

}
