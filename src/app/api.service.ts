import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sock } from './model/sock';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public readonly baseUrl: string = "http://localhost:5000/api";

  constructor(private http: HttpClient) { }

  getScoks(){
    return this.http.get<Sock[]>(`${this.baseUrl}/socks`);
  }

  getSockById(id: number){
    return this.http.get<Sock>(`${this.baseUrl}/socks/${id}`);
  }

  postImage(img: File, sockId: number){
    const fd = new FormData();
    fd.append('image', img, img.name);
    this.http.post(`${this.baseUrl}/socks/${sockId}/img`, fd, {responseType: 'text'})
      .subscribe(res => console.log(res));
  }
}
