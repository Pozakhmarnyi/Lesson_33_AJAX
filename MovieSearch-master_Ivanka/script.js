$(document).ready(function () {
  let clickPage = "1";
  let searchRequest = "";
  $("#requestToSearch")
    .keyup(function () {
      clickPage = "1";
      searchRequest = $(this).val();
      //   $(".requestDisplay").html(`You want search ${searchRequest}`);
      $("#requestToSearch").bind("keypress", function (e) {
        if (e.keyCode == 13) {
          searching();
        }
      });
    })
    .keyup();
  const url = "http://www.omdbapi.com/?apikey=4941d150&";
  let html1 = "";
  $("#search").on("click", searching);
  function searching() {
    let type = $("#type").val();
    let search = `${url}s=${searchRequest}&type=${type}&page=${clickPage}`;

    $(".results").html(" ");
    fetch(search)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        // $(".page-indicator").html(`You are on ${clickPage} page`);
        let result = json["Search"];
        console.log(result);
        if (result) {
          html1 = "";
          $(".results").html(html1);
          for (let i = 0; i < result.length; i++) {
            let image = result[i]["Poster"];
            let id = result[i]["imdbID"];
            let year = result[i]["Year"];
            let title = result[i]["Title"];
            html1 += `<div class="container" style="background-color: rgba(245, 233, 233, 0.350); border-radius:5px; margin-bottom: 30px; box-shadow: 5px 0 15px rgba(245, 233, 233, 0.350)">
            <div class="img"><img style="width:350px" src="${image}"/></div>
            <div class="title" style="font-size:23px; text-align:center; color: black; margin: 10px auto 10px auto; width:350px">${title}</div>
            <div class="year" style="font-size:23px; text-align:center; color: black">${year}</div>
            <div class="details">Details...</div>
            <span class="id" style="display:none">${id}</span>
            </div>`;
          }
          $(".results").html(html1);
        } else {
          html1 = `<div style="font-size:50px; text-align:center; color: black; width:100%">Movie not found!</div>`;
          $(".results").html(html1);
        }
        pagination(json);
        $(".page").on("click", function () {
          clickPage = $(this).text();
          searching();
        });
        //Детальна інформація про фільм
        $(".container").click(() => {
          ShowDetails();
        });
      });
  }
});

let pagination = function (data) {
  let amountPages = +data["totalResults"] / 10;
  let page = 0;
  let numberPages = ``;
  for (let i = 1; i < amountPages; i++) {
    page = i;
    numberPages += `<div class="page">${page}</div>`;
    $(".pages").html(numberPages);
  }
};

function ShowDetails() {
  let ID = $(".id").html();
  console.log(ID);
}

// $(".details").on("click", function () {
//   let ID = $(".id").text();
//   fetch(`http://www.omdbapi.com/?apikey=4941d150&i=${ID}&plot=full`)
//     .then((response) => {
//       return response.json();
//     })
//     .then((json) => {
//       console.log(json);
//     });
// });
