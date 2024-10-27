import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClientRoutingModule } from './client-routing.module';
import { HeaderComponent } from './header/header.component'; 
import { FooterComponent } from './footer/footer.component'; 
import { HttpClientModule } from '@angular/common/http'; 
import { AuthService } from '../auth/auth.service'; // Từ AppModule

@NgModule({
  imports: [
    CommonModule,
    ClientRoutingModule,
    RouterModule,
    HttpClientModule,
    HeaderComponent,  // Đưa HeaderComponent vào declarations
    FooterComponent, 
  ],
  declarations: [

  ],
  providers: [AuthService] // Thêm AuthService vào providers
})
export class ClientModule { }
