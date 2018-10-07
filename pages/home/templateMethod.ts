// 模板方法模式(Template Method)
//抽象模板类
export abstract class AbstractSort {
 
    public abstract sort(array:Array<number>);

    public printArray(array:Array<number>) {
        this.sort(array);
        for (var i = 0; i < array.length ; i++) {
            console.log(array[i]);
        }
    }
}
//具体实现类
export class QuickSort extends AbstractSort {
   public sort(array:Array<number>) {
        //使用快排算法实现
        console.log("使用快排算法实现")
    }
}

export class MergeSort extends AbstractSort {
    public sort(array:Array<number>) {
        //使用归并排序算法实现
        console.log("使用归并排序算法实现")
    }
}

export class TemplateMethodTest {
    public static test() {
        let arr = [3,5,2,45,243,341,111,543,24];
        //AbstractSort s = new MergeSort();
        let qs = new QuickSort();
        qs.printArray(arr);
        let ms = new MergeSort();
        ms.printArray(arr);
    }
}