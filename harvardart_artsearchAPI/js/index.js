//1. Use a public API
//2. Update the DOM based on the response from the API
$(function(){
  function searchByTerm(){
    $('#response').html('');
    var terms= $('#term').val();
    if(terms){
      var apiEndpointBaseURL = "https://api.harvardartmuseums.org/object";
      var queryString = $.param({
          "apikey": "b50d0cd0-8df7-11e8-9ecd-591ef0e21a9a",
          "keyword": terms,
          "size":9,
          "hasimage":1,
          "classification": "Paintings",
          "accesslevel":1,
          "imagepermissionlevel":0
      });
      $.get(apiEndpointBaseURL + "?" + queryString, function(response) {
        var records = response["records"];

        for(index in records){
          var current = records[index];
          var template = ``;
          var imageURL = current.primaryimageurl;
          var period = current.dated;
          var medium = current.medium;
          var title = current.title;
          console.log(imageURL);
          if( imageURL == null ) continue;

          template =
          `<div class='col-sm-4'>
          <div class='card mb-3'>
          <img class='card-img-top' alt='search image' src='` + imageURL + `?height=200'>
          <div class='card-body'>
          <h5 class="card-title">` + ( title || '' ) + `</h5>
          <h6>` + ( period || '' ) + `</h6>
          <p>` + ( medium || '' ) + `</p>
          </div>
          </div>
          </div>`;

            $('#response').append(template);
          }

      });
    }
  }

  $('#submit').on('click', function(){
    searchByTerm();
  });

  $('#form').on('submit', function(event){
    event.preventDefault();
    searchByTerm();
  });

});
