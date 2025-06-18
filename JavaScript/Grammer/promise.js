
const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        const text = prompt("hello를 입력해줘! 그러면 선물을 줄게~");
        if (text === "hello") {
            resolve("선물: 🎁");
        } else {
            reject("잘못된 입력입니다. 다시 시도해주세요.");
        }
    }, 2000);
});

myPromise
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error(error);
    })
    .finally(() => {
        console.log("프로미스가 완료되었습니다.");
    });     
