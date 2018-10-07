//抽象工厂模式(Abstract Factory)

// CPU工厂接口
export interface CPUFactory {
    createCPU();
}
// IntelCPU工厂
export class IntelCPU implements CPUFactory {
    createCPU() {
        console.log("Intel CPU");
    }
}
// AMDCPU工厂
export class AMDCPU implements CPUFactory {
    createCPU() {
        console.log("AMD CPU");
    }
}

// 上面是一个工厂模式。下面也是一个工厂模式

// 创建抽象工厂类接口
export interface Provider {
    createCPUFactory():CPUFactory;
}

export class InterCPUFactory implements Provider {

    createCPUFactory():CPUFactory {
        return new IntelCPU();
    }
}

export class AMDCPUFactory implements Provider {
    createCPUFactory():CPUFactory {
        return new AMDCPU();
    }
}

export class AbstractFactoryTest {
    public static test() {
        // 创建一个生产CPU工厂的工厂
        let cpufactory:Provider = new InterCPUFactory();
        // 通过CPU工厂的工厂创建一个IntelCPU工厂
        let intelcpu:CPUFactory = cpufactory.createCPUFactory();
        // IntelCPU工厂生产intelCPU
        intelcpu.createCPU();
    }
  }