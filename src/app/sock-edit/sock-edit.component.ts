import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgbAlert, NgbModal, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { faSave, faImage, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Sock } from '../model/sock';
import { ApiService } from '../api.service';
import { DeleteComponent } from '../delete/delete.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sock-edit',
  templateUrl: './sock-edit.component.html',
  styleUrls: ['./sock-edit.component.css']
})
export class SockEditComponent implements OnInit, OnDestroy {
  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal) { }

  private routerSubscription: Subscription;
  sock: Sock;
  title: string;
  showAlert = false;
  faSave = faSave;
  faImage = faImage;
  faTrashAlt = faTrashAlt;
  notAllowedPopoverText = 'You can upload a picture, after you saved this sock :)';


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
      if(sock === null){
        this.sock = this.getEmptySock();
        this.title = 'Add new sock';
      }
      else{
        this.sock = sock;
        this.title = `Edit ${sock.color} ${sock.pattern} sock`;
      }
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

  // removeSock = () => {
  //   this.api.removeSock(this.sock.id).subscribe(_ => {
  //     this.router.navigateByUrl('/');
  //   });
  // }

  removePicture = () => {
    this.api.removePicture(this.sock.id).subscribe(sock => this.sock = sock);
  }

  getImageUrl(){
    return `${this.api.baseUrl}/img/${this.sock.imgSrc}`;
  }

  showNotAllowedPopover(){
    if(this.sock.id === null){
      this.notAllowedPopover.open();
      setTimeout(() => {
        this.notAllowedPopover.close();
      }, 2000);
    }
  }

  submitForm(){
    if(this.sock.id === null) this.addSock();
    else this.updateSock();
  }

  openDeleteModal(what: string, del : () => any){
    let modal = this.modalService.open(DeleteComponent, { backdrop: 'static', centered: true });
    (modal.componentInstance as DeleteComponent).initParams(what, del);
  }

  uploadImage(event){
    const image = event.target.files[0];
    this.api.postImage(image, this.sock.id).subscribe(sock => {
      this.sock = sock;
      event.target.value = null;
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
}
