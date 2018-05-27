var animals = ['dog', 'cat', 'monkey', 'bear', 'dolphin', 'shark', 'fox', 'cow', 'bird', 'parrot'];

for(var i = 0; i < animals.length; i++){
    var button = $('<button class="btn btn-success animalBtn" data-name=' + animals[i] + '>');
    button.text(animals[i]);
    $('.buttonView').append(button);
    $('#buttonNameField').val("");
}
// Function to create button
function createButton(){
    var value = $('#buttonNameField').val().trim();
    if (value.length > 0) {
        var button = $('<button class="btn btn-success animalBtn" data-name=' + value + '>');
        button.text(value);
        $('.buttonView').append(button);
        $('#buttonNameField').val("");
    }
}

// Pressing enter on the name field calls createButton
$('#buttonNameField').keydown(function( event ) {
    if ( event.which == 13 ) {
        event.preventDefault();
        createButton();
    }
});

// Pressing 'Add animal' button calls create button
$('.addAnimal').on('click', createButton);

// Clicking on a button will clear current div and populate it with new images associated to that button label
$(document).on('click', '.animalBtn', function () {
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=10&q="+$(this).attr('data-name');
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        var imgObject = response.data;
        $('.gifView').empty();
        for(var i = 0; i < imgObject.length; i++){
            var card = $('<div class="card float-left">');
            var imgBox = $('<img>');
            var text = $('<div class="card-body">');
            imgBox.addClass('card-img-top');
            imgBox.addClass('animalGif');
            imgBox.attr('src', imgObject[i].images.original_still.url);
            imgBox.attr('data-state', 'still');
            imgBox.attr('data-still', imgObject[i].images.original_still.url);
            imgBox.attr('data-animate', imgObject[i].images.original.url);
            text.html('<p class="card-text text-center"> Rating: '+imgObject[i].rating+'</p>');
            card.append(imgBox);
            card.append(text);
            $('.gifView').append(card);
        }
    })
});

// Clicking image box animates or makes it a still image
$(document).on('click', '.animalGif', function(){
    var state = $(this).attr('data-state');
    if(state === 'still'){
        $(this).attr('src', $(this).attr('data-animate'));
        $(this).attr('data-state', 'animate');
    }
    else{
        $(this).attr('src', $(this).attr('data-still'));
        $(this).attr('data-state', 'still');
    }
});