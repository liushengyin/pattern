import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { ChatRoomPage } from '../chat-room/chat-room';

@Component({
  selector: 'page-chat-list',
  templateUrl: 'chat-list.html',
})
export class ChatListPage {
  chatList:any = [];

  constructor(platform: Platform, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidEnter() {
    this.initChatList();
  }
  initChatList() {
    try{
      let data = (<any>window).NativeInterface.getDynamicNewsList();
      this.chatList = JSON.parse(data);
    } catch(e){
      console.log(e);
    }
  }
  toChatRoom(item) {
    this.navCtrl.push(ChatRoomPage,{senderID:item.sender,title:item.title})
  }


}
