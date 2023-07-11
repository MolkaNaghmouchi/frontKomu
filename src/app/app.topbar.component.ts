import { Component, OnDestroy } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';
import { TokenStorageService } from './service/token-storage.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items: MenuItem[];

    constructor(public appMain: AppMainComponent , private tokenStorage: TokenStorageService , private router: Router ) { 




    
          
 }

 /////////logout
 logout(): void {
  sessionStorage.removeItem('auth-token');

  
    this.router.navigate(['/pages/login']); 
  }
  

}
