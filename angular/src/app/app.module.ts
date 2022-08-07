import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HistoryComponent } from './history/history.component';
import {  NbMenuModule, NbThemeModule, NbRadioModule, NbToggleModule, NbCardModule,  NbSidebarModule, NbLayoutModule, NbButtonModule} from '@nebular/theme';
import { RouterModule } from '@angular/router'; // we also need angular router for Nebular to function properly



import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; //<-- copy this.




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    HistoryComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbRadioModule,
    NbToggleModule,
    NbCardModule,
    BrowserAnimationsModule, //<--copy this.,
    RouterModule, // RouterModule.forRoot(routes, { useHash: true }), if this is your app.module
    NbLayoutModule,
    NbSidebarModule, // NbSidebarModule.forRoot(), //if this is your app.module
    NbButtonModule,
    NbMenuModule

  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }