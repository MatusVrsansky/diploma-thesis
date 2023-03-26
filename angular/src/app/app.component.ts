import { Component } from '@angular/core';

import { TokenStorageService } from './_services/token-storage.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  openResponsiveMenu = false;


  constructor(private tokenStorageService: TokenStorageService) { }
  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.username = user.username;
    }

  }
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();

    this.closeResponsiveMenu();
    
  }

  reloadPage() {
    this.closeResponsiveMenu();
   }

   /*replacePage(page:any) {
    window.location.replace(page);
   }*/

  setOpenedResponsiveMenu() {
    this.openResponsiveMenu = true;
  }

  closeResponsiveMenu() {

   // if(event.srcElement.className != 'links' && this.openResponsiveMenu == true) {
     // console.log('zatvor');

      if(this.openResponsiveMenu) {
        let element:HTMLElement = document.getElementById('auto_trigger') as HTMLElement;

        element.click();
        this.openResponsiveMenu = false;
      }

  //  }
  }
}
