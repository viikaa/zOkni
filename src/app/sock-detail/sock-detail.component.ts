import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Sock } from '../model/sock';
import { ApiService } from '../api.service';
import { NavService } from '../nav.service';
import { DeleteComponent } from '../delete/delete.component';

@Component({
  selector: 'app-sock-detail',
  templateUrl: './sock-detail.component.html',
  styleUrls: ['./sock-detail.component.css']
})
export class SockDetailComponent implements OnInit {
  constructor(
    private api: ApiService,
    private nav: NavService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private modalService: NgbModal) { }

  sock: Sock;
  showAlert = false;

  @ViewChild('updateAlert', {static: false}) updateAlert: NgbAlert;

  ngOnInit(): void {
    this.nav.setCurrentUrlByRoute(this.route);
    this.fetchSock();
  }

  fetchSock(){
    const id = this.route.snapshot.paramMap.get('sockId');
    this.api.getSockById(id).subscribe(sock => {
      if(sock === null)
        this.sock = this.getEmptySock();
      else
        this.sock = sock;
    });
  }

  getEmptySock(){
    return {
      id: null,
      owner: null,
      color: null,
      pattern: null,
      hasPair: null,
      imgSrc: null
    };
  }

  getImageUrl(){
    return `${this.api.baseUrl}/img/${this.sock.imgSrc}`;
  }

  uploadImage(event){
    const image = event.target.files[0];
    this.api.postImage(image, this.sock.id).subscribe(sock => {
      this.sock = sock;
      // this.sock.imgSrc = null;
    });
  }

  openDeleteModal(){
    let modal = this.modalService.open(DeleteComponent, { backdrop: 'static', centered: true });
    (modal.componentInstance as DeleteComponent).initParams('sock', this.deleteSock);
  }

  //arrow function kell legyen a this miatt (pontosan miért?)
  deleteSock = () => {
    this.api.removeSock(this.sock.id).subscribe(_ => {
      this.location.back();
    });
  }

  submitForm(){
    if(this.sock.id === null) this.addSock()
    else this.updateSock();
  }

  addSock(){
    this.api.addSock(this.sock).subscribe(newSock => {
      this.router.navigateByUrl(`/socks/${newSock.id}`);
      this.sock = newSock;
    });
  }

  updateSock(){
    this.api.updateSock(this.sock).subscribe(sock => {
      this.sock = sock;
      this.showAlert = true;
      setTimeout(() => {
        this.updateAlert.close();
      }, 2000);
    });
  }

  removePicture(){
    console.log('removePicture');

  }

}
