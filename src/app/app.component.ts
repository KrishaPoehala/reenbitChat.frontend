import { NetworkService } from './network.service';
import { environment } from './../environments/environment';
import { UserService } from 'src/Services/UserService';
import { MessageDto } from './../Dtos/MessageDto';
import { HttpService } from 'src/Services/HttpService';
import { UserDto } from './../Dtos/UserDto';
import { ChatDto } from './../Dtos/ChatDto';
import { ChangeDetectorRef, Component, HostListener, NgZone, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { concat, concatMap, VirtualTimeScheduler, } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  network:NetworkService
  constructor(private chatService: HttpService, public userService : UserService,
    ){
      this.network = new NetworkService(userService);
  }

  ngOnInit(): void {
    this.chatService.getRandomUser().pipe(
      concatMap((result : UserDto) =>{
        this.userService.currentUser = result;
        return this.chatService.getUserChats(result.id);
      }))
      .subscribe(result => {
        this.chats = result;
        this.userService.chats = this.chats;
        this.userService.selectedChat = this.chats[0];
        this.network.configureHub();
      });
  }

  

  title="dfdff"
  public chats: ChatDto[] = [];
}
