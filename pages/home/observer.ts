// 观察者模式(Observer)
export interface Subject {
    //添加观察者
    attach(o:Observer);
    //删除观察者
    detach(o:Observer);
    //通知观察者
    notifyObservers();
    //发生某事
    fire()
}
export class ConcreteSubject implements Subject {

    observers = new Array<Observer>();
    attach(o:Observer) {
        this.observers.push(o);
    }
    
    detach(o:Observer) {
        let index = this.observers.indexOf(o);
        if( index > 0) {
            this.observers.splice(index,1);
        }
    }
    
    notifyObservers() {
        this.observers.forEach((item)=>{item.update()})
    }

    fire(){
        this.notifyObservers();//通知观察者
    }
}

//观察者
export interface Observer {
    update();
}
export class ConcreteObserver implements Observer {
    update() {
        console.log("我观察到subject发生了某事");
    }
}

export class ObserverTest {
    public static test() {
        //添加观察者
        (<any>window).cs = new ConcreteSubject();
        (<any>window).cs.attach(new ConcreteObserver());
        //subject发生了某事，通知观察者
        (<any>window).cs.fire();
    }
}
