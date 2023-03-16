//console.log(`Linked`);

const $body = $(`body`);
const $container = $(".container");
const $modal = $(".modal");
const $search = $("#search");

$(document).ready(function () {
  $.get(`https://rickandmortyapi.com/api/character`, (data) => {
    createCharTiles(data.results);
    createPaging(data.info);
  });
});

$search.on("click", function () {
  var charName = $("#searchText").val();
  $.get(
    `https://rickandmortyapi.com/api/character/?name=${charName}`,
    (data) => {
      //console.log(data);
      $("#searchText").val("");
      $container.empty();
      createCharTiles(data.results);
      createPaging(data.info);
    }
  );
  //console.log(charName);
});

function createCharTiles(data) {
  var x = 0;
  var $tile = $(
    `<div class="columns notification is-primary is-multiline" ></div>`
  );
  //console.log(data[x]);
  data.forEach((result) => {
    //console.log(x);
    let $column = $(
      `<div class="column notification is-info is-3" margin ></div>`
    );
    let $figure = $(`<figure class="image is-128x128"</figure>`);
    let $img = $(`<img class="is-rounded" src=${result.image}></img>`);
    let $name = $(`<div></div>`);
    //console.log(result.image);
    $img.on("click", function () {
      //alert("Character Id: " + result.id);
      getCharDetails(result.id);
    });
    $figure.append($img);
    $column.append($figure);
    $name.append(result.name);
    $column.append($name);

    $tile.append($column);
    x++;
  });
  $container.append($tile);
}

//Open up new window with info
function getCharDetails(id) {
  $modal.empty();
  let $modalBG = $(`<div class="modal-background "></div>`);
  let $modalContent = $(
    `<div class="modal-content has-background-white"></div>`
  );

  $.get(`https://rickandmortyapi.com/api/character/${id}`, (data) => {
    //console.log(data);
    //$w.append(createCharCard(data));
    $modalContent.append(createCharCard(data));
    $modalBG.append($modalContent);
    $modal.append($modalBG);
    $modal.addClass("is-active");
    $modal.on("click", function () {
      $modal.removeClass("is-active");
    });
  });
}

function createCharCard(data) {
  let $card = $(`<div ></div`);
  let $img = $(`<img src=${data.image}></img>`);
  let $name = $(`<div></div>`);
  let $status = $(`<div></div>`);
  let $gender = $(`<div></div>`);
  let $species = $(`<div></div>`);

  $name.append(data.name);
  $status.append("Status: " + data.status);
  $gender.append("Gender: " + data.gender);
  $species.append("Species: " + data.species);

  $card.append($name);
  $card.append($status);
  $card.append($gender);
  $card.append($species);
  if (data.type !== "") {
    let $type = $(`<div></div>`);
    $type.append("Type: " + data.type);
    $card.append($type);
  }

  //console.log(data.episode);
  $card.append(getEpisodeInfo(data.episode));

  $card.append($img);
  return $card;
}

function createPaging(data) {
  let $nav = $(
    `<nav class="pagination" role="navigation" aria-label="pagination"></nav>`
  );
  //console.log(data);
  let $prev = $(
    `<a class="pagination-link" aria-label="Previous">Previous</a>`
  );
  if (data.prev === null) {
    $prev.addClass("is-disabled");
  } else {
    $prev.on("click", function () {
      let url = data.prev;
      newPage(url);
    });
  }
  let $next = $(`<a class="pagination-link" aria-label="Next">Next</a>`);
  if (data.next === null) {
    $next.addClass("is-disabled");
  } else {
    $next.on("click", function () {
      let url = data.next;
      newPage(url);
    });
  }
  $nav.append($prev);
  $nav.append($next);

  $container.append($nav);
}

function newPage(url) {
  $container.empty();
  $.get(url, (data) => {
    console.log(data);
    //console.log(data.info.next);
    console.log(data.info.pages);
    createCharTiles(data.results);
    //create pagination buttons
    createPaging(data.info);
  });
  console.log(url);
}

function getEpisodeInfo(episode) {
  console.log(episode);
  let $episodeInfo = $(`<div></div`);
  //console.log(episode.episode);
  console.log(episode.length);

  if (episode.length === 1) {
    $.get(episode, (data) => {
      console.log(data);

      console.log(data.episode.length);
      $episodeInfo.append(data.episode + " " + data.name);
    });
  } else {
    for (let x = 0; x < episode.length; x++) {
      console.log("Episode");
      console.log(episode[x]);
      $.get(episode[x], (data) => {
        console.log(data);

        //console.log(data.episode.length);
        $episodeInfo.append(data.episode + " " + data.name + "\n");

        //$episodeInfo.append(" Name: " + data.name);
        //$w.append(createCharCard(data));
        //charInfo = data;
        //console.log(data.info.next);
        //createCharTiles(data.results);
      });
    }
  }

  return $episodeInfo;
}
