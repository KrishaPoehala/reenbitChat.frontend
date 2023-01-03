import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from './../../Services/HttpService';
import { MessageDto } from 'src/Dtos/MessageDto';
import { UserService } from './../../Services/UserService';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NewChatDto } from 'src/Dtos/NewChatDto';

@Component({
  selector: 'app-edit-message-modal',
  templateUrl: './edit-message-modal.component.html',
  styleUrls: ['./edit-message-modal.component.css']
})
export class EditMessageModalComponent implements OnInit {

  constructor(private activeModal:NgbActiveModal) 
  { }

  ngOnInit(): void {
  }

  redirectToSender = true;
  onRedirectionChange(){
    this.redirectToSender = !this.redirectToSender;
  }

  passBack(){
    this.activeModal.close(this.redirectToSender);
  }
}
