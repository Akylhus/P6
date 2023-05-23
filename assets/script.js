//variable & constante declaration

const openWindow = document.querySelector(".newWindow");


//functions & events

//code entry point

window.onload = function()
{


}    

//click opening
openWindow.addEventListener
("click", function()
{
    newWindow();
}
);

let i= 0;
fetch("http://localhost:5678/api/works")
    .then(reponse => reponse.json())
    .then(body => 
        {
        for (let i = 0; i < body.length; i++)
            {
            console.log(body.length);
            const figureElement = document.createElement("figure");
            const imageElement = document.createElement("img");
            imageElement.src = body[i].imageUrl;
            const divGallery = document.querySelector(".gallery");
            divGallery.appendChild(figureElement);
            figureElement.appendChild(imageElement);
            }
        })

fetch("http://localhost:5678/api/categories")
        .then(reponse => reponse.json())
        .then(body => 
        {  
            for (let i = 0; i < body.length; i++){   
                const divFilter = document.createElement("div");
                divFilter.innerText = body[i].name;
                divFilter.classList.add("filter");
                const divFilters = document.querySelector(".filters");
                divFilters.appendChild(divFilter);
            }    
        })