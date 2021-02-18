$(document).ready(function () {
	console.log('Hello');
	let clickPage = "1";
	let searchRequest = "";
	$("#requestToSearch")
		.keyup(function () {
			clickPage = "1";
			searchRequest = $(this).val();
			// $(".requestDisplay").html(`You want search ${searchRequest}`);
			$("#requestToSearch").bind("keypress", function (e) {
				if (e.keyCode == 13) {
					searching();
				}
			});
		})
		.keyup();
	const url = "https://www.omdbapi.com/?apikey=4941d150&";
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
						html1 += `<div class="container" >
            <div class="img"><img style="width:350px" src="${image}"/></div>
            <div class="title" style="font-size:23px; text-align:center; color: black; margin: 10px auto 10px auto; width:350px">${title}</div>
            <div class="year" style="font-size:23px; text-align:center; color: black">${year}</div>
            
            <span class="id" style="display:none">${id}</span>
            </div>`;
					}
					$(".results").html(html1);
				} else {
					html1 = `<div class="main-title--noFilm">Movie not found!</div>`;
					$(".results").html(html1);
				}
				pagination(json);
				$(".page").on("click", function () {
					clickPage = $(this).text();
					searching();
				});
				//Детальна інформація про фільм
				$(".container").click((detailsButton) => {
					$(".details-wrapper").css({ display: "flex" });
					ShowDetails(detailsButton);
				});
			})
			.catch((error) => console.log(error));


	}
});

function ShowDetails(detailsButton) {
	let ID = $(detailsButton.currentTarget.lastElementChild).html();
	console.log(ID);

	fetch(`https://www.omdbapi.com/?apikey=4941d150&i=${ID}&plot=full`)
		.then(function (response) {
			return response.json();
		})
		.then(function (response) {
			if (response.Response == "True") {
				$(".details").html(`<div class="card" id="c${response.imdbID}">
                  <div class="card--flex">
                      <div class="card__poster">
                          <img class="card__img"src="${response.Poster}"
                              alt="" class="rounded details-img selected-poster">
                      </div>
                      <div class="card__about">
                          <h2>${response.Title}</h2>
                          <div><strong>Released: </strong>${response.Title}</div>
                          <div><strong>Director: </strong>${response.Director}</div>
                          <div><strong>Writer: </strong>${response.Writer}</div>
                          <div><strong>Actors: </strong>${response.Actors}</div>
                          <div><strong>Genre: </strong>${response.Genre}</div>
                          <div><strong>Language: </strong>${response.Language}</div>
                          <div><strong>Country: </strong>${response.Country}</div>
                          <div><strong>Rated: </strong>${response.Rated}</div>
                          <div><strong>Runtime: </strong>${response.Runtime}</div>
                          <div><strong>imdbRating: </strong>${response.imdbRating}</div>
                          <div><strong>Metascore: </strong>${response.Metascore}</div>
                          <div class="__pilot"><strong>Plot: </strong>${response.Plot}</div>
                        
                      </div>
                  </div>
              </div>`);
			} else {
			}
		});
}

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

$(".cover").click(() => {
	$(".details-wrapper").css({ display: "none" });
});
