//variable & constante declaration
// const responseUsers = await fetch("http://localhost:5678/api/users/login");
// const users = await responseUsers.json();

//functions & events
function emptyLogin()
{
    const loginEmail = document.getElementById("email").value;
    const mdp = document.getElementById("mdp").value; 
    if(loginEmail == "")
    {
        alert("identifiants ou mot de passe incorrect !");
        return false;
    }
    else if(mdp == "")
    {
        alert("identifiants ou mot de passe incorrect !");
        return false;
    }    
    else
    {
        console.log(loginEmail, mdp);
        // window.location.href="./index.html";        
    }
}

//code entry point
const validation = document.querySelector(".validation");
validation.addEventListener("click", function(event)
{
    event.preventDefault();
    emptyLogin();
}
)
