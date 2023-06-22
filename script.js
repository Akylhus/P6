//variable & constante declaration
let i= 0;
let responseWorks; 
let works; 
let responseCategory; 
let categories; 
const modif = document.querySelector(".modif");
const modal = document.querySelector(".modal");
const modal2 = document.querySelector(".modal2");
const modalValidation = document.querySelector(".modalValidation");
const modalWrapper = document.querySelector(".modal-wrapper");
const modalWrapper2 = document.querySelector(".modal-wrapper2");
const arrowLeft = document.querySelector(".fa-arrow-left");
let itemFilter;
let apartFilter;
let hotelFilter;
let allFilter;
const modalGallery = document.querySelector(".gallery2");
let openModal;
let openModal2;
const token = localStorage.getItem("token");
const crossClose = document.querySelectorAll(".fa-xmark");
const logo = document.querySelector(".logo");
const logout = document.querySelector(".toDelogPage");
const deleteAll = document.querySelector(".deleteAll");
const logged = function ()
{
    if(token)
    {
        return true;
    }else
    {
        return false;
    }
}

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

//ADD IMAGE ---------------------------------------------------------------------
function uploadImage() {
    const fileSelected = document.getElementById("file");
    const imagePreview = document.getElementById("image");
  
    if (fileSelected.files && fileSelected.files[0]) {
      const reader = new FileReader();
  
      reader.onload = function(e) {
        imagePreview.src = e.target.result;
      };
  
      reader.readAsDataURL(fileSelected.files[0]);
    }
  }

const fileInput = document.getElementById("file"); 
fileInput.addEventListener("change", uploadImage);

//GENERATE MODALE IMAGE --------------------------------------------------
function generateImage2(works)
{
    for(let i = 0; i < works.length; i++)
    {
        const figureElement = document.createElement("figure");
        const imageElement = document.createElement("img");
        imageElement.src = works[i].imageUrl;
        imageElement.alt = works[i].title;
        const divTrash = document.createElement("div");
        divTrash.classList.add("trash");
        const imageTrash = document.createElement("i");
        imageTrash.classList.add("fa-regular");
        imageTrash.classList.add("fa-trash-can");
        const figcaptionElement = document.createElement("figcaption");
        figcaptionElement.innerText = "éditer";
        const divGallery = document.querySelector(".gallery2");
        divGallery.appendChild(figureElement);
        figureElement.appendChild(imageElement);
        figureElement.appendChild(figcaptionElement);
        figureElement.appendChild(divTrash);
        figureElement.dataset.id = works[i].id;
        divTrash.appendChild(imageTrash);
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

//CLOSE MODAL ---------------------------------------------------------------
function closeByCross()
{
crossClose.forEach(trigger => trigger.addEventListener("click", function (e)
{
    if (modal === null) return
    e.preventDefault();
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
    modal2.style.display = "none";
    modal2.setAttribute("aria-hidden", "true");
    modal2.removeAttribute("aria-modal");
}
));
}

//code entry point ----------------------------------------------------

window.onload = async function()
{
    responseWorks = await fetch("http://localhost:5678/api/works");
    works = await responseWorks.json();
    responseCategory = await fetch("http://localhost:5678/api/categories");
    categories = await responseCategory.json();
    document.querySelector(".gallery").innerHTML = "";    
    generateImage(works);
    generateImage2(works);
    generateButton(categories);
    itemFilter = document.querySelector(".filter1");
    apartFilter = document.querySelector(".filter2");
    hotelFilter = document.querySelector(".filter3");
    allFilter = document.querySelector(".filter");

//FILTER ITEM---------------------------------------------------------
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

//FILTER APART --------------------------------------------------------
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

//FILTER HOTEL ---------------------------------------------------------
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

//FILTER ALL ------------------------------------------------------------
allFilter.addEventListener
(
    "click", function()
    {
        document.querySelector(".gallery").innerHTML = "";
        generateImage(works);
    }
    );

//OPEN MODAL ---------------------------------------------------------------    
openModal = function(e)
{
    e.preventDefault();
    modal.style.display = "flex";
    modal.removeAttribute("aria-hidden");
    modal.setAttribute("aria-modal", "true");
    closeByCross();
}

modif.addEventListener("click", openModal);

//HOMEPAGE UPDATE ------------------------------------------------------
if(logged())
{
    document.querySelector(".edition").style.display = "flex";
    document.querySelector(".modif").style.display = "flex";
    document.querySelector(".filters").style.display = "none";
    document.querySelector(".toLogPage").style.display = "none";
    document.querySelector(".toDelogPage").style.display = "block";
}

//DISCONNECTED --------------------------------------------------------
logout.addEventListener
(
    "click", function()
{
    localStorage.clear("token");
    document.querySelector(".edition").style.display = "none";
    document.querySelector(".modif").style.display = "none";
    document.querySelector(".filters").style.display = "flex";
    document.querySelector(".toLogPage").style.display = "block";
    document.querySelector(".toDelogPage").style.display = "none";
    window.location.reload();
}
);

//OPEN MODALE 2 ------------------------------------------------------
openModal2 = function(e)
{
    e.preventDefault();
    modal2.style.display = "flex";
    modal2.removeAttribute("aria-hidden");
    modal2.setAttribute("aria-modal", "true");
    closeByCross();
}

modalValidation.addEventListener("click", openModal2);

//DELETE SELECTED IMAGE ------------------------------------------------------------
modalGallery.addEventListener("click", async function(event)
{
    if(event.target.classList.contains("fa-trash-can"))
    {
        const figure = event.target.closest("figure");
        const worksId = figure.dataset.id;
        const responseDelete = await fetch(`http://localhost:5678/api/works/${worksId}`,
        {
            method: "DELETE",
            headers: {"Authorization": `Bearer ${token}`}
        });
        if(responseDelete.ok)
        {
            const updatedResponse = await fetch("http://localhost:5678/api/works");
            const updatedWorks = await updatedResponse.json();
            works = updatedWorks;
            document.querySelector(".gallery").innerHTML = "";    
            document.querySelector(".gallery2").innerHTML = "";    
            generateImage(works);        
            generateImage2(works);
        }
        else
        {
            alert("Erreur lors de la suppression");
        }

    }
})

//DELETE ALL IMAGES -----------------------------------------------------------------
deleteAll.addEventListener("click", async function()
{
    const figures = modalGallery.querySelectorAll("figure");
    figures.forEach(async function(figure)
    {
        const dataId = figure.dataset.id;
        console.log(dataId);
        const responseDelete = await fetch(`http://localhost:5678/api/works/${dataId}`,
        {
            method: "DELETE",
            headers: {"Authorization": `Bearer ${token}`}
        });
        if(responseDelete.ok)
        {
            const updatedResponse = await fetch("http://localhost:5678/api/works");
            const updatedWorks = await updatedResponse.json();
            works = updatedWorks;
            document.querySelector(".gallery").innerHTML = "";    
            document.querySelector(".gallery2").innerHTML = "";    
            generateImage(works);        
            generateImage2(works);
        }
        else
        {
            alert("Erreur lors de la suppression");
        }
    })
})

//MODAL 2 to MODAL 1 ----------------------------------------------------------
arrowLeft.addEventListener("click", function()
{
    modal2.style.display = "none";
})

}


