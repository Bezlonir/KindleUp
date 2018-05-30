var KindleUp = {};
var API_KEY = 'pZllHOn0wv6CcJj03AgKEQ';
var secret = 'MwyWN1NSqEdFsYa2ueR2ZMEmZ5zmzI5Oijdamf0TiM';
var corsHead = "https://cors-anywhere.herokuapp.com/"
var url = "https://www.goodreads.com/search/index.xml?key=";


// runtime
$(document).ready(function() {
  $("#search-button").click(function(){
    var searchText = $("#search-input").val();
    if (searchText) {
      KindleUp.searchBooks(searchText);
    }
  });
  //simulate a search button keypress when enter is pressed on the keyboard in the input box
  $("#search-input").keypress(function(e){
    if(e.which === 13){
      $("#search-button").click();
    }
  });
});

KindleUp.searchBooks = function(searchText) {
  $.ajax({
    url: corsHead + url + API_KEY + '&q=' + searchText + '&format=json',
    datatype:'jsonp',

    success: function(result) {
      var jsonResult = xmlToJson(result);
      KindleUp.renderResult(jsonResult);
    }
  });
}

KindleUp.renderResult = function(result) {
  $('#search-results-container').empty();
  console.log(result.GoodreadsResponse);
  var bookListProto = [... result.GoodreadsResponse.search.results.work];
  bookListProto.forEach(function(bookProto) {
    console.log(bookProto);
    var bookName = bookProto.best_book.title['#text'];
    var bookAuthor = bookProto.best_book.author.name['#text'];
    var bookImg = bookProto.best_book.small_image_url['#text'];
    var bookHTML = '<div class="row">' +
        '<div class="container-fluid">' +
          '<div class="col-xs-8 col-xs-offset-1 search-result">' +
            '<div class="image-container">' +
              `<img class="book-img" src="${bookImg}"/>` +
            '</div>'+
            `<p class="book-title">${bookName}</p>` +
          '</div>' +
        '</div>' +
    '</div>';

    $('#search-results-container').append(bookHTML);
  });
}

// Changes XML to JSON
function xmlToJson(xml) {

	// Create the return object
	var obj = {};

	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
};
