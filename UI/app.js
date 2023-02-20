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

// var form = document
//   .getElementById("signup-btn")
//   .addEventListener("click", (e) => {
//     e.preventDefault();
//     //alert('yeah')
//     var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

//     //gets each user input
//     var names = document.getElementById("names").value;
//     var email = document.getElementById("email").value;
//     var username = document.getElementById("username").value;
//     var password = document.getElementById("password").value;
//     var signupMessage = document.getElementById("errors-success-signup");
   
//     // checks if all fields are filled. If not, validate.
//     if (!names || !email || !username || !password) {
      
//       signupMessage.innerHTML =
//         '<div id="errors" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: #000; display: flex; justify-content: center; align-items: center; background-color: #191; border-radius: 3px; border: 1px solid #b1361e; >' +
//         '<p style="width: 100%; margin:0; padding: 0; text-align: center;">Please fill in all user details! </p> </div>';
//     } else if(!email.match(mailformat)){
//       alert('Invalid email address')
//       signupMessage.innerHTML =
//       '<div id="errors" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: #000; display: flex; justify-content: center; align-items: center; background-color: #191; border-radius: 3px; border: 1px solid #b1361e; >' +
//       '<p style="width: 100%; margin:0; padding: 0; text-align: center;">Invalid email address</p> </div>';
//     }else if(password.length<6){
//       alert('Short password')
//       signupMessage.innerHTML =
//       '<div id="errors" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: #000; display: flex; justify-content: center; align-items: center; background-color: #191; border-radius: 3px; border: 1px solid #b1361e; >' +
//       '<p style="width: 100%; margin:0; padding: 0; text-align: center;">Password should be at least 6 characters long</p> </div>';
//     }
//     else {
         
//       var newUser = {
//         names: names,
//         email: email,
//         username: username,
//         password: password
//       };

//       // checks if there are some users  stored previously in the local storage and retrieve them if any
//       //If there no previously added messages, the newly added message will be added to the local storage
//       if (localStorage.getItem("users") == null) {
//         var users = [];
//         users.push(newUser);
//         localStorage.setItem("users", JSON.stringify(users));
//         signupMessage.innerHTML =
//           '<div id="errors" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: #000; display: flex; justify-content: center; align-items: center; background-color: #191; border-radius: 3px; border: 1px solid #1eb136;; >' +
//           '<p style="width: 100%; margin:0; padding: 0; text-align: center;"> User registered successfully! </p> </div>';
//         clearForm();
//       }else if(localStorage.getItem("users").includes(email,username)){
//         signupMessage.innerHTML =
//         '<div id="errors" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: #000; display: flex; justify-content: center; align-items: center; background-color: #191; border-radius: 3px; border: 1px solid #1eb136;; >' +
//         '<p style="width: 100%; margin:0; padding: 0; text-align: center;"> Email/Username is already registered</p> </div>'; 
//       }
//        else {
//         // localStorage.removeItem("blogs");
//         // if there are some previously stored bookmarks, then they wil be retrieved, and the newly added
//         // bookmark will be pushed to the bookmarks in the local storage

//         var users = JSON.parse(localStorage.getItem("users"));
     
//         users.push(newUser);
//         localStorage.setItem("users", JSON.stringify(users));
//         signupMessage.innerHTML =
//           '<div id="errors" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: hsla(0, 0%, 100%, 0.7); display: flex; justify-content: center; align-items: center; background-color: hsla(130, 71%, 41%, 10%); border-radius: 3px; border: 1px solid #1eb136;; >' +
//           '<p style="width: 100%; margin:0; padding: 0; text-align: center;"> User registered successfully! </p> </div>';

//         // console.log(JSON.parse(localStorage.getItem("users")));
//         clearForm();
//       }
//     }
//   });

// // a function to clear the form
// function clearForm() {
//   //resets the form fields
//   document.getElementById("names").value = "";
//   document.getElementById("email").value = "";
//   document.getElementById("username").value = "";
//   document.getElementById("password").value = "";
// }


// //---LOGIN---

// var loginForm = document.getElementById('loginBtn').addEventListener("click", (e)=>{
//   e.preventDefault();
//   alert('alert');
//   var lUsername= document.getElementById('usernameLogin').value;
//   var lPassword= document.getElementById('passwordLogin').value;
//   var loginMessage = document.getElementById("errors-success-login");
//   var signupMessage = document.getElementById("errors-success-signup");


//   if ( !lUsername || !lPassword) {
     
//     loginMessage.innerHTML =
//       '<div id="errors-login" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: #000; display: flex; justify-content: center; align-items: center; background-color: #191; border-radius: 3px; border: 1px solid #b1361e; >' +
//       '<p style="width: 100%; margin:0; padding: 0; text-align: center;">Please fill in all login details! </p> </div>';
//   }else if(!localStorage.getItem("users").includes(lUsername,lPassword)){
//     loginMessage.innerHTML =
//       '<div id="errors-login" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: #000; display: flex; justify-content: center; align-items: center; background-color: #191; border-radius: 3px; border: 1px solid #b1361e; >' +
//       '<p style="width: 100%; margin:0; padding: 0; text-align: center;">Oops! User is not registered! </p> </div>';
//       console.log('user doesn\'t exist');
//   } else if(lUsername=='admin'&&lPassword=='adminn') { 
//    localStorage.setItem('LoggedUser', lUsername );
//    window.location = "admin/admin-dashboard.html"
//   }
//    else {
//     localStorage.setItem('LoggedUser', lUsername );
//    window.location = "admin/dashboard.html" 
//   }        
// })


// ****SIGN-UP***

var form = document
   .getElementById("signup-btn")
   .addEventListener("click", async (e) => {
     e.preventDefault();
     
     let user = {
     //names: document.getElementById("names").value,
     email: document.getElementById("email").value,
     username: document.getElementById("username").value,
     password: document.getElementById("password").value,

    };
    
    let response = await fetch('https://my-portfolio-production-2587.up.railway.app/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(user)
    });
    let result = await response.json();
    console.log(result);
    })