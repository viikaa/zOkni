import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { Sock } from '../model/sock';

@Component({
  selector: 'app-card-socks',
  templateUrl: './card-socks.component.html',
  styleUrls: ['./card-socks.component.css']
})
export class CardSocksComponent implements OnInit {

  constructor(private api: ApiService) { }

  socks$: Observable<Sock[]>;

  ngOnInit(): void {
    this.socks$ = this.api.getScoks();
  }

  getImageUrl(sock: Sock){
    return `${this.api.baseUrl}/img/${sock.imgSrc}`;
  }
}
