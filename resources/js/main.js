var KindleUp = {};
var API_KEY = 'pZllHOn0wv6CcJj03AgKEQ';
var secret = 'MwyWN1NSqEdFsYa2ueR2ZMEmZ5zmzI5Oijdamf0TiM';
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
    url:url + API_KEY + '&q=' + searchText + '&format=json',
    datatype:'jsonp',
    success: function(result) {
      console.log(result);
    }
  });
}
