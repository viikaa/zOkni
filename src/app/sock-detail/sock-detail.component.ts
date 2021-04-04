import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { Sock } from '../model/sock';

@Component({
  selector: 'app-sock-detail',
  templateUrl: './sock-detail.component.html',
  styleUrls: ['./sock-detail.component.css']
})
export class SockDetailComponent implements OnInit {

  constructor(
    private api: ApiService,
    private route: ActivatedRoute) { }

  sock$: Observable<Sock>;
  faEdit = faEdit;

  ngOnInit(): void {
    const id = this.route.snapshot.url[1].path;
    this.sock$ = this.api.getSockById(id);
  }

  getImageUrl(imgName: string): string {
    return `http://localhost:5000/api/img/${imgName}`
  }

}
