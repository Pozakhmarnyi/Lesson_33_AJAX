const dataBase = "http://64.225.74.130";

let data;
let html = "";

const samWeb = "http://64.225.74.130/api/paints/getstart";
fetch(samWeb)
  .then((resposiv) => {
    return resposiv.json();
  })
  .then((responseData) => {
    data = responseData;
    show();
  });

function show() {
  for (let index = 0; index < data.length; index++) {
    html += `<h1>Автор: ${data[index].author}</h1>`;
    html += `<div><img src="${dataBase}${data[index].src}" alt=""></div>`;
  }
  console.log(data);
  $("#DIV").html(html);
}
console.log(data);
//   (10) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
// 0: {src: "/media/bunker/paint/b004.jpg", id: 16, author: "Богдан Кухарський", authorid: 20, title: ""}
// 1: {src: "/media/bunker/paint/b015.jpg", id: 27, author: "Дмитро Стецько", authorid: 5, title: ""}
// 2: {src: "/media/bunker/paint/b016.jpg", id: 28, author: "Дмитро Стецько", authorid: 5, title: ""}
// 3: {src: "/media/bunker/paint/b030.jpg", id: 35, author: "Сергій Прудько", authorid: 52, title: ""}
// 4: {src: "/media/bunker/paint/b008.jpg", id: 20, author: "Віталій Довгасенко", authorid: 7, title: ""П'яна Муза""}
// 5: {src: "/media/bunker/paint/b012.jpg", id: 24, author: "Гагік Кургінян", authorid: 16, title: "Football"}
// 6: {src: "/media/bunker/paint/b001.jpg", id: 13, author: "Аліна Гаєва", authorid: 40, title: "Без назви"}
// 7: {src: "/media/bunker/paint/b013.jpg", id: 25, author: "Дмитро Стецько", authorid: 5, title: "Вода з порожнього відра"}
// 8: {src: "/media/bunker/paint/b022.jpg", id: 30, author: "Нікіта Цой", authorid: 3, title: "Голова"}
// 9: {src: "/media/bunker/paint/b018.jpg", id: 29, author: "Катерина Сапожкова", authorid: 67, title: "Домашній крам"}
// length: 10
// __proto__: Array(0)
