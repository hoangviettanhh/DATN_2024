import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClientRoutingModule } from './client-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { FormsModule } from '@angular/forms'; // Thêm FormsModule
import { LoginComponent } from './login/login.component'; // Import LoginComponent

@NgModule({
  imports: [
    CommonModule,
    ClientRoutingModule,
    RouterModule,
    HttpClientModule,
    HeaderComponent,  // Đưa HeaderComponent vào declarations
    FooterComponent,
    LoginComponent,
    FormsModule,
  ],
  declarations: [

  ],
  providers: [AuthService]
})
export class ClientModule { }
