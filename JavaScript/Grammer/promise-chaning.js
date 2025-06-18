
fetch('https://jsonplaceholder.typicode.com2222/todos?_limit=5')
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
        return data.filter(obj => obj.id > 3);
    })
    .then(result => {
        console.log('필터링된 데이터:', result);
    })
    .catch(error => {
        console.error('오류 발생:', error);
    })
    .finally(() => {
        console.log('모든 작업이 완료되었습니다.');
    })