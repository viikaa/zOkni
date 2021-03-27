import { Component, OnInit } from '@angular/core';
import { Sock } from '../model/sock';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sock-detail',
  templateUrl: './sock-detail.component.html',
  styleUrls: ['./sock-detail.component.css']
})
export class SockDetailComponent implements OnInit {
  constructor(
    private api: ApiService,
    private route: ActivatedRoute) { }

  sock: Sock;

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('sockId')
    this.api.getSockById(id).subscribe(sock => this.sock = sock);
  }

  getImageUrl(){
    return `${this.api.baseUrl}/img/${this.sock.imgSrc}`;
  }

  uploadImage(event){
    const image = event.target.files[0];
    this.api.postImage(image, this.sock.id);
  }

  submitForm(){
    console.log('submit');
  }

}
