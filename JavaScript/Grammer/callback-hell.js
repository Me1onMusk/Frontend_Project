
// function getUser(userId, callback) {
//     setTimeout(() => {
//         const user = { id: userId, name: "Kim" };
//         callback(user);
//     }, 1000);
// }

function getUser(userId) {
    return new Promise((resolve, reject) => {
        try{
            setTimeout(() => {
                const user = { id: userId, name: "Kim" };
                resolve(user);
            }, 1000);
        }catch(e){
            reject(e);
        }   
    });
}

function getPosts(userId, callback) {
    setTimeout(() => {
        const posts = [
            { postId: 1, content: "첫 번째 게시글" },
            { postId: 2, content: "두 번째 게시글" }
        ];
        callback(posts);
    }, 1000);
}

function getComments(postId, callback) {
    setTimeout(() => {  
        const comments = [
            { commentId: 1, content: "첫 번째 댓글" },
            { commentId: 2, content: "두 번째 댓글" }
        ];
        callback(comments);
    }, 1000);
}

// 콜백 지옥 //
// 1. 사용자 정보 가져오기
// 2. 사용자 게시글 가져오기
// 3. 게시글에 대한 댓글 가져오기
getUser(1, (user) => {
    console.log("사용자 정보:", user);
    getPosts(user.id, (posts) => {
        console.log("사용자의 게시글:", posts);
        getComments(posts[0].postId, (comments) => {
            console.log("첫 번째 게시글의 댓글:", comments);
        });
    });
});