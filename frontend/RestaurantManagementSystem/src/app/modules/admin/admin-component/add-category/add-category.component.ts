import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid'; 
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { AdminService } from '../../admin-services/admin.service';
import { NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { StorageService } from '../../../../auth-services/storage-services/storage.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [ReactiveFormsModule,NzButtonModule,NzGridModule,NzFormModule,NzSpinModule,NgIf],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {

  isSpinning : boolean;
  categoryForm: FormGroup;
  selectedFile : File | null ;
  imagePreview : string | ArrayBuffer | null;

  constructor(private service : AdminService,
    private fb : FormBuilder,
    private message : NzMessageService,
    private router : Router
  ){}

  ngOnInit(){
    this.categoryForm = this.fb.group({
      categoryName : [null,Validators.required],
      description : [null,Validators.required]
    })
  }

  postCategory(){
    console.log(this.categoryForm.value);
    const formdata : FormData = new FormData();
    formdata.append("img",this.selectedFile);
    formdata.append("categoryName",this.categoryForm.get("categoryName").value);
    formdata.append("description",this.categoryForm.get("description").value);
    console.log(formdata);
    this.service.postCategory(formdata).subscribe((resp)=>{
      console.log(resp);
      if(resp.categoryId!=null){
        this.message.success("Category Added Succesfully!!" , { nzDuration : 5000 });
        this.router.navigateByUrl("/admin/dashboard");
      }else if(resp.categoryId == null){
        this.message.error("Something went wrong" , { nzDuration : 5000 })
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
