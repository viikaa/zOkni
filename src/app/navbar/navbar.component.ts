import { Component,  OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { faPlusCircle, faArrowAltCircleLeft, faTh, faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  constructor(
    private location: Location,
    private router: Router) {}

  faPlusCircle = faPlusCircle;
  faArrowAltCircleLeft = faArrowAltCircleLeft;
  faTh = faTh;
  faBars = faBars;

  showBackButton: boolean;
  activatedRouteIsCard: boolean;

  ngOnInit(): void {
    this.location.onUrlChange(currentUrl => {
      this.showBackButton = currentUrl !== '/socks/card' && currentUrl !== '/socks/list';
      this.activatedRouteIsCard = currentUrl === '/socks/card';
    });
  }

  navigateToCardView(){
    this.router.navigateByUrl('/socks/card');
    this.activatedRouteIsCard = true;
  }

  navigateToListView(){
    this.router.navigateByUrl('/socks/list');
    this.activatedRouteIsCard = false;
  }

  navigateBack() {
    this.location.back();
  }
}
