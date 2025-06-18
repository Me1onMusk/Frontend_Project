
function getUser(userId) {
    return new Promise((resolve, reject) => {
        try{
            setTimeout(() => {
                const user = userId === 1 ? { id: userId, name: "Kim" } : null;
                resolve(user);
            }, 1000);
        }catch(e){
            reject(e);
        }   
    });
}

function runPromise() {
    getUser(1)
        .then(user => {
            if(user) {
                console.log("사용자 정보:", user);
            }else {
                console.log("사용자 정보를 찾을 수 없습니다.");
            }
        })
}

async function runAsyncAwait() {
    try{
        const user = await getUser(1);
        if(user) {
            console.log("사용자 정보:", user);
        } else {
            console.log("사용자 정보를 찾을 수 없습니다.");
        }
    }catch(e) {
        console.error("오류 발생:", e);
    }
}

console.log('start');
runAsyncAwait();
console.log('end');