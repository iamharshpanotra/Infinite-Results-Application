const imgCont = document.querySelector("#image-cont");
const loader = document.querySelector("#loader");
let photoArray = [];
let ready = false;
let imgs=0;
let totalImg=0;
let form = document.querySelector('form');
// unsplash api

let count = 1;
const perPage = 84;
const perLoad = 8;
let query = '';
const apiKey = `GcDvkttRs2WE0WvMBf3oRc2rQ7W-Uuv6mDfolAwANeQ`;
let apiUrl = ``;

// update url

updateUrl=()=>{
    apiUrl = `https://api.unsplash.com/search/photos?client_id=${apiKey}&${query}&page=${count}&per_page=${perPage}`;
}

// check img loaded

imgLoaded=()=>{
    imgs++;
    if(imgs==totalImg){
    ready = true;
    loader.hidden = true;
    }
};

// helper

setAttributes=(element,attribute)=>{
    for(let key in attribute){
        element.setAttribute(key,attribute[key]);
    }
}

// create imgs , links

displayPhotos=()=>{
    totalImg+=perLoad;
    for(let i=0;i<perLoad;i++){
        try{
        let p=photoArray[0];
        photoArray.shift();
        const item = document.createElement('a');
        setAttributes(item,{
            href:p.links.html,
            target:'_blank'
        });
        const img = document.createElement('img');
        setAttributes(img,{
            src:p.urls.raw+'&fit=fill&fill=blur&w=300&h=300',
            alt:p.alt_description,
            title:p.alt_description,
        });
        img.addEventListener('load',imgLoaded);
        item.appendChild(img);
        imgCont.appendChild(item);
    } catch(e){
        i--;
        continue;
    }
    };
}

// get photos 

async function getPhotos(){
    updateUrl();
    try{
        const response = await fetch(apiUrl);
        let pArray = await response.json();
        photoArray= pArray.results;
        displayPhotos();
    } catch(e){
        alert(e);
    }
}

// form , get query
if(window.location.search){
    query = window.location.search.split('?')[1]|| '';
    getPhotos(); 
}


// check scroll

window.addEventListener('scroll',()=>{
    if(window.innerHeight + window.scrollY>=document.body.offsetHeight-1000 && ready){
        ready=false;
        if(photoArray.length>=perLoad){
            displayPhotos();
        } else{
            count++;
            getPhotos();
        }
    } 
});

// getPhotos();
