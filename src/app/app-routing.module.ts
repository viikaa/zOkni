import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardSocksComponent } from './card-socks/card-socks.component';
import { ListSocksComponent } from './list-socks/list-socks.component';
import { SockDetailComponent } from './sock-detail/sock-detail.component';
import { SockEditComponent } from './sock-edit/sock-edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'socks/card', pathMatch: 'full' },
  { path: 'socks/card', component: CardSocksComponent },
  { path: 'socks/list', component: ListSocksComponent },
  { path: 'socks/new', component: SockEditComponent },
  { path: 'socks/:sockId', component: SockDetailComponent },
  { path: 'socks/:sockId/edit', component: SockEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
