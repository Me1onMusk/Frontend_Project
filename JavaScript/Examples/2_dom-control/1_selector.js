// get 메서드
let title = document.getElementById("title");
console.log(title);

title.textContent = `자동차 목록`;

let items = document.getElementsByClassName("item");
console.log(items);
console.log(items[0]);
console.log(items[1]);
console.log(items[2]);

let list = document.getElementsByTagName("li");
console.log(list);

// HTML 요소 쿼리
let h2 = document.querySelector("#title");
console.log(h2);

title.innerHTML = "<span>자동차</span>";

let input = document.querySelector("input");
input.setAttribute("placeholder", "차 검색");
