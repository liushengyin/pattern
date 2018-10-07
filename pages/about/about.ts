import { Component } from '@angular/core';
import { NavController , NavParams} from 'ionic-angular';
import { Data } from '../../providers/data';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  orderID="";
  message: {username?: string, content?: string} = {};
  submitted: boolean = false;
  user = "user@100001" + "_ANDROID";
  printerList = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public data:Data) {
    this.orderID = this.navParams.get("type");
    this.orderID = "1234";
    setTimeout(()=>{
    // 后端推送来消息时
    (<any>window).socket.on('new_msg',this.handleMsg.bind(this))}
    ,500);
  }
  sendMessage(form) {
    this.submitted = true;
    if(form.valid) {
        let url = "https://message.1pei.com.cn:2121/";
        let msg = {data:this.message.content,type:"print",from:this.user};
        let data = {
            type:"publish",
            to:this.message.username + "_PC",
            content:JSON.stringify(msg)
        };
        console.log(JSON.stringify(msg))
        this.data.post(url,data)
            .subscribe(
                data =>{this.handleData(data);},
                error =>{this.handleError(error);}
            );
    }
  }
  handleData(data) {
      console.log(data);
  }
  handleError(error) {
      console.log(error);
  }

  getPrinterList(){
    let group = this.user.substring(this.user.indexOf("@")+1,this.user.indexOf("_ANDROID"));
    console.log(group);
        let url = "https://message.1pei.com.cn:2121/";
        let msg = {data:"",type:"getPrinterList",from:this.user};
        let data = {
            type:"publish",
            to:group + "_PC",
            content:JSON.stringify(msg)
        };
        console.log(JSON.stringify(msg))
        this.data.post(url,data)
            .subscribe(
                data =>{this.handleData(data);},
                error =>{this.handleError(error);}
            );
  }
  handleMsg(msg){
    console.log(msg);
    try{
      msg = JSON.parse(this.data.htmlspecialchars_decode(msg));
      switch (msg.type) {
        case "respondPrinterList":
          this.handlePrinterList(msg);
          break;
        case "respondPrintStatus":
          this.respondPrintStatus(msg);
          break;
      }
    } catch (e){
    }
  }
  handlePrinterList(msg) {
    try{
      // msg = JSON.parse(this.data.htmlspecialchars_decode(msg));
      if(msg.type === "respondPrinterList") {
          this.printerList.push({"from":msg.from,realname:msg.realname,printers:msg.data})
      }
    } catch (e){
    }
  }
  respondPrintStatus(msg){
    console.log(msg);
  }
  startPrint(from,printer) {
    let url = "https://message.1pei.com.cn:2121/";
    let msg = {data:{printerID:printer.printerID,orderID:this.orderID},type:"printOrder",from:this.user};
    let data = {
        type:"publish",
        to:from,
        content:JSON.stringify(msg)
    };
    console.log(msg)
    console.log(JSON.stringify(msg))
    this.data.post(url,data)
        .subscribe(
            data =>{this.handleData(data);},
            error =>{this.handleError(error);}
        );
  }

  handleAccount(account){

  }

}
