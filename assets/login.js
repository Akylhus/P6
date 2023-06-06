//variable & constante declaration
let errorBox = document.querySelector(".errorBox");
const validation = document.querySelector(".validation");
//functions & events

//Fonction d'authentification
async function login(email, password)
{
        const responseUsers = await fetch("http://localhost:5678/api/users/login", 
        {
            method: "POST",
            headers: {"Content-Type": "application/json"  },
            body: JSON.stringify({email, password})
        });
        if(responseUsers.ok)
        {
            const token = await responseUsers.json;
            localStorage.setItem("token", token);
            window.location.href="./index.html";        
        }
        else
        {
            errorBox.style.display = "block";
        }
}

//code entry point

//Evenement à l'envoi du formulaire
validation.addEventListener("click", function(event)
{
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value; 
    login(email, password);
}
)
