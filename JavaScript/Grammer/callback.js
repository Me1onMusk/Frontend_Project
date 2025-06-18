
function taskSyncFunction(callback) {
    console.log("start");
    setTimeout(() => {
        console.log("첫 번째 작업 시작");
        console.log("두 번째 작업 완료");
        callback();
    }, 2000);
    console.log("end");
}

taskSyncFunction(() => {
    console.log("콜백 함수 실행");
});

console.log("실행 완료");