//Declare a variable and assign a value
// like var name = "your name";
var adjectives = ['an exciting','a playful','an adventurous','an inspired','a relaxing'];
var colors = ['green', 'purple', 'red', 'orange', 'blue'];

$('#yourButton').on('click', yourFunction);

function yourFunction()
{
    //use your variable somewhere inside this function
    var index = Math.floor(5 - (Math.random() * 5));
    var indexAdjectives = Math.floor(adjectives.length * Math.random());
    var indexColors = Math.floor(colors.length * Math.random());
    // if (index >= 4){
    //   return index = 4;
    // } else if (index >= 3){
    //   return index = 3;
    // } else if (index >= 2){
    //   return index = 2;
    // } else if (index >= 1){
    //   return index = 1;
    // } else {
    //   return index = 0;
    // }
    $('#adjective').html(adjectives[indexAdjectives]);
    $('#adjective').css( 'color', colors[indexColors] );
    $('#result').fadeIn();
    console.log(index);

    //Do something cool!
}

$('#closeButton').on('click', closeFunction);

function closeFunction()
{
    $('#result').fadeOut();
}
