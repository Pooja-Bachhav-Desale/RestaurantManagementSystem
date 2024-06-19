import { Component } from '@angular/core';
import { CustomerService } from '../../customer-service/customer.service';
import { CommonModule, NgFor } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-get-all-reservation',
  standalone: true,
  imports: [CommonModule,NzTableModule,NgFor,NzSpinModule],
  templateUrl: './get-all-reservation.component.html',
  styleUrl: './get-all-reservation.component.css'
})
export class GetAllReservationComponent {

  reservations:any = [];

  constructor(private service : CustomerService){}

  ngOnInit(){
    this.getReservationByUser();
  }

  getReservationByUser(){
    this.service.getReservationByUser().subscribe((res)=>{
      console.log(res);
      this.reservations=res;
    })
  }

}
