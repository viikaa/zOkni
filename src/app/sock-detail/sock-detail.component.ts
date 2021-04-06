import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { DeleteComponent } from '../delete/delete.component';
import { Sock } from '../model/sock';

@Component({
  selector: 'app-sock-detail',
  templateUrl: './sock-detail.component.html',
  styleUrls: ['./sock-detail.component.css']
})
export class SockDetailComponent implements OnInit {

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal) { }

  sock$: Observable<Sock>;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;

  ngOnInit(): void {
    const id = this.route.snapshot.url[1].path;
    this.sock$ = this.api.getSockById(id);
  }

  getImageUrl(imgName: string): string {
    return `${this.api.baseUrl}/img/${imgName}`
  }

  openDeleteModal(sock: Sock){
    let modal = this.modalService.open(DeleteComponent, { backdrop: 'static', centered: true });
    (modal.componentInstance as DeleteComponent).initParams('sock', this.removeSock.bind(this, sock));
  }

  private removeSock = (sock: Sock) => {
    this.api.removeSock(sock.id).subscribe(() => this.router.navigateByUrl('/'));
  }

}
