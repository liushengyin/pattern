import { Component ,ViewChild} from '@angular/core';
import { App, Platform, Nav} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { ChatRoomPage } from '../pages/chat/chat-room/chat-room';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = TabsPage;

  constructor(public app: App, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      // if(platform.is("android") ){
      //   this.checkIsLogin();
      // }
    (<any>window).toChatRoom = this.toChatRoom.bind(this);
    this.messaage();
    });
  }
  toChatRoom(senderID,title) {
    let activeNav = this.app.getActiveNav();
    let activePage = activeNav.getActive().instance;
    if (ChatRoomPage != activePage.constructor) {
        this.nav.push(ChatRoomPage,{senderID:senderID,title:title})
    }
  }
  checkIsLogin() {
      console.log("checkIsLogin...");
      (<any>window).JMessage.getMyInfo(function (response) {
          console.log("user is login" + response);
          var myInfo;
          myInfo = JSON.parse(response);
          (<any>window).JMessage.username = myInfo.userName;
          (<any>window).JMessage.nickname = myInfo.nickname;
          (<any>window).JMessage.gender = myInfo.mGender;
      }, function (response) {
          console.log("User is not login.");
          (<any>window).JMessage.username = "";
          (<any>window).JMessage.nickname = "";
          (<any>window).JMessage.gender = "unknown";
      }.bind(this));
  }

  messaage() {
    // let uid = Date.parse(Date());
    let uid = "user@100001"+"_ANDROID";
    // 连接服务端
    // let socket = io('http://'+document.domain+':2120');
    (<any>window).socket = (<any>window).io('https://message.1pei.com.cn:2120');
    // 连接后登录
    (<any>window).socket.on('connect', function(){
      console.log(uid);
      (<any>window).socket.emit('login', uid);
    });
    // 后端推送来消息时
    (<any>window).socket.on('new_msg', function(msg){
        console.log(msg);
    });
        // 后端推送来在线数据时
    (<any>window).socket.on('update_online_count', function(online_stat){
      console.log(online_stat);
    });
  }
}
