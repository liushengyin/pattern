//策略接口,计算购车总金额
export interface Strategy {
    calPrice(price:number, num:number):number;
}
//购买5辆及以下不打折
export class Nodiscount implements Strategy {
    public calPrice(price:number, num:number):number {
        return price * num;
    }
}
//购买5辆以上打9折
export class Disount implements Strategy {
    public calPrice(price:number, num:number):number {
        return price * num * 0.9;
    }
}

//上下文,根据不同策略来计算购车总金额
export class Context {
    private strategy:Strategy;

    public constructor(strategy:Strategy) {
        this.strategy = strategy;
    }

    public calPrice(price:number, num:number):number {
        return this.strategy.calPrice(price, num);
    }
}

export class StrategyTest {
    public static test() {
        let strategy:Strategy;
        //计算购买3辆总金额
        strategy = new Nodiscount();
        let context:Context = new Context(strategy);
        console.log("购买3辆总金额: " + context.calPrice(10000,3));
        //计算12辆总金额
        strategy = new Disount();
        context = new Context(strategy);
        console.log("购买12辆总金额: " + context.calPrice(10000,12));
    }
}