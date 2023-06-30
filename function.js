//CONST & VAR NEEDED---------------------------------------------------
import 
{
    crossClose, 
    modalWrapper, 
    modalWrapper2, 
    modal,
    modalAdd, 
    fileInput, 
    children, 
    inputCategory,
    inputTitle,
    inputFile,
    imagePreview,
    modalSend,
    boxModal
} from "./main.js";

//FUNCTION TO GENERATE IMAGES ON THE INDEX PAGE----------------------------
export function generateIndexImage(works)
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

//FUNCTION TO UPDATE GALLERY---------------------------------------------
export async function update(works)
{
    const updatedResponse = await fetch("http://localhost:5678/api/works");
    const updatedWorks = await updatedResponse.json();
    works = updatedWorks;
    document.querySelector(".gallery").innerHTML = "";    
    document.querySelector(".gallery2").innerHTML = "";    
    generateIndexImage(works);        
    generateModalImage(works);
}

//FUNCTION TO UPLOAD IMAGES ON THE MODAL-------------------------------------
export function uploadImage() {
    if (fileInput.files && fileInput.files[0]) 
    {
        const reader = new FileReader();
        reader.onload = function(e) {
        imagePreview.src = e.target.result;
        };
        reader.readAsDataURL(fileInput.files[0]);
        Array.from(children).forEach(function(child)
        {
            child.style.display = "none";
            imagePreview.style.display = "flex";
            inputFile.classList.add("imageOk");
        })

    }
  }

//FUNCTION TO GENERATE MODAL GALERRY--------------------------------------
export function generateModalImage(works)
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
        if(works[i].id === 1)
        {
            const divIconeDirection = document.createElement("div");
            divIconeDirection.classList.add("divDirection");
            const imageDirection = document.createElement("i");
            imageDirection.classList.add("fa-solid");
            imageDirection.classList.add("fa-arrows-up-down-left-right");
            figureElement.appendChild(divIconeDirection);
            divIconeDirection.appendChild(imageDirection);        
        }
    }
}    

//FUNCTION TO GENRATE BUTTON TO FILTER IMAGES-----------------------------------
export function generateButton(categories)
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

//FUNCTION TO CLOSE MODAL BY CROSS---------------------------------------------
export function closeByCross()
{
    crossClose.forEach(function (trigger)
    { 
        trigger.addEventListener("click", function(e)
        {
            if (modal === null) return
            e.preventDefault();
            modal.style.display = "none";
            modal.setAttribute("aria-hidden", "true");
            modal.removeAttribute("aria-modal");
            modalAdd.style.display = "none";
            modalAdd.setAttribute("aria-hidden", "true");
            modalAdd.removeAttribute("aria-modal");
            boxModal.style.display = "none";
            Array.from(children).forEach(function(child)
            {
                child.style.display = "flex";
                imagePreview.src = "#";
                fileInput.style.display = "none";
            })
        }
        )
    });
}

//FUNCTION TO CLOSE MODAL BY CLICK OUT-------------------------------------------
export function closeOutModal() 
{
    document.addEventListener("click", function(e) 
    {
        const target = e.target;
        if (modalWrapper.contains(target) || modalWrapper2.contains(target)) return;
        if (modal.contains(target) || modalAdd.contains(target)) 
        {
            modal.style.display = "none";
            modal.setAttribute("aria-hidden", "true");
            modal.removeAttribute("aria-modal");
            modalAdd.style.display = "none";
            modalAdd.setAttribute("aria-hidden", "true");
            modalAdd.removeAttribute("aria-modal");
            boxModal.style.display = "none";
            Array.from(children).forEach(function (child)
            {
                child.style.display = "flex";
                imagePreview.src = "#";
                fileInput.style.display = "none";
            })    
        }
    });
}

//FUNCTION TO CHECK INPUTS--------------------------------------------------

export function check(){
    const imageOk = document.querySelector(".imageOk");
    if(inputCategory.value !== "" && inputTitle.value !== "" && imageOk){
        modalSend.style.background = "blue";
    }else{
        modalSend.style.background = "gray";
    }
}

export function reset(){
    fileInput.type = "text";
    fileInput.type = "file";
    inputTitle.value = "";
    inputCategory.value = "";
    imagePreview.src = "#";
    inputFile.classList.remove("imageOk");
    modalSend.style.background = "gray";
}