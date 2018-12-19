window.onload = function(){
    var request = new XMLHttpRequest();
    request.addEventListener('load', handleDogsResponse);
    // Fairly straightforward to swap this to another API down the line, not
    // so straightfoward to implement pagination but could be shoehorned in.
    request.open('GET', '/assets/data/dogs.json');
    request.send();
};

function handleDogsResponse(){
    if(this.status === 200) {
        // Success
        var dogs_array = JSON.parse(this.responseText).dogs;
        var dogs_list_div = document.getElementById('dogs-list');
        dogs_list_div.appendChild(buildUl(dogs_array));
        // This function gets invoked on pageload... when we haven't
        // built out our doggie list yet.
        // So, invoke again. 
        window.WAMediaBox.bindAll(dogs_list_div);
    } else {
        document.getElementById('dogs-list')
            .appendChild(
                document.createTextNode('There was an error fetching dogs :( ')
            );
    }
}

function buildListImageElement(obj){
    var li = document.createElement('li');
    var img = document.createElement('img');
    var a = document.createElement('a');

    // <a> tag stuff required for wa-mediabox
    a.setAttribute('href', obj.image);
    a.setAttribute('data-mediabox', 'doggies');
    a.setAttribute('data-title', 'This handsome puppy is available for adoption now!');

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
    a.appendChild(img);
    li.appendChild(a);
    return li;
}

function buildUl(arr){
    var ul = document.createElement('ul');
    for(var i = 0; i < arr.length; i++){
        ul.appendChild(buildListImageElement(arr[i]));
    }
    return ul;
}