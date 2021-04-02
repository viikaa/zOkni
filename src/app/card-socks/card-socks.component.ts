import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { Sock } from '../model/sock';
import { NavService } from '../nav.service';

@Component({
  selector: 'app-card-socks',
  templateUrl: './card-socks.component.html',
  styleUrls: ['./card-socks.component.css']
})
export class CardSocksComponent implements OnInit {

  constructor(
    private api: ApiService,
    private nav: NavService,
    private route: ActivatedRoute) { }

  socks$: Observable<Sock[]>;

  ngOnInit(): void {
    this.nav.setCurrentUrlByRoute(this.route)
    this.socks$ = this.api.getScoks();
  }

}
