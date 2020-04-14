// РОБИ КРОК ЗА КРОКОМ ! А то процесор перегріється ))

// 1 - брати текст з інпута --> перевести у  val
// 2 - поєднати val  із запитом + ключ ---> отримата перший api
// 3 - перетворити в JSON --
// // 4 - відобразити просто заголовки тих Розшукуваних фільмів
// // 5 -Если по заданным критериям не будут найдены фильмы, то отобразите сообщение Movie not found!.
//  6-  выбора типа (movie, series, episode).
// 7 - гортати по сторінкам пошуку
// (а - зробити відображення яка сторінка. б - зробити дві кнопки - вперед\назад
//    в- створити ф-цію, яка гортає сторінки)

let value = "";
$("#userValue")
  .keyup(function () {
    value = $(this).val();

    $("#DIV").html(`<p>We Search: " ${value} " </p>`);
  })
  .keyup();

const apiKey = "http://www.omdbapi.com/?apikey=4941d150&";

let data;

function pressFuncSearch() {
  let select = $("#single").val();
  let newSearch = `${apiKey}s=${value}&type=${select}`;
  fetch(newSearch)
    .then((resposiv) => {
      return resposiv.json();
    })
    .then((responseData) => {
      data = responseData;
      show();
    });

  console.log("pressFunc - працює");
}

console.log(data);

function show() {
  let html = "";
  if (data.Response === "False") {
    html = "<h2>Movie not found!</h2>";
    $("#content").html(html);
  }
  for (let index = 0; index < data.Search.length; index++) {
    html += `<div><h2> ${data.Search[index].Title}</h2>`;
    html += `<img src="${data.Search[index].Poster}" alt="" /></a></div>`;
  }
  console.log(data);
  $("#content").html(html);
}
