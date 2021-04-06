import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  @Input()
  thingToDelete: string;

  @Output()
  deleteClick = new EventEmitter<void>();

  ngOnInit(): void {
  }

  initParams(what: string, del: () => any){
    this.thingToDelete = what;
    this.deleteClick.subscribe(() => {
      del();
      this.activeModal.close();
    });
  }

}
