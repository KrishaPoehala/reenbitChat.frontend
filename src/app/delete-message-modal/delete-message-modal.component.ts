import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-message-modal',
  templateUrl: './delete-message-modal.component.html',
  styleUrls: ['./delete-message-modal.component.css']
})
export class DeleteMessageModalComponent implements OnInit {

  constructor(public activeModal:NgbActiveModal) { }
  deleteOnlyForCurrentUser = false;
  onChange(){
    this.deleteOnlyForCurrentUser = !this.deleteOnlyForCurrentUser;
  }
  ngOnInit(): void {
  }

  passBack(){
    this.activeModal.close(this.deleteOnlyForCurrentUser);
  }

}
