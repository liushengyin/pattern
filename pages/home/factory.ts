// 工厂方法模式(Factory Method)
export interface IFactory {
    createProduct();
}

export class FactoryA implements IFactory {
 
     createProduct() {
       console.log("FactoryA create ProductA")
    }
}

export class FactoryB implements IFactory {
 
     createProduct() {
       console.log("FactoryB create ProductB")
    }
}

export class FactoryTest {
    public static test() {
        let fa = new FactoryA();
        let fb = new FactoryB();
        fa.createProduct();
        fb.createProduct();
    }
}