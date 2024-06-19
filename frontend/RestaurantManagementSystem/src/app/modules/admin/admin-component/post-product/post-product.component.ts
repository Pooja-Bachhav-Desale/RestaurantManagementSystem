import { Component } from '@angular/core';
import { AdminService } from '../../admin-services/admin.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzGridModule } from 'ng-zorro-antd/grid'; 
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-post-product',
  standalone: true,
  imports: [NzSpinModule,ReactiveFormsModule,NzGridModule,NzFormModule,NzButtonModule,NgIf],
  templateUrl: './post-product.component.html',
  styleUrl: './post-product.component.css'
})
export class PostProductComponent {

  categoryId : any = this.activatedRoute.snapshot.params['categoryId'];
  validateForm : FormGroup;
  selectedFile : File | null;
  imagePreview : string | ArrayBuffer | null;
  isSpinning = false;

  constructor(private fb : FormBuilder,
    private roter : Router,
    private adminService : AdminService,
    private activatedRoute : ActivatedRoute  ){  }

    ngOnInit(){
      this.validateForm = this.fb.group({
        name : [null,Validators.required],
        price : [null,Validators.required],
        description : [null,Validators.required]
      })
    }

  submitForm(){
    console.log("submit");
    this.isSpinning = true;
    const formData : FormData = new FormData();
    formData.append('img',this.selectedFile);
    formData.append('name',this.validateForm.get('name').value);
    formData.append('price',this.validateForm.get('price').value);
    formData.append('description',this.validateForm.get('description').value);
    this.adminService.postProduct(this.categoryId,formData).subscribe((resp)=>{
      this.isSpinning = false;
      console.log(resp);
      if(resp.id != null){
        //alert("product added succesfully");
        this.roter.navigateByUrl("/admin/dashboard");
      }else{
        alert("Something went wrong");
      }
    })
  }

  onFileSelected(event : any){
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }


}
