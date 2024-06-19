import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { StorageService } from './auth-services/storage-services/storage.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NzLayoutModule,NgIf,RouterLink,RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'RestaurantManagementSystem';

  isAdminLoggedIn : boolean = StorageService.isAdminLoggedIn();
  isCustomerLoggedIn : boolean = StorageService.isCustomerLoggedIn();

  constructor(private router : Router){}

  ngOnInit(){
    this.router.events.subscribe(event =>{
      if(event.constructor.name === "NavigationEnd"){
        this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
        this.isCustomerLoggedIn = StorageService.isCustomerLoggedIn();
      }
    })
  }
  logout(){
    console.log("signout");
    StorageService.signout();
    this.router.navigateByUrl("/login");
  }
}
