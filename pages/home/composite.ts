// 实现菜单组件的抽象类，对每个方法都提供了默认的实现
abstract class MenuComponent {

 public add(menuComponent:MenuComponent):void {
 throw new UnsupportedOperationException();
 }
 public remove(menuComponent:MenuComponent):void {
 throw new UnsupportedOperationException();
 }
 public  getChild(i:number):MenuComponent {
 throw new UnsupportedOperationException();
 }
 public  getName():String {
 throw new UnsupportedOperationException();
 }
 public  getDescription():String {
 throw new UnsupportedOperationException();
 }
 public getPrice():number {
 throw new UnsupportedOperationException();
 }
 public isVegetarian():boolean {
 throw new UnsupportedOperationException();
 }
 public print() {
 throw new UnsupportedOperationException();
 }
 public createIterator() {
 throw new UnsupportedOperationException();
 }
}


class UnsupportedOperationException extends Error {
    constructor() {  
        super();
    }
    toString(){  
        return  this.message;
    }  
}
// 实现菜单项
 class MenuItem extends MenuComponent {
  name:String;
  description:String;
  vegetarian:boolean;
  price:number;

 public constructor( name:String, description:String, vegetarian:boolean, price:number)
 {
     super();
     this.name = name;
     this.description = description;
     this.vegetarian = vegetarian;
     this.price = price;
 }

 public getName():String { 
 return this.name;
 }

 public getDescription():String {
 return this.description;
 }

 public getPrice():number {
 return this.price;
 }

 public isVegetarian():boolean {
 return this.vegetarian;
 }

 public print() {
 console.log(" " + this.getName());
 if (this.isVegetarian()) {
 console.log("(v)");
 }
 console.log(", " + this.getPrice());
 console.log(" -- " + this.getDescription());
 }

 public createIterator() {
   return this;
 }

}

// 实现组合菜单
class Menu extends MenuComponent {
 menuComponents = new Array();
 name:String;
 description:String;
 iterator = null;

 public constructor(name:String, description:String) {
   super();
   this.name = name;
   this.description = description;
 }
 public add(menuComponent:MenuComponent):void {
 this.menuComponents.push(menuComponent);
 }
 public remove(menuComponent:MenuComponent):void {
 this.menuComponents.splice(this.menuComponents.indexOf(menuComponent),1);
 }
 public getChild(i:number):MenuComponent {
 return this.menuComponents[i];
 }
 public getName():String {
 return this.name;
 }
 public getDescription():String {
 return this.description;
 }
 public print():void {
 console.log("\n" + this.getName());
 console.log(", " + this.getDescription());
 console.log("---------------------");

 this.menuComponents.forEach((item)=>{
   item.print();
 });
 }

  public createIterator() {
    return this.menuComponents;
 }

}
class Waitress {
 allMenus:MenuComponent;
 public constructor(allMenus:MenuComponent) {
 this.allMenus = allMenus;
 }
 public printMenu():void {
 this.allMenus.print();
 }
 public printVegetarianMenu():void {
 console.log("\nVEGETARIAN MENU\n----");
 this.recursive(this.allMenus.createIterator(),this.printVegetarian);
}
 public recursive(pointer:any,callback){
  for(let item of pointer) {
    if(item.createIterator() instanceof Array){
      this.recursive(item.createIterator(),callback);
    } else {
      callback(item);
    }
  }
}
 public printVegetarian(item):void {
  try {
    if (item.isVegetarian()) {
        item.print();
    }
  } catch (e) {
    console.error(e);
  }
}
}

export class MenuTest {
 public static test():void {
 let pancakeHouseMenu:MenuComponent = new Menu("PANCAKE HOUSE MENU", "Breakfast");
 let dinerMenu:MenuComponent = new Menu("DINER MENU", "Lunch");
 let cafeMenu:MenuComponent = new Menu("CAFE MENU", "Dinner");
 let dessertMenu:MenuComponent = new Menu("DESSERT MENU", "Dessert of course!");

 let allMenus:MenuComponent = new Menu("ALL MENUS", "All menus combined");
 allMenus.add(pancakeHouseMenu);
 allMenus.add(dinerMenu);
 allMenus.add(cafeMenu);

 // add menu items here
 dinerMenu.add(new MenuItem("Pasta", "Spaghetti with Marinara Sauce, and a slice of sourdough bread",true,3.89));

 dinerMenu.add(dessertMenu);

 dessertMenu.add(new MenuItem("Apple Pie", "Apple pie with a flakey crust, topped with vanilla icecream",true, 1.59));

 // add more menu items here

 let waitress:Waitress = new Waitress(allMenus);
 waitress.printMenu();
 waitress.printVegetarianMenu();
 }
}