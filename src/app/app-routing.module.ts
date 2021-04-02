import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardSocksComponent } from './card-socks/card-socks.component';
import { SockDetailComponent } from './sock-detail/sock-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'socks/card', pathMatch: 'full'},
  { path: 'socks/card', component: CardSocksComponent},
  { path: 'socks/:sockId', component: SockDetailComponent},
  { path: 'socks/new', component: SockDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
