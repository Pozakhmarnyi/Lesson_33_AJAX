// РОБИ КРОК ЗА КРОКОМ ! А то процесор перегріється ))

// 1 - брати текст з інпута --> перевести у  val
// 2 - поєднати val  із запитом + ключ ---> отримата перший api
// 3 - перетворити в JSON --
// // 4 - відобразити просто заголовки тих Розшукуваних фільмів
// // 5 -Если по заданным критериям не будут найдены фильмы, то отобразите сообщение Movie not found!.
//  6-  выбора типа (movie, series, episode).
// 7 - гортати по сторінкам пошуку
// (а - зробити відображення яка сторінка. б - зробити дві кнопки - вперед\назад
//    в- створити ф-цію, яка гортає сторінки) >>?? робити ?

// 1 - прикрутити до кожного фільму кнопку - іконку
// 2 - яка б реагувала - добавляючи цей фільм в локалСторідж + колір міняла б
// 3 - відтворити (показати, сховати) список збережених фільмів

let value = "";
let favoritesHTML = ``;
$(document).ready(function () {
  if (localStorage.length != 0) {
    $("#favorites-block").addClass("show");
    favoritesHTML = localStorage.getItem("html");
    $("#favorites").html(favoritesHTML);
  };

$("#userValue")
  .keyup(function () {
    value = $(this).val();
    $("#DIV").html(`<p>We Search: " ${value} " </p>`);
  })
  .keyup();
value = value.replace(" ", "+");
const apiKey = "http://www.omdbapi.com/?apikey=4941d150&";
let apiUrl = "https://www.omdbapi.com/?apikey=41e208eb";
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
    html += `<img src="${data.Search[index].Poster}" alt="" /></a> <i class="fas fa-heart"></i></div>`;
  }
  console.log(data);
  $("#content").html(html);
  // Улюблені фільми
  $("i").on("click", function (e) {
    $(e.target).css("color", "red");
    // localStorage.setItem(e.data.Search.Title, e.data.Search.imdbID);
  });

  $("i").click(function (favoritesButton) {
    AddToFavorites(favoritesButton);
  });
};

//Додати в улюблене:
function AddToFavorites(addButton) {
  $("#favorites-block").addClass("show");
  let id = "&i=" + $(addButton.currentTarget.lastElementChild).html();
  if (favoritesHTML.indexOf(id) == -1) {
    fetch(apiUrl + id)
      .then((favoritesRequest) => favoritesRequest.json())
      .then((favoritesData) => {
        image = favoritesData.Poster;
        if (image == "N/A") {
          image = "img/no-poster.jpg";
        }
        favoritesHTML += `
          <div class="favorites__result results__item ">
              <div class="favorites__result-title results__title ">${favoritesData.Title}</div>
              <div style="display:none">&i=${favoritesData.imdbID}</div>
              <div class="favorites__image"><img src="${image}" alt="img"></div>
          </div>
          `;
        $("#favorites").html(favoritesHTML);
        localStorage.setItem("html", favoritesHTML);
      });
  }
}
