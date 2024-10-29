import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AdminModule } from './admin/admin.module'; 
import { ClientModule } from './client/client.module'; 
import { provideHttpClient, withFetch } from '@angular/common/http'; //thêm withFetch
import { FormsModule } from '@angular/forms'; //FormsModule được import
import { CommonModule } from '@angular/common'; // CommonModule được import
import { AuthService } from './auth/auth.service';
import { HomeService } from './client/home/home.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    AdminModule, 
    ClientModule, 
    CommonModule,
    FormsModule, 
    provideHttpClient(withFetch()), // sử dụng withFetch cho SSR
  ],
  providers: [AuthService, HomeService],
  bootstrap: [AppComponent],
})
export class AppModule { }
