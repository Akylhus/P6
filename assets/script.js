//variable & constante declaration
let i= 0;
const itemFilter = document.querySelector(".newWindow");

//functions & events

//code entry point

window.onload = function()
{
document.querySelector(".gallery").innerHTML = "";
//FILTER BUTTON----------------------------------------------------------        
fetch("http://localhost:5678/api/categories")
        .then(reponse => reponse.json())
        .then(body => 
        {  
            for (let i = 0; i < body.length; i++){   
                const divFilter = document.createElement("div");
                divFilter.innerText = body[i].name;
                divFilter.classList.add("filter");
                divFilter.classList.add("filter"+body[i].id);
                const divFilters = document.querySelector(".filters");
                divFilters.appendChild(divFilter);
            }    
        })

//IMAGE CREATION--------------------------------------------------------

function generateImage ()
{
fetch("http://localhost:5678/api/works")
    .then(reponse => reponse.json())
    .then(body => 
        {
        for (let i = 0; i < body.length; i++)
            {
            const figureElement = document.createElement("figure");
            const imageElement = document.createElement("img");
            imageElement.src = body[i].imageUrl;
            imageElement.alt = body[i].title;
            const figcaptionElement = document.createElement("figcaption");
            figcaptionElement.innerText = body[i].title;
            const divGallery = document.querySelector(".gallery");
            divGallery.appendChild(figureElement);
            figureElement.appendChild(imageElement);
            figureElement.appendChild(figcaptionElement);
            }
        })

}    
generateImage();
}

// FILTER ITEMS-----------------------------------------------------------

fetch("http://localhost:5678/api/works")
    .then(reponse => reponse.json())
    .then(body => 
        {
        itemFilter.addEventListener
        (
        "click", function()
            {
                const objetsFiltres = body[1].categoryId;
                return body.categoryId;
            });
            document.querySelector(".gallery").innerHTML = "";
                generateImage(objetsFiltres);
            }
        );
   
