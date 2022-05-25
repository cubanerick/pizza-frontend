import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { LogoutButtonComponent } from './logout-button/logout-button.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthService } from './auth.service';
import { HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from './message.service';
import { ShopComponent } from './pages/shop/shop.component';
import { ModalComponent } from './modal/modal.component';
import { OrdersComponent } from './pages/orders/orders.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutButtonComponent,
    ShopComponent,
    ModalComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [HttpErrorHandler, MessageService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
