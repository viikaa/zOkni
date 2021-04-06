import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { Sock } from '../model/sock';
import { faInfoCircle, faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteComponent } from '../delete/delete.component';

@Component({
  selector: 'app-list-socks',
  templateUrl: './list-socks.component.html',
  styleUrls: ['./list-socks.component.css']
})
export class ListSocksComponent implements OnInit {

  constructor(
    private api: ApiService,
    private modalService: NgbModal) { }

  socks$: Observable<Sock[]>;
  faInfoCircle = faInfoCircle;
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;

  ngOnInit(): void {
    this.socks$ = this.api.getScoks();
  }

  openDeleteModal(sock: Sock){
    let modal = this.modalService.open(DeleteComponent, { backdrop: 'static', centered: true });
    (modal.componentInstance as DeleteComponent).initParams('sock', this.removeSock.bind(this, sock));
  }

  private removeSock = (sock: Sock) => {
    this.api.removeSock(sock.id).subscribe(() => this.socks$ = this.api.getScoks());
  }
}
