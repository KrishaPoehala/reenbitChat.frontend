import { FormsModule } from '@angular/forms';
import { LoginComponent } from './authentication/login/login.component';
import { LoginGuard } from './login.guard';
import { ChatListComponent } from './chats/chat-list/chat-list.component';
import { ChatsModule } from './chats/chats.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from 'src/Services/HttpService';
import { UserService } from 'src/Services/UserService';
import { Routes, RouterModule } from '@angular/router';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';

const appRoutes :Routes = [
  {path:'', component : ChatListComponent},
  {path:'login', component: LoginComponent}
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    //RouterModule.forRoot(appRoutes),
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ChatsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [HttpService,UserService,LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
