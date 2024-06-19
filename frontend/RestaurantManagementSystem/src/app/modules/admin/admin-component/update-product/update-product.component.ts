import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../admin-services/admin.service';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzGridModule } from 'ng-zorro-antd/grid'; 
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [NzSpinModule,ReactiveFormsModule,NzButtonModule,NzFormModule,NgIf],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent {

  isSpinning = false;
  productId : any = this.activatedRoute.snapshot.params['productId'];
  validateForm : FormGroup;
  imgChanged = false;
  selectedFile : any;
  imagePreview : string | ArrayBuffer | null = null;
  existingImage : string | null;


  constructor(private activatedRoute : ActivatedRoute,
    private fb : FormBuilder,
    private router : Router,
    private adminService : AdminService
  ){}

  ngOnInit(){

    this.validateForm = this.fb.group({
      name : [null,Validators.required],
      price : [null,Validators.required],
      description : [null,Validators.required]
    });

    this.getProductById();

  }
  getProductById() {
    this.adminService.getProductsById(this.productId).subscribe((resp) => {
      const productDto = resp;
      this.existingImage = 'data:image/jpeg;base64,' + resp.returnedImg;
      this.validateForm.patchValue(productDto);
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

  updateProduct(){
    const formData : FormData = new FormData();
    if(this.imgChanged && this.selectedFile){
      formData.append('img',this.selectedFile)
    }
    formData.append('name' , this.validateForm.get('name').value);
    formData.append('price' , this.validateForm.get('price').value);
    formData.append('description' , this.validateForm.get('description').value);

    console.log(formData);

    this.adminService.updateProduct(this.productId, formData).subscribe((resp)=>{
      if(resp.id!=null){
        this.router.navigateByUrl("/admin/dashboard");
      }
    })
  }
}
