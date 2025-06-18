
// console.log("첫번째");
// console.log("두번째");
// console.log("세번째");

function asyncFunction() {
    console.log("첫번째 비동기");
    setTimeout(() => {
        console.log("두번째 비동기");
    }, 1000);
    console.log("세번째 비동기");
}