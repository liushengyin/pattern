// 适配器模式(Adapter Class/Object)
//MicroUSB接口,客户端所期待的接口
export interface MicroUSB {
    process();
}

//USBTypec接口,需要被适配的接口
export interface USBTypec {
    process();
}

export class Phone implements MicroUSB {
    process() {
      console.log("使用MicroUSB接口进行充电");
    }
}

export class Car implements USBTypec {
    process() {
      console.log("使用USBTypec接口进行充电");
    }
}

//适配器,将USBTypec接口转换成MicroUSB
export class USBTypecToMicroUSB implements MicroUSB {

    usbTypec:USBTypec;

    public constructor( usbTypec:USBTypec ) {
        this.usbTypec = usbTypec;
    }

    public process() {
        console.log("USBTypec接口转换成MicroUSB");
        this.usbTypec.process();
    }
}

export class AdapterTest {
    public static test() {
        let usbTypec:USBTypec = new Car();
        let tTom:USBTypecToMicroUSB = new USBTypecToMicroUSB(usbTypec);
        tTom.process();
    }
}