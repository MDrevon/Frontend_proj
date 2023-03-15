console.log(`Linked`);

const $body = $(`body`);
var currentPage = 1;

$(document).ready(function () {
  $.get(`https://rickandmortyapi.com/api/character`, (data) => {
    console.log(data);
    //console.log(data.info.next);
    console.log(data.info.pages);
    createCharTiles(data.results);
    //create pagination buttons
    createPaging(data.info);
  });
});

function createCharTiles(data) {
  data.forEach((result) => {
    let $tile = $(`<div></div>`);
    let $img = $(`<img src=${result.image}></img>`);
    let $name = $(`<div></div;)`);
    //console.log(result.image);
    $img.on("click", function () {
      //alert("Character Id: " + result.id);
      getCharDetails(result.id);
    });
    $tile.append($img);
    $name.append(result.name);
    $tile.append($name);

    $body.append($tile);
  });
}

//Open up new window with info
function getCharDetails(id) {
  //console.log(username);
  let w = window.open(
    "",
    "popupWindow",
    "width=600, height=400, scrollbars=yes"
  );
  var $w = $(w.document.body);
  var charInfo;

  $.get(`https://rickandmortyapi.com/api/character/${id}`, (data) => {
    console.log(data);
    $w.append(createCharCard(data));
    //charInfo = data;
    //console.log(data.info.next);
    //createCharTiles(data.results);
  });

  $w.html(`<div></div>`);
}

function createCharCard(data) {
  let $card = $(`<div></div`);
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
  for (let x = 1; x < 43; x++) {
    let $button = $(`<button>${x}</button>`);
    $button.on("click", function () {
      let url = `https://rickandmortyapi.com/api/character?page=${x}`;
      //console.log(url);
      //alert("Clicked on button " + x);
      newPage(url);
    });
    $body.append($button);
  }
}

function newPage(url) {
  $body.empty();
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

      //$episodeInfo.append(" Name: " + data.name);
      //$w.append(createCharCard(data));
      //charInfo = data;
      //console.log(data.info.next);
      //createCharTiles(data.results);
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
