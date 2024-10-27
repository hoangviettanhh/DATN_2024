import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AdminModule } from './admin/admin.module'; 
import { ClientModule } from './client/client.module'; 
import { HttpClientModule } from '@angular/common/http'; 
import { AuthService } from './auth/auth.service'; // Từ AppModule
import { FormsModule } from '@angular/forms'; // Thêm dòng này
import { CommonModule } from '@angular/common'; // Thêm dòng này

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
    HttpClientModule, 
  ],
  
  providers: [AuthService],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
