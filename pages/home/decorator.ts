// 装饰器模式(Decorator)

export interface ICoffee {
    showCoffee();
    showPrice();
}

//原始咖啡
export class Coffee implements ICoffee {
    private name:String;
    private price:number;

    public constructor( name:String, price:number ) {
        this.name = name;
        this.price = price;
    }

    public showCoffee() {
        console.log(name + " coffee");
    }

    public showPrice():number {
        return this.price;
    }
}

//抽象装饰器
export abstract class Decorator implements ICoffee {
    private coffee:ICoffee;

    public setCoffee(coffee:ICoffee) {
        this.coffee = coffee;
    }

    public showCoffee() {
        this.coffee.showCoffee();
    }

    public showPrice():number {
        return this.coffee.showPrice();
    }
}

//加糖咖啡
export class Sugar extends Decorator {

    public showCoffee() {
        console.log("加糖");
        super.showCoffee();
    }


    public showPrice():number {
        return super.showPrice() + 5;
    }
}

//加糖,加牛奶的咖啡
export class SugarMilk extends Decorator {
   
    public showCoffee() {
        console.log("加糖,加牛奶");
        super.showCoffee();
    }


    public showPrice():number {
        return super.showPrice() + 10;
    }
}

export function jsDecorator(decorator) {
  return function(target) {
    target.decorator = decorator;
  }
}

@jsDecorator(true)
export class MyTestableClass {}

export class DecoratorTest {
    public static test() {
        let coffee:Coffee = new Coffee("拿铁", 20);
         //加糖
        let sugar:Decorator = new Sugar();
        sugar.setCoffee(coffee);
        sugar.showCoffee();
        console.log(sugar.showPrice());
         //加糖,加牛奶的咖啡
        let sugarMilk:Decorator = new SugarMilk();
        sugarMilk.setCoffee(coffee);
        sugarMilk.showCoffee();
        console.log( sugarMilk.showPrice());
    }
}