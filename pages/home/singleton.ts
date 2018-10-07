// 单例模式(Singleton)--单线程
export class Singleton {

    //定义一个属性,用来保存Singleton类对象的实例
    private static instance:Singleton;

    //私有构造器,该类不能被外部类使用new方式实例化
    private constructor(){}
 
    //外部通过该方法获取Singleton类的唯一实例
    public static getInstance():Singleton{
        if (this.instance == null) {
            this.instance = new Singleton();
        }
        return this.instance;
    }
}

export class SingletonTest {
    public static test(){
        let s1:Singleton = Singleton.getInstance();
        let s2:Singleton = Singleton.getInstance();
        console.log("s1===s2 is " + (s1===s2));
    }
}