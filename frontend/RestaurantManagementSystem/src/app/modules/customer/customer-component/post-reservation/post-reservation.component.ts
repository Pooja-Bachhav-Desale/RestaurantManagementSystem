import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid'; 
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NgFor } from '@angular/common';
import { CustomerService } from '../../customer-service/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-reservation',
  standalone: true,
  imports: [NgFor,ReactiveFormsModule,NzFormModule,NzSelectModule,NzDatePickerModule,NzGridModule,NzButtonModule],
  templateUrl: './post-reservation.component.html',
  styleUrl: './post-reservation.component.css'
})
export class PostReservationComponent {

  validateForm : FormGroup;

  TableType  : string[] = [
    "Standard Table",
    "Communal Table",
    "Booth",
    "Bar Table",
    "Outdoor Table",
    "High Top Table",
    "Round Table",
    "Custom Table",
    "Family-style Table",
    "Window side table"
  ];

  constructor(
    private fb : FormBuilder,
    private service : CustomerService,
    private roter: Router
  ){}

  ngOnInit(){
    this.validateForm = this.fb.group({
      tableType : [null,Validators.required],
      dateTime : [null,Validators.required],
      description : [null,Validators.required]
    })
  }

  postResevation(){
    console.log(this.validateForm.value);
    this.service.postReservation(this.validateForm.value).subscribe((resp)=>{
      console.log(resp);
      if(resp.id != null){
        this.roter.navigateByUrl("/customer/dashboard")
      }
    })
  }

}
