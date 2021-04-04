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

  getSockById(id: string){
    return this.http.get<Sock>(`${this.baseUrl}/socks/${id}`);
  }

  addSock(sock: Sock){
    return this.http.post<Sock>(`${this.baseUrl}/socks`, sock);
  }

  updateSock(sock: Sock){
    return this.http.put<Sock>(`${this.baseUrl}/socks/${sock.id}`, sock);
  }

  removeSock(id: string){
    return this.http.delete(`${this.baseUrl}/socks/${id}`, {responseType: 'text'}); //json-t várna alapból, de csak státuszkódot küld a szerver
  }

  postImage(img: File, sockId: string){
    const fd = new FormData();
    fd.append('image', img, img.name);
    return this.http.post<Sock>(`${this.baseUrl}/socks/${sockId}/img`, fd);
  }

  removePicture(sockId: string) {
    return this.http.delete<Sock>(`${this.baseUrl}/socks/${sockId}/img`);
  }
}
