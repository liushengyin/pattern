export class CPU {
    startup(){
        console.log("启动CPU");
    }
}

export class Memory {
    startup(){
        console.log("启动内存");
    }
}

export class Disk {
    startup(){
        console.log("启动硬盘");
    }
}

//facade
export class Computer {
    cpu:CPU;
    memory:Memory;
    disk:Disk;

    constructor(){
        this.cpu = new CPU();
        this.memory = new Memory();
        this.disk = new Disk();
    }

    start(){
        this.cpu.startup();
        this.memory.startup();
        this.disk.startup();
    }
}

export class FacadeTest {
    public static test(){
        let computer = new Computer();
        //启动computer是个很复杂的过程,我们并不需要知道其启动各个子系统的加载过程
        //只需要调用computer为各个子系统提供统一的一个接口start()就可以启动computer了
        computer.start();
    }
}