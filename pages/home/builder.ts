// 建造者模式(Builder)

//产品由各个组件组成
export class Product {
    partA:string;
    partB:string;
    partC:string;
}

//抽象生产者
export interface Builder {

    buildPartA();
    buildPartB();
    buildPartC();
    buildProduct():Product;
}

//具体生产者
export class ConcreteBuilder implements Builder {

    product:Product = new Product();

    public buildPartA() {
      this.product.partA = "PartA";
      console.log("buildPartA");
    }

    public  buildPartB() {
       this.product.partB = "PartB";
       console.log("buildPartB");
    }
    public buildPartC() {
       this.product.partC = "PartC";
       console.log("buildPartC");
    }

    public buildProduct():Product {
        return this.product;
    }
}
// 上面是一个工厂模式

//指导者,产品生产流程规范
export class Director {

    builder:Builder;
    //由具体的生产者来生产产品
    public constructor(builder:Builder) {
        this.builder = builder;
    }

    //生产流程
    public buildProduct(){
        this.builder.buildPartA();
        this.builder.buildPartB();
        this.builder.buildPartC();
        return this.builder.buildProduct();
    }
}

  // 建造者模式(Builder)
export class BuilderTest {
    public static test(){
        //只需要关心具体建造者,无需关心产品内部构建流程。
        //如果需要其他的复杂产品对象，只需要选择其他的建造者.
        let builder:Builder = new ConcreteBuilder();
        //把建造者注入指导者
        let director:Director = new Director(builder);
        //指导者负责流程把控
        director.buildProduct();
        // 建造者返回一个组合好的复杂产品对象
        let product:Product = builder.buildProduct();
        console.log(product);
    }
}
