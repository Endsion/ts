function sayHello(person) {
    return 'Hello, ' + person;
}
var user = 'Tom';
console.log(sayHello(user));
function baseType() {
    var isDone = true;
    if (isDone) {
        console.log("布尔型");
    }
    function alertName() {
        console.log('没有返回值得函数');
    }
    alertName();
    var myFavoriteNumber = 'seven';
    myFavoriteNumber = 7;
}
function unionType() {
    var myFavoriteNumber;
    myFavoriteNumber = 'seven';
    myFavoriteNumber = 7;
    console.log(myFavoriteNumber);
}
function interfaceFunc() {
    ;
    var tom = {
        name: 'Tom',
        age: 25
    };
    console.log(tom);
}
var fibonacci = [2, 1, 2, 3, 5];
fibonacci['2'] = '2';
//console.log(fibonacci)
var mySum = function (x) {
    var items = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        items[_i - 1] = arguments[_i];
    }
    if (items.length > 0) {
        items.map(function (item) { return x = x + item; });
    }
    return x;
};
console.log(mySum(1, 2, 3, 4));
