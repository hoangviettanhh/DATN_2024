import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClientRoutingModule } from './client-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { HomeService } from './home/home.service';
import { FormsModule } from '@angular/forms'; // Đảm bảo FormsModule được import
import { LoginComponent } from './login/login.component'; // Import LoginComponent
import { HomeComponent } from './home/home.component'; // Import LoginComponent

@NgModule({
  imports: [
    CommonModule,
    ClientRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
  ],
  declarations: [],
  providers: [AuthService, HomeService]
})
export class ClientModule { }
