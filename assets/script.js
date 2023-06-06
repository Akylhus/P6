//variable & constante declaration
let i= 0;
const responseWorks = await fetch("http://localhost:5678/api/works");
const works = await responseWorks.json();
const responseCategory = await fetch("http://localhost:5678/api/categories");
const categories = await responseCategory.json();
const openModal = document.querySelector(".modif");
const modal = document.querySelector(".modal");
const modalWrapper = document.querySelector(".modal-wrapper");

 
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

window.onload = function()
{
}
document.querySelector(".gallery").innerHTML = "";    
generateImage(works);
generateButton(categories);

// FILTER ITEMS-----------------------------------------------------------
const itemFilter = document.querySelector(".filter1");
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
const apartFilter = document.querySelector(".filter2");
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
const hotelFilter = document.querySelector(".filter3");
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
const allFilter = document.querySelector(".filter");
allFilter.addEventListener
(
"click", function()
    {
        document.querySelector(".gallery").innerHTML = "";
        generateImage(works);
    }
);

//OPEN MODAL
openModal.addEventListener
(
    "click", function()
    {
        modal.style.display = "flex";
        modalWrapper.style.display = "block";
        modalWrapper.classList.add("gallery");
        modalWrapper.classList.add("gallery2");
        generateImage(works);
        modal.addEventListener
        (
            "click", function()
            {
                modal.style.display = "none";
                modalWrapper.style.display = "none";
            }
        )
    }
)
