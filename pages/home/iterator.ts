interface myIterator {
    hasNext():boolean;
    next():any;
}

class DinerMenuIterator implements Iterator<any> {
    items:Array<MenuItem>;
    position:number = 0;
    constructor(items) {
        this.items = items;
    }
    next():any {
        if (this.position >= this.items.length || this.items[this.position] == null) {
            return {
                done: true,
                value: null
            };
        } else {
            let menuItem:MenuItem = this.items[this.position];
            this.position = this.position + 1;
            return {
                done: false,
                value: menuItem
            }
        }
    }

    hasNext():boolean {
        if (this.position >= this.items.length || this.items[this.position] == null) {
            return false;
        } else {
            return true;
        }
    }

}

class MenuItem {
    name:String;
    description:String;
    vegetarian:boolean;
    price:number;
    public constructor( name:String, description:String, vegetarian:boolean, price:number)
    {
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

}

class PancakeHouseMenu{
    public menuItems = new Set();
    public constructor() {
        this.addItem("K&B’s Pancake Breakfast","Pancakes with scrambled eggs, and toast",true,2.99);
        this.addItem("Regular Pancake Breakfast","Pancakes with fried eggs, sausage",false,2.99);
        this.addItem("Blueberry Pancakes","Pancakes made with fresh blueberries",true,3.49);
        this.addItem("Waffles","Waffles, with your choice of blueberries or strawberries",true,3.59);
    }
    public addItem(name:String, description:String, vegetarian:boolean, price:number)
    {
        let menuItem:MenuItem = new MenuItem(name, description, vegetarian, price);
        this.menuItems.add(menuItem);
    }
    public getMenuItems():Set<MenuItem> {
        return this.menuItems;
    }
    public createIterator() {
        return this.menuItems;
    }
}

class DinerMenu {
    // static MAX_ITEMS:number = 6;
    public numberOfItems:number = 0;
    public menuItems:MenuItem[];

    public constructor() {
        this.menuItems = new Array();
        this.addItem("Vegetarian BLT","(Fakin’) Bacon with lettuce & tomato on whole wheat", true, 2.99);
        this.addItem("BLT","Bacon with lettuce & tomato on whole wheat", false, 2.99);
        this.addItem("Soup of the day","Soup of the day, with a side of potato salad", false, 3.29);
        this.addItem("Hotdog","A hot dog, with saurkraut, relish, onions, topped with cheese",false, 3.05);
    }

    public addItem(name:String, description:String, vegetarian:boolean, price:number)
    {
        let menuItem:MenuItem = new MenuItem(name, description, vegetarian, price);
        this.menuItems[this.numberOfItems] = menuItem;
        this.numberOfItems = this.numberOfItems + 1;
    }
    public getMenuItems():MenuItem[] {
        return this.menuItems;
    }
    public createIterator() {
        return this.menuItems;
    }
    // other menu methods here
}

class Waitress {
    menus = new Array();

    public constructor( menus:Array<any> ) {
        this.menus = menus;
    }
    public printMenu() {
        for(let menu of this.menus) {
            this.print(menu.menuItems);
        }
    }
    private print(iterator) {
        iterator.forEach((menuItem)=>{
           console.log(menuItem.getName() + ", ");
           console.log(menuItem.getPrice() + " -- ");
           console.log(menuItem.getDescription());
        })
    }
    // other methods here
}

export class MenuTestDrive {
    public static test() {
        let pancakeHouseMenu:PancakeHouseMenu = new PancakeHouseMenu();
        let dinerMenu:DinerMenu = new DinerMenu();
        let waitress:Waitress = new Waitress([pancakeHouseMenu,dinerMenu]);
        waitress.printMenu();
    }
}