console.log(`Linked`);

const $body = $(`body`);

$(document).ready(function () {
  $.get(`https://rickandmortyapi.com/api/character`, (data) => {
    console.log(data);
    //console.log(data.info.next);
    createCharTiles(data.results);
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
  let $table = $(`<table></table>`);
  let $tr = $(`<tr></tr>`);
  let $td = $(`<td></td>`);
  $card.append($img);
  return $card;
}
