import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChatListPage } from '../chat/chat-list/chat-list';
import { ChatRoomPage } from '../chat/chat-room/chat-room';
import { LoginPage } from '../login/login';
import { SingletonTest, FactoryTest, AbstractFactoryTest, BuilderTest, TemplateMethodTest, AdapterTest,FacadeTest, DecoratorTest, MyTestableClass, 
ObserverTest, StrategyTest, RemoteControlTest,MenuTestDrive,MenuTest, StateTest} from './index';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  unreadNumDynamicNews = 0;
  constructor(public navCtrl: NavController) {

   this.startup();

  (<any>window).updateUnreadNum = this.getUnreadNumDynamicNews.bind(this);
  }

  ionViewDidEnter() {
    this.getUnreadNumDynamicNews();
  }
  
  getUnreadNumDynamicNews(){
    try{
      console.log("getUnreadNumDynamicNews");
      this.unreadNumDynamicNews = (<any>window).NativeInterface.getUnreadNumDynamicNews();
    } catch(e){
      console.log(e);
    }
  }
  
  toChatListPage() {
      this.navCtrl.push(ChatListPage);
  }

  toChatRoomPage() {
      this.navCtrl.push(ChatRoomPage);
  }

  login() {
    this.navCtrl.push(LoginPage);
    // var username = "user_0";
    // var password = "password_0";
    // console.log("tap to login");
    //  (<any>window).JMessage.login(username, password,
    //     function (response) {
    //          (<any>window).JMessage.username = username;
    //         alert("login ok");
    //     }, null);
  }
  logout() {
    (<any>window).NativeInterface.logout();
  }
  // 设计模式
  startup() {
    console.log("单例模式");
    SingletonTest.test();
    console.log("工厂方法模式(Factory Method)");
    FactoryTest.test();
    console.log("抽象工厂模式(Abstract Factory)");
    AbstractFactoryTest.test();
    console.log("建造者模式(Builder)");
    BuilderTest.test();
    console.log("模板方法模式(Template Method)");
    TemplateMethodTest.test();
    console.log("适配器模式(Adapter Class/Object)")
    AdapterTest.test();
    console.log("外观模式(Facade)");
    FacadeTest.test();
    console.log("装饰器模式(Decorator)");
    console.log((<any>MyTestableClass).decorator);
    DecoratorTest.test();
    console.log("观察者模式(Observer)");
    ObserverTest.test();
    console.log("策略模式(Strategy)");
    StrategyTest.test();
    console.log("命令模式(Command Pattern)");
    RemoteControlTest.test();
    console.log("迭代器模式(Iterator Pattern)");
    MenuTestDrive.test();
    console.log("组合模式(Composite Pattern)");
    MenuTest.test();
    console.log("状态模式(State Pattern)");
    StateTest.test();
  }
  doSomeThings() {
   
  }
}