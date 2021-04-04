import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgbAlert, NgbModal, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { faSave, faImage, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Sock } from '../model/sock';
import { ApiService } from '../api.service';
import { DeleteComponent } from '../delete/delete.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sock-detail',
  templateUrl: './sock-detail.component.html',
  styleUrls: ['./sock-detail.component.css']
})
export class SockDetailComponent implements OnInit, OnDestroy {
  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private modalService: NgbModal) { }

  sock: Sock;
  showAlert = false;
  faSave = faSave;
  faImage = faImage;
  faTrashAlt = faTrashAlt;
  notAllowedPopoverText = 'You can upload a picture, after you saved this sock :)';
  private routerSubscription: Subscription;

  @ViewChild('updateAlert', {static: false}) updateAlert: NgbAlert;
  @ViewChild('notAllowedPopover', {static: false}) notAllowedPopover: NgbPopover;


  ngOnInit(): void {
    this.routerSubscription = this.router.events.subscribe(event => {
      if(!(event instanceof NavigationEnd)) return;
      if(this.route.snapshot.url[1].path !== this.sock.id)
      this.fetchSock();
    });

    this.fetchSock();
  }

  ngOnDestroy(){
    this.routerSubscription.unsubscribe();
  }

  private fetchSock(){
    const id = this.route.snapshot.paramMap.get('sockId');
    this.api.getSockById(id).subscribe(sock => {
      if(sock === null)
        this.sock = this.getEmptySock();
      else
        this.sock = sock;
    });
  }

  private getEmptySock(){
    return {
      id: null,
      owner: null,
      color: null,
      pattern: null,
      hasPair: null,
      imgSrc: null
    };
  }

  private deleteSock = () => {
    this.api.removeSock(this.sock.id).subscribe(_ => {
      this.location.back();
    });
  }

  getImageUrl(){
    return `${this.api.baseUrl}/img/${this.sock.imgSrc}`;
  }

  showNotAllowedPopover(){
    if(this.sock.id === null){
      this.notAllowedPopover.open();
      setTimeout(() => {
        this.notAllowedPopover.close();
      }, 1500);
    }
  }

  submitForm(){
    if(this.sock.id === null) this.addSock();
    else this.updateSock();
  }

  openDeleteModal(){
    let modal = this.modalService.open(DeleteComponent, { backdrop: 'static', centered: true });
    (modal.componentInstance as DeleteComponent).initParams('sock', this.deleteSock);
  }

  uploadImage(event){
    const image = event.target.files[0];
    this.api.postImage(image, this.sock.id).subscribe(sock => {
      this.sock = sock;
    });
  }

  addSock(){
    this.api.addSock(this.sock).subscribe(async newSock => {
      this.sock = newSock;
      await this.router.navigateByUrl(`/socks/${newSock.id}`);
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
