window.onload = function(){
    var request = new XMLHttpRequest();
    request.addEventListener("load", handleDogsResponse);
    request.open("GET", "/assets/data/dogs.json");
    request.send();
};

function handleDogsResponse(){
    if(this.status === 200) {
        // Success
        var dogs_array = JSON.parse(this.responseText);
    } else {
        // Error
    }
}