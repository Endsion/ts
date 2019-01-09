function sayHello(person: string) {
    return 'Hello, ' + person;
}

let user = 'Tom';

console.log(sayHello(user));

function baseType(){
    let isDone: boolean = true;
    if(isDone){
        console.log("布尔型");
    }
    
    function alertName(): void {
        console.log('没有返回值得函数');
    }
    
    alertName();
    
    let myFavoriteNumber: any = 'seven';
    myFavoriteNumber = 7;
}
function unionType(){
    let myFavoriteNumber: string | number;
    myFavoriteNumber = 'seven';
    myFavoriteNumber = 7;
    console.log(myFavoriteNumber)
}
function interfaceFunc(){
    interface Person {
        name: string;
        age: number;
    };
    
    let tom: Person = {
        name: 'Tom',
        age: 25
    };
    console.log(tom);
}
interface NumberArray {
    [index: number]: number;
}
let fibonacci: NumberArray = [2, 1, 2, 3, 5];
fibonacci['2'] = '2';
//console.log(fibonacci)

let mySum: (x: number, ...items: number[]) => number = function (x: number, ...items: number[]): number {
    if(items.length > 0){
        items.map(item => x = x+item);
    }
    return x;
};

console.log(mySum(1,2,3,4))