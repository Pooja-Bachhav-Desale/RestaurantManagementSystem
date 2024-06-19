import { Component } from '@angular/core';
import { AdminService } from '../../admin-services/admin.service';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-get-reservations',
  standalone: true,
  imports: [NzSpinModule,NzTableModule,CommonModule],
  templateUrl: './get-reservations.component.html',
  styleUrl: './get-reservations.component.css'
})
export class GetReservationsComponent {

  reservations : any;

  constructor(private service : AdminService){}

  ngOnInit(){
    this.getReservations();
  }

  getReservations(){
    this.service.getReservations().subscribe((resp)=>{
      console.log(resp);
      this.reservations=resp;
    })
  }

  changeReservationStatus(reservationId:number,status:string){
    console.log(reservationId);
    console.log(status);
    this.service.changeReservationStatus(reservationId,status).subscribe((resp)=>{
      console.log(resp);
      if(resp.id != null){
        this.getReservations();
      }
    })
  }

}
