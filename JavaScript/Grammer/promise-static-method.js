const myPromise = Promise.resolve(100);

console.log(myPromise);
myPromise
  .then((value) => value / 2)
  .then((value) => value / 50)
  .then(console.log);

const myPromise2 = Promise.reject("Error");
myPromise2.catch(console.log);

function fetchData() {
  return fetch("https://jsonplaceholder.typicode.com2222/todos?_limit=5")
    .then((response) => response.json())
    .then((data) => {
      if (data.length === 5) {
        return Promise.reject("데이터가 없습니다.");
      }
      return data;
    });
}

fetchData()
  .then(console.log)
  .catch((error) => console.log(error));

const promise1 = Promise.resolve(1000);
const promise2 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(3000);
  }, 2000);
});
const promise3 = fetch(
  "https://jsonplaceholder.typicode.com2222/todos?_limit=5&_delay:5000"
);
const promise4 = Promise.reject("Error");

// 하나라도 실패(rejected)하면 즉시 전체가 실패 //
Promise.all([promise1, promise2, promise3, promise4])
  .then(console.log)
  .catch(console.error);

// 실패한 작업이 있어도 전체 결과를 확인하고 싶을 때 사용 //
Promise.allSettled([promise1, promise2, promise3, promise4]).then(console.log);

// 가장 먼저 성공(fulfilled)한 Promise의 결과를 반환 //
Promise.any([promise1, promise2, promise3, promise4]).then(console.log);

// 가장 먼저 완료(settled, 성공/실패 무관)된 Promise의 결과 //
Promise.race([promise1, promise2, promise3, promise4]).then(console.log);
