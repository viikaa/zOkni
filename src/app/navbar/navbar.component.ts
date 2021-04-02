import { Component,  OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NavService } from '../nav.service';
import { faPlusCircle, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  constructor(
    private location: Location,
    private nav: NavService) {}

  faPlusCircle = faPlusCircle;
  faArrowAltCircleLeft = faArrowAltCircleLeft;
  showBackButton: boolean;

  ngOnInit(): void {
    this.nav.getCurrentUrl().subscribe(currentUrl => {
      this.showBackButton = currentUrl !== '/socks/card'
    });
  }

  navigateBack() {
    this.location.back();
  }
}
