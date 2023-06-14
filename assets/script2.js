//variable & constante declaration
let i= 0;
// const responseWorks = await fetch("http://localhost:5678/api/works");
// const works = await responseWorks.json();
// const responseCategory = await fetch("http://localhost:5678/api/categories");
// const categories = await responseCategory.json();
let responseWorks;
let works;
let responseCategory;
let categories;
const modif = document.querySelector(".modif");
const modal = document.querySelector(".modal");
const modalWrapper = document.querySelector(".modal-wrapper");
const itemFilter = document.querySelector(".filter1");
const apartFilter = document.querySelector(".filter2");
const hotelFilter = document.querySelector(".filter3");
const allFilter = document.querySelector(".filter");

//functions & events
function generateImage(works)
{
    for(let i = 0; i < works.length; i++)
    {
            const figureElement = document.createElement("figure");
            const imageElement = document.createElement("img");
            imageElement.src = works[i].imageUrl;
            imageElement.alt = works[i].title;
            const figcaptionElement = document.createElement("figcaption");
            figcaptionElement.innerText = works[i].title;
            const divGallery = document.querySelector(".gallery");
            divGallery.appendChild(figureElement);
            figureElement.appendChild(imageElement);
            figureElement.appendChild(figcaptionElement);
        }
}    

// FILTER BUTTON----------------------------------------------------------       
function generateButton(categories)
{
    for (let i = 0; i < categories.length; i++)
    {   
        const divFilter = document.createElement("div");
        divFilter.innerText = categories[i].name;
        divFilter.classList.add("filter");
        divFilter.classList.add("filter"+categories[i].id);
        const divFilters = document.querySelector(".filters");
        divFilters.appendChild(divFilter);
    }    
}


//code entry point

window.onload = async function()
{
     responseWorks = await fetch("http://localhost:5678/api/works");
     works = await responseWorks.json();
     responseCategory = await fetch("http://localhost:5678/api/categories");
     categories = await responseCategory.json();
     document.querySelector(".gallery").innerHTML = "";    
     generateImage(works);
     generateButton(categories);
}

// FILTER ITEMS-----------------------------------------------------------
itemFilter.addEventListener
(
"click", function()
    {
        const itemsfilter = works.filter(function (item)
        {
            return item.categoryId == 1;   
        })
        document.querySelector(".gallery").innerHTML = "";
        generateImage(itemsfilter);
    }
);

// FILTER APARTS-----------------------------------------------------------
apartFilter.addEventListener
(
"click", function()
    {
        const apartsfilter = works.filter(function (apart)
        {
            return apart.categoryId == 2;   
        })
        document.querySelector(".gallery").innerHTML = "";
        generateImage(apartsfilter);
    }
);

// FILTER HOTELS-----------------------------------------------------------
hotelFilter.addEventListener
(
"click", function()
    {
        const hotelsfilter = works.filter(function (hotel)
        {
            return hotel.categoryId == 3;   
        })
        document.querySelector(".gallery").innerHTML = "";
        generateImage(hotelsfilter);
    }
);

//FILTER ALL
allFilter.addEventListener
(
    "click", function()
    {
        document.querySelector(".gallery").innerHTML = "";
        generateImage(works);
    }
    );
    

//OPEN MODAL
const modalGallery = document.querySelector(".gallery2");
const openModal = function(e)
{
    e.preventDefault();
    modal.style.display = "flex";
    modal.removeAttribute("aria-hidden");
    modal.setAttribute("aria-modal", "true");
    modalGallery.classList.add("gallery");
    generateImage(works);
    modal.addEventListener("click", closeModal);
}

const closeModal = function (e)
{
    if (modal === null) return
    e.preventDefault();
    document.querySelector(".gallery").innerHTML = "";
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
    modal.removeEventListener("click", closeModal);
}

modif.addEventListener("click", openModal);
