window.onload = function(){
    var request = new XMLHttpRequest();
    request.addEventListener('load', handleDogsResponse);
    request.open('GET', '/assets/data/dogs.json');
    request.send();
};

function handleDogsResponse(){
    if(this.status === 200) {
        // Success
        var dogs_array = JSON.parse(this.responseText).dogs;
        var li = buildListImageElement(dogs_array[0]);
        var dogs_list_ul = document.getElementById('dogs-list');
        dogs_list_ul.appendChild(li);
    } else {
        // Error
    }
}

function buildListImageElement(obj){
    var li = document.createElement('li');
    var img = document.createElement('img');
    img.setAttribute('src', obj.image);
    img.setAttribute('alt', 
        'An adorable doggy available for adoption, source image from ' + 
        obj.source);
    /**
     * One might be tempted to add a "title" attribute here, to allow for 
     * tooltip hovering. That's not a very good idea, and this article has a 
     * great explanation as to why:
     * https://developer.paciellogroup.com/blog/2013/01/using-the-html-title-attribute-updated/
     */
    li.appendChild(img);
    return li;
}