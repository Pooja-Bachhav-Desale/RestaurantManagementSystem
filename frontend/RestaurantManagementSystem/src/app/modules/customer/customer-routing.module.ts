import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './customer-component/dashboard/dashboard.component';
import { ViewProductsByCategoryComponent } from './customer-component/view-products-by-category/view-products-by-category.component';
import { PostReservationComponent } from './customer-component/post-reservation/post-reservation.component';
import { GetAllReservationComponent } from './customer-component/get-all-reservation/get-all-reservation.component';

const routes: Routes = [
  {path:"dashboard",component:DashboardComponent},
  {path:":categoryId/products",component:ViewProductsByCategoryComponent},
  {path:"reservation",component:PostReservationComponent},
  {path:"reservations",component:GetAllReservationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
