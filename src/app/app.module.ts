import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardSocksComponent } from './card-socks/card-socks.component';
import { SockDetailComponent } from './sock-detail/sock-detail.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DeleteComponent } from './delete/delete.component';
import { ListSocksComponent } from './list-socks/list-socks.component';

@NgModule({
  declarations: [
    AppComponent,
    CardSocksComponent,
    SockDetailComponent,
    NavbarComponent,
    DeleteComponent,
    ListSocksComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
