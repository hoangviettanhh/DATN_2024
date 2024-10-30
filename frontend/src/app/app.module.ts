import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { ClientModule } from './client/client.module';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth/auth.service';
import { HomeService } from './client/home/home.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    ClientModule,
    FormsModule,
    provideHttpClient(withFetch()), // Cấu hình HTTP client
  ],
  providers: [AuthService, HomeService],
  bootstrap: [AppComponent],
})
export class AppModule { }
