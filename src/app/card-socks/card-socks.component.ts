import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Sock } from '../model/sock';

@Component({
  selector: 'app-card-socks',
  templateUrl: './card-socks.component.html',
  styleUrls: ['./card-socks.component.css']
})
export class CardSocksComponent implements OnInit {

  constructor(private api: ApiService) { }

  socks: Sock[];

  onCardClick(){
    console.log('cardClick');
  }

  ngOnInit(): void {
    this.api.getScoks().subscribe(socks => this.socks = socks);
  }

}
