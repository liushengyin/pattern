 class GumballMachine {
     soldOutState:State;
     noQuarterState:State;
     hasQuarterState:State;
     soldState:State;
     winnerState:State;
     state:State = this.soldOutState;
     count:number = 0;

     public constructor(numberGumballs:number) {
         this.soldOutState = new SoldOutState(this);
         this.noQuarterState = new NoQuarterState(this);
         this.hasQuarterState = new HasQuarterState(this);
         this.soldState = new SoldState(this);
         this.winnerState = new WinnerState(this);
         this.count = numberGumballs;
         if (numberGumballs > 0) {
             this.state = this.noQuarterState;
         }
     }
     public insertQuarter() {
         this.state.insertQuarter();
     }
     public ejectQuarter() {
         this.state.ejectQuarter();
     }
     public turnCrank() {
         this.state.turnCrank();
         this.state.dispense();
     }
     setState(state:State) {
         this.state = this.state;
     }
     getState() {
         return this.state;
     }
     releaseBall() {
         console.log("A gumball comes rolling out the slot...");
         if (this.count != 0) {
             this.count = this.count - 1;
         }
     }

     getCount() {
         return this.count;
     }
     refill(numberGumballs:number) {
         this.count = numberGumballs;
         this.state = this.noQuarterState;
     }
     getNoQuarterState(){
         return this.noQuarterState;
     }
     getHasQuarterState(){
         return this.hasQuarterState;
     }
     getWinnerState() {
         return this.winnerState;
     }
     getSoldState() {
         return this.soldState;
     }
     getSoldOutState(){
         return this.soldOutState;
     }
 }

 export interface State {
     insertQuarter();
     ejectQuarter();
     turnCrank();
     dispense()
 }

 class NoQuarterState implements State {
     gumballMachine:GumballMachine;
     public constructor(gumballMachine:GumballMachine) {
         this.gumballMachine = gumballMachine;
     }
     public insertQuarter():void {
         console.log("You inserted a quarter");
         this.gumballMachine.setState(this.gumballMachine.getHasQuarterState());
     }
     public ejectQuarter():void {
         console.log("You haven’t inserted a quarter");
     }
     public turnCrank():void {
         console.log("You turned, but there’s no quarter");
     }
     public dispense():void {
         console.log("You need to pay first");
     }
 }

 class HasQuarterState implements State {
     gumballMachine:GumballMachine;
     public constructor(gumballMachine:GumballMachine) {
         this.gumballMachine = gumballMachine;
     }

     public insertQuarter() {
         console.log("You can’t insert another quarter");
     }
     public ejectQuarter() {
         console.log("Quarter returned");
         this.gumballMachine.setState(this.gumballMachine.getNoQuarterState());
     }
     public turnCrank() {
         console.log("You turned...");
         let winner = Math.floor(Math.random()*10+1);
          if ((winner == 1) && (this.gumballMachine.getCount() > 1)) {
          this.gumballMachine.setState(this.gumballMachine.getWinnerState());
          } else {
          this.gumballMachine.setState(this.gumballMachine.getSoldState());
          }
         this.gumballMachine.setState(this.gumballMachine.getSoldState());
     }
     public dispense() {
         console.log("No gumball dispensed");
     }
 }

 class SoldState implements State {
     //constructor and instance variables here
     gumballMachine:GumballMachine;
     public constructor(gumballMachine:GumballMachine) {
         this.gumballMachine = gumballMachine;
     }
     public insertQuarter() {
         console.log("Please wait, we’re already giving you a gumball");
     }
     public ejectQuarter() {
         console.log("Sorry, you already turned the crank");
     }
     public turnCrank() {
         console.log("Turning twice doesn’t get you another gumball!");
     }
     public dispense() {
         this.gumballMachine.releaseBall();
         if (this.gumballMachine.getCount() > 0) {
             this.gumballMachine.setState(this.gumballMachine.getNoQuarterState());
         } else {
             console.log("Oops, out of gumballs!");
             this.gumballMachine.setState(this.gumballMachine.getSoldOutState());
         }
     }
 }

 class WinnerState implements State {
     //constructor and instance variables here
     gumballMachine:GumballMachine;
     public constructor(gumballMachine:GumballMachine) {
         this.gumballMachine = gumballMachine;
     }
     public insertQuarter() {
         console.log("Please wait, we’re already giving you a gumball");
     }
     public ejectQuarter() {
         console.log("Sorry, you already turned the crank");
     }
     public turnCrank() {
         console.log("Turning twice doesn’t get you another gumball!");
     }
     public dispense() {
         console.log("You are a winner!")
         this.gumballMachine.releaseBall();
         if (this.gumballMachine.getCount() == 0) {
             this.gumballMachine.setState(this.gumballMachine.getSoldOutState());
         } else {
             this.gumballMachine.releaseBall();
             if (this.gumballMachine.getCount() > 0) {
                 this.gumballMachine.setState(this.gumballMachine.getNoQuarterState());
             } else {
                 console.log("Oops, out of gumballs!");
                 this.gumballMachine.setState(this.gumballMachine.getSoldOutState());
             }
         }
     }
 }

 class SoldOutState implements State {
     gumballMachine:GumballMachine;
     public constructor(gumballMachine:GumballMachine) {
         this.gumballMachine = gumballMachine;
     }
     public insertQuarter() {
         console.log("the machine is sold out");
     }
     public ejectQuarter() {
         console.log("the machine is sold out");
     }
     public turnCrank() {
         console.log("the machine is sold out");
     }
     public dispense() {
         console.log("the machine is sold out");
     }
 }

 export class StateTest {
    public static test() {
        let gumballMachine:GumballMachine = new GumballMachine(5);
        console.log(gumballMachine);
        gumballMachine.insertQuarter();
        console.log(gumballMachine.getState());
        gumballMachine.turnCrank();
        console.log(gumballMachine);
        gumballMachine.insertQuarter();
        gumballMachine.turnCrank();
        gumballMachine.insertQuarter();
        gumballMachine.turnCrank();
        console.log(gumballMachine);
    }
}