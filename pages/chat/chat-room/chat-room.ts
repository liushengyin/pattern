import { Component , ViewChild, ElementRef} from '@angular/core';
import { NavController, NavParams ,Content} from 'ionic-angular';

@Component({
  selector: 'page-chat-room',
  templateUrl: 'chat-room.html',
})
export class ChatRoomPage {
  @ViewChild(Content) content: Content;
  @ViewChild('toView') toView: ElementRef;

  senderID = 0;
  title = "";
  selfAvatar = "assets/icon/favicon.ico";
  senderAvatar = "assets/icon/favicon.ico";

  message:string = "";
  messages:Array<any> = [];
  emoji:Array<any> = ['😁','😂','😃','😄','😅','😆','😉','😊','😋','😌','😍','😏','😒','😓','😔','😖','😘','😚','😜','😝','😞','😠','😡','😢','😣','😤','😥','😨','😩','😪','😫','😭','😰','😱','😲','😳','😵','😷'];
  openEmojs = false;
  pic = '';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      (<any>window).receiveMessage = this.receiveMessage.bind(this);
      // this.senderID = this.navParams.get("senderID");
      // this.title = this.navParams.get("title");
      this.senderID = 888358;
      this.title = "test";
      
      this.initAvatar();
  }
  ionViewDidLoad() {
    try{
      this.initChatRoom();
    } catch(e) {
      console.log(e);
      this.initTestChatRoom();
    }
  }

  ionViewDidEnter() {
    this.scrollIntoView();
  }
  initAvatar() {
    this.selfAvatar = this.selfAvatar;
    setTimeout(()=>{this.senderAvatar = this.senderAvatar},200);
  }
  initTestChatRoom(){
    this.messages = [
    new chatItem("value","self",'',this.selfAvatar),
    new chatItem("value","self",'',this.selfAvatar),
    new chatItem("value","self",'',this.selfAvatar),
    new chatItem("value","self",'',this.selfAvatar),
    new chatItem("value","self",'',this.selfAvatar),
    new chatItem("value","self",'',this.selfAvatar),
    new chatItem("value","self",'',this.selfAvatar),
    new chatItem("value","self",'',this.selfAvatar),
    ];
    console.log(this.message);
  }
  initChatRoom(){
    let value = (<any>window).NativeInterface.getChatMsgs(this.senderID);
    let chatMsgs = JSON.parse(value);
    for(let item of chatMsgs){
      this.messages.push(new chatItem(item.text,item.sender != this.senderID,'',item.sender == this.senderID ? this.selfAvatar:this.senderAvatar));
    }
  }

  sendMessage(value) {
      this.messages.push( new chatItem(value,"self",'',this.selfAvatar) )
      this.scrollIntoView();
      try {
        (<any>window).NativeInterface.sendMessage(this.senderID,value);
      } catch (e) {
        console.log(e);
      }
  }
  scrollIntoView(time=200) {
    setTimeout(()=>{this.toView.nativeElement.scrollIntoView(false);},time);
  }

  clickEmojs(){
    this.openEmojs = !this.openEmojs;
    if(this.openEmojs){
      this.scrollIntoView();
    }
  }

  receiveMessage(value) {
    this.messages.push(new chatItem(value,"",'',this.senderAvatar));
  }

  sendSingleTextMessage(){

    (<any>window).JMessage.sendSingleTextMessage('username', 'content', null,
      function(response) {
        var message = JSON.parse(response)
      }, function(errorMsg) {
        console.log(errorMsg)  // 输出错误信息。
      })

  }
 // 从本地选区
  localImg(){
    let inputImg = document.getElementById("inputImg");
    inputImg.click();
  }
  // input 图片 监听事件
  AddlocalImg(ev){
    if(!ev.target.files[0]) return;
    let file = ev.target.files[0];
    var reader = new FileReader();
    let pic = this.pic;
    let messages = this.messages;
    // 图片预览
    reader.onload = function(event) {
        messages.push({data:'',type:"self",imgSrc:this.result,avatar:this.selfAvatar});
    }.bind(this);
    reader.readAsDataURL(file);
  }

}

export class chatItem {
  constructor(public data="",public type:any="self",public imgSrc="",public avatar="assets/icon/favicon.ico") {
  }
}