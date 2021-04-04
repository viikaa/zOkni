import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { Sock } from '../model/sock';
import { faInfoCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list-socks',
  templateUrl: './list-socks.component.html',
  styleUrls: ['./list-socks.component.css']
})
export class ListSocksComponent implements OnInit {

  constructor(private api: ApiService) { }

  socks$: Observable<Sock[]>;
  faInfoCircle = faInfoCircle;
  faTrashAlt = faTrashAlt;

  ngOnInit(): void {
    this.socks$ = this.api.getScoks();
  }
}
