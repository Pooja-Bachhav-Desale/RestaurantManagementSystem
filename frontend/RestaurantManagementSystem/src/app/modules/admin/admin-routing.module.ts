import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin-component/dashboard/dashboard.component';
import { AddCategoryComponent } from './admin-component/add-category/add-category.component';
import { PostProductComponent } from './admin-component/post-product/post-product.component';
import { ViewProductsComponent } from './admin-component/view-products/view-products.component';
import { UpdateProductComponent } from './admin-component/update-product/update-product.component';
import { GetReservationsComponent } from './admin-component/get-reservations/get-reservations.component';

const routes: Routes = [
  {path:"dashboard",component:DashboardComponent},
  {path:"category",component:AddCategoryComponent},
  {path:":categoryId/product",component:PostProductComponent},
  {path:":categoryId/products",component:ViewProductsComponent},
  {path:"product/:productId",component:UpdateProductComponent},
  {path:"reservations",component:GetReservationsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
