// 创建一个命令接口。
export interface Command {
  execute();
}
// 创建实现了接口的实体类。
export class LightOnCommand implements Command {
  light:Light;

  public constructor(light:Light) {
      this.light = light;
  }
  public execute() {
      this.light.on();
  }
}

export class Light {
  on() {
    console.log("light on!");
  }
  off() {
    console.log("light off!");
  }
}

export class SimpleRemoteControl {
  slot:Command;
  public setCommand(command:Command) {
    this.slot = command;
  }
 public buttonWasPressed() {
     this.slot.execute();
 }
}

export class RemoteControlTest {

    static test(){
      let remote:SimpleRemoteControl = new SimpleRemoteControl();
      let light:Light = new Light();
      let lightOn:LightOnCommand = new LightOnCommand(light);
      remote.setCommand(lightOn);
      remote.buttonWasPressed();
    };
    
}