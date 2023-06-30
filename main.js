//variable & constante declaration
let responseWorks; 
let works; 
let responseCategory; 
let categories; 
const modif = document.querySelector(".modif");
const modifSophie = document.querySelector(".modifSophie");
export const modal = document.querySelector(".modal");
export const modalAdd = document.querySelector(".modalAdd");
const modalValidation = document.querySelector(".modalValidation");
export const modalWrapper = document.querySelector(".modal-wrapper");
export const modalWrapper2 = document.querySelector(".modal-wrapper2");
const arrowLeft = document.querySelector(".fa-arrow-left");
let itemFilter;
let apartFilter;
let hotelFilter;
let allFilter;
const modalGallery = document.querySelector(".gallery2");
let openModal;
let openModalAdd;
const token = localStorage.getItem("token");
export const crossClose = document.querySelectorAll(".fa-xmark");
const logout = document.querySelector(".toDelogPage");
const deleteAll = document.querySelector(".deleteAll");
export const fileInput = document.getElementById("file"); 
export const imagePreview = document.getElementById("image");
const addPhotoDiv = document.querySelector(".addPhoto");  
export const children = addPhotoDiv.children;
const formElement = document.getElementById("formImage");
export const boxModal = document.querySelector(".boxModal");
const textBox = document.querySelector(".textBox");
export const inputFile = document.querySelector(".inputFile");
export const inputTitle = document.querySelector(".addTitle");
export const inputCategory = document.querySelector(".addCategory");
export const modalSend = document.getElementById("modalSend");


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
import 
{
    generateIndexImage,
    update,
    uploadImage,
    reset,
    generateModalImage,
    generateButton,
    closeByCross,
    check,
    closeOutModal
} from "./function.js";
fileInput.addEventListener("change", uploadImage);

//code entry point ----------------------------------------------------

window.onload = async function()
{
    responseWorks = await fetch("http://localhost:5678/api/works");
    works = await responseWorks.json();
    responseCategory = await fetch("http://localhost:5678/api/categories");
    categories = await responseCategory.json();
    document.querySelector(".gallery").innerHTML = "";    
    generateIndexImage(works);
    generateModalImage(works);
    generateButton(categories);
    itemFilter = document.querySelector(".filter1");
    apartFilter = document.querySelector(".filter2");
    hotelFilter = document.querySelector(".filter3");
    allFilter = document.querySelector(".filter");

//FILTER ITEM---------------------------------------------------------
itemFilter.addEventListener("click", function()
{
    const itemsfilter = works.filter(function (item)
    {
        return item.categoryId == 1;
    })
    document.querySelector(".gallery").innerHTML = "";
    generateIndexImage(itemsfilter);
});

//FILTER APART --------------------------------------------------------
apartFilter.addEventListener("click", function()
{
    const apartsfilter = works.filter(function (apart)
    {
        return apart.categoryId == 2;   
    })
    document.querySelector(".gallery").innerHTML = "";
    generateIndexImage(apartsfilter);
});

//FILTER HOTEL ---------------------------------------------------------
hotelFilter.addEventListener("click", function()
{
    const hotelsfilter = works.filter(function (hotel)
    {
        return hotel.categoryId == 3;   
    })
    document.querySelector(".gallery").innerHTML = "";
    generateIndexImage(hotelsfilter);
});

//FILTER ALL ------------------------------------------------------------
allFilter.addEventListener("click", function()
{
    document.querySelector(".gallery").innerHTML = "";
    generateIndexImage(works);
});

//OPEN MODAL ---------------------------------------------------------------    
openModal = function(e)
{
    e.preventDefault();
    modal.style.display = "flex";
    modal.removeAttribute("aria-hidden");
    modal.setAttribute("aria-modal", "true");
    document.querySelector(".modifArticle").style.display = "flex";
    closeByCross();
    closeOutModal();
}

modif.addEventListener("click", openModal);

//HOMEPAGE UPDATE ------------------------------------------------------
if(logged())
{
    document.querySelector(".edition").style.display = "flex";
    modif.style.display = "flex";
    modifSophie.style.display = "flex";
    document.querySelector(".filters").style.display = "none";
    document.querySelector(".toLogPage").style.display = "none";
    document.querySelector(".toDelogPage").style.display = "block";
}

//DISCONNECTED --------------------------------------------------------
logout.addEventListener("click", function()
{
    localStorage.clear("token");
    document.querySelector(".edition").style.display = "none";
    document.querySelector(".modif").style.display = "none";
    document.querySelector(".filters").style.display = "flex";
    document.querySelector(".toLogPage").style.display = "block";
    document.querySelector(".toDelogPage").style.display = "none";
    window.location.reload();
});

//OPEN MODALE ADD IMAGE ------------------------------------------------------
openModalAdd = function(e)
{
    e.preventDefault();
    modalAdd.style.display = "flex";
    modalAdd.removeAttribute("aria-hidden");
    modalAdd.setAttribute("aria-modal", "true");
    closeByCross();
    closeOutModal();
    inputTitle.addEventListener("input", check);
    inputCategory.addEventListener("input", check);
    inputFile.addEventListener("change", check);
    reset();
}

modalValidation.addEventListener("click", openModalAdd);

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
            generateIndexImage(works);        
            generateModalImage(works);
        }
        else
        {
            alert("Erreur lors de la suppression");
        }
    }
});

//DELETE ALL IMAGES -----------------------------------------------------------------
deleteAll.addEventListener("click", async function()
{
    const figures = modalGallery.querySelectorAll("figure");
    figures.forEach(async function(figure)
    {
        const dataId = figure.dataset.id;
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
            generateIndexImage(works);        
            generateModalImage(works);
        }
        else
        {
            alert("Erreur lors de la suppression");
        }
    });
});

//MODAL 2 to MODAL 1 ----------------------------------------------------------
arrowLeft.addEventListener("click", function()
{
    modalAdd.style.display = "none";
    Array.from(children).forEach(function(child)
    {
        child.style.display = "flex";
        fileInput.style.display = "none";
        boxModal.style.display = "none";
    });
});

//ADD IMAGE -------------------------------------------------------------------
formElement.addEventListener("submit", async function (event)
{
    event.preventDefault();
    let formData = new FormData();
    let image = fileInput.files[0];
    let title = document.querySelector(".addTitle").value;
    let category = document.querySelector(".addCategory").value;
    formData.append("image", image);
    formData.append("title", title);
    formData.append("category", category);
    const response = await fetch("http://localhost:5678/api/works", 
    {
        method: "POST",
        body: formData,
        headers: 
        {
            "Accept": "multipart/form-data",
            "Authorization": `Bearer ${token}`,
        }
    })
    if(response.ok)
    {
        update(works);
        boxModal.style.display = "flex";
        boxModal.style.background = "#b2ff89";
        textBox.innerHTML = "Image ajouté avec succès.";
    }else
    {
        boxModal.style.display = "flex";
        boxModal.style.background = "#ff8989";
        textBox.innerHTML = "Erreur. Veuillez réessayer."
    }    
});

}

