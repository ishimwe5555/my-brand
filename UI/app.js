(function () {
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function() {
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");
        })
    });
     document.querySelector(".theme-btn").addEventListener("click", () => {
         document.body.classList.toggle("light-mode");
     })
 })();
//--LOCAL STORAGE--
// --Retrieving Logged in User--
// ****SIGN-UP***
// Add an event listener to the document to listen for when a request is made
document.addEventListener("readystatechange", function(event) {
  if (event.target.readyState === "loading") {
    showLoading();
  } else if (event.target.readyState === "complete") {
    hideLoading();
  }
});


var form = document
   .getElementById("signup-btn")
   .addEventListener("click", async (e) => {
     e.preventDefault();  
     var signupMessage = document.getElementById("errors-success-signup");

     const user = {
     //names: document.getElementById("names").value,
     email: document.getElementById("email").value,
     username: document.getElementById("username").value,
     password: document.getElementById("password").value,
    };
    showLoading()
    const response = await fetch('https://my-portfolio-production-2587.up.railway.app/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(user)
    });
    hideLoading()
    const result = await response.json();
    console.log(result.code);
    if(!result.code===409)
    {
      signupMessage.innerHTML =
               '<div id="errors" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: #000; display: flex; justify-content: center; align-items: center; background-color: #191; border-radius: 3px; border: 1px solid #1eb136;; >' +
               '<p style="width: 100%; margin:0; padding: 0; text-align: center;"> Email/Username is already registered</p> </div>'; 
         clearForm();  
    }
    if(result.code===201){
      signupMessage.innerHTML =
           '<div id="errors" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: #000; display: flex; justify-content: center; align-items: center; background-color: #191; border-radius: 3px; border: 1px solid #1eb136;; >' +
           '<p style="width: 100%; margin:0; padding: 0; text-align: center;"> User registered successfully! </p> </div>';
         clearForm();  
          }
    })


// ****LOG-IN***

var form = document
   .getElementById("loginBtn")
   .addEventListener("click", async (e) => {
     e.preventDefault();  
    var loginMessage = document.getElementById("errors-success-login");
     const credentials = {
      email: document.getElementById("usernameLogin").value,
      password: document.getElementById("passwordLogin").value,
    };
    showLoading()
    try{
    const response = await fetch('https://my-portfolio-production-2587.up.railway.app/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(credentials)
  })
  hideLoading()
  if (!response.ok) {
    loginMessage.innerHTML =
       '<div id="errors-login" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: #000; display: flex; justify-content: center; align-items: center; background-color: #191; border-radius: 3px; border: 1px solid #b1361e; >' +
       '<p style="width: 100%; margin:0; padding: 0; text-align: center;">Invalid login details! </p> </div>'
  }else{

    const data = await response.json();
    console.log(data);
    const userId = data.userId;
    const token = data.token;
    const userData = await fetch(`https://my-portfolio-production-2587.up.railway.app/users/u/${userId}`)
    const userDataJson = await userData.json()
    const userCredentials = userDataJson.data

    localStorage.setItem('LoggedUser', JSON.stringify(userCredentials));
    localStorage.setItem('auth-token', token );
  
    //let m = JSON.parse(userCredentials)
   // alert(userCredentials.admin)
    // Redirect to dashboard or do something else with the response data
    if(userCredentials.admin === true){
      alert('You are an administrator')
      location.href = "dashboard/admin-dashboard.html"
    }else{
      location.href = "dashboard/dashboard.html"
    }
}
} catch (error) {
  console.error(error);
}
});



// Show the loading animation
function showLoading() {
  document.getElementById("loading").style.display = "flex";
}

// Hide the loading animation
function hideLoading() {
  document.getElementById("loading").style.display = "none";
}