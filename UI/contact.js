//--LOCAL STORAGE--

var form = document
  .getElementById("contact-submit")
  .addEventListener("click", (e) => {
    e.preventDefault();
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    //gets each user input
    var names = document.getElementById("contact-names").value;
    var email = document.getElementById("contact-email").value;
    var subject = document.getElementById("contact-subject").value;
    var message = document.getElementById("contact-message").value;
    var submitMessage = document.getElementById("errors-success");
   
    // checks if all fields are filled. If not, validate.
    if (!names || !email || !subject || !message) {
      
      submitMessage.innerHTML =
        '<div id="errors" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: #000; display: flex; justify-content: center; align-items: center; background-color: #191; border-radius: 3px; border: 1px solid #b1361e; >' +
        '<p style="width: 100%; margin:0; padding: 0; text-align: center;">Please fill in all user details! </p> </div>';
    } else if(!email.match(mailformat)){
      alert('Invalid email address')
      submitMessage.innerHTML =
      '<div id="errors" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: #000; display: flex; justify-content: center; align-items: center; background-color: #191; border-radius: 3px; border: 1px solid #b1361e; >' +
      '<p style="width: 100%; margin:0; padding: 0; text-align: center;">Invalid email address</p> </div>';
    }else if(message.length<5){
    //   alert('Short password')
      submitMessage.innerHTML =
      '<div id="errors" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: #000; display: flex; justify-content: center; align-items: center; background-color: #191; border-radius: 3px; border: 1px solid #b1361e; >' +
      '<p style="width: 100%; margin:0; padding: 0; text-align: center;">Message should be at least 6 characters long</p> </div>';
    }
    else {
        
         const time = Date().split('GMT');
         const date = time[0]
      var newMessage = {
        date: date, 
        names: names,
        email: email,
        subject: subject,
        message: message
      };

      // checks if there are some users  stored previously in the local storage and retrieve them if any
      //If there no previously added messages, the newly added message will be added to the local storage
      if (localStorage.getItem("messages") == null) {
        var messages = [];
        messages.push(newMessage);
        localStorage.setItem("messages", JSON.stringify(messages));
        submitMessage.innerHTML =
          '<div id="errors" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: #000; display: flex; justify-content: center; align-items: center; background-color: #191; border-radius: 3px; border: 1px solid #1eb136;; >' +
          '<p style="width: 100%; margin:0; padding: 0; text-align: center;"> Message sent successfully! </p> </div>';

       
        clearForm();
       }
    //else if(localStorage.getItem("messages").includes(email,username)){
    //     submitMessage.innerHTML =
    //     '<div id="errors" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: #000; display: flex; justify-content: center; align-items: center; background-color: #191; border-radius: 3px; border: 1px solid #1eb136;; >' +
    //     '<p style="width: 100%; margin:0; padding: 0; text-align: center;"> Email/Username is already registered</p> </div>'; 
    //   }
       else {
        // localStorage.removeItem("blogs");
        // if there are some previously stored bookmarks, then they wil be retrieved, and the newly added
        // bookmark will be pushed to the bookmarks in the local storage

        var messages = JSON.parse(localStorage.getItem("messages"));
     
        messages.push(newMessage);
        localStorage.setItem("messages", JSON.stringify(messages));
        submitMessage.innerHTML =
          '<div id="errors" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: hsla(0, 0%, 100%, 0.7); display: flex; justify-content: center; align-items: center; background-color: hsla(130, 71%, 41%, 10%); border-radius: 3px; border: 1px solid #1eb136;; >' +
          '<p style="width: 100%; margin:0; padding: 0; text-align: center;"> Message was sent successfully! </p> </div>';

        // console.log(JSON.parse(localStorage.getItem("users")));
        clearForm();
      }
    }
  });

// a function to clear the form
function clearForm() {
  //resets the form fields
  document.getElementById("contact-names").value = "";
  document.getElementById("contact-email").value = "";
  document.getElementById("contact-subject").value = "";
  document.getElementById("contact-message").value = "";
}


//---LOGIN---

// var loginForm = document.getElementById('loginBtn').addEventListener("click", (e)=>{
//   e.preventDefault();
  
//   var lUsername= document.getElementById('usernameLogin').value;
//   var lPassword= document.getElementById('passwordLogin').value;
//   var loginMessage = document.getElementById("errors-success-login");
//   if ( !lUsername || !lPassword) {
     
//     loginMessage.innerHTML =
//       '<div id="errors-login" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: #000; display: flex; justify-content: center; align-items: center; background-color: #191; border-radius: 3px; border: 1px solid #b1361e; >' +
//       '<p style="width: 100%; margin:0; padding: 0; text-align: center;">Please fill in all login details! </p> </div>';
//   }else if(!localStorage.getItem("users").includes(lUsername,lPassword)){
//     loginMessage.innerHTML =
//       '<div id="errors-login" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: #000; display: flex; justify-content: center; align-items: center; background-color: #191; border-radius: 3px; border: 1px solid #b1361e; >' +
//       '<p style="width: 100%; margin:0; padding: 0; text-align: center;">Oops! User is not registered! </p> </div>';
//       console.log('user doesn\'t exist');
//   }
//    else {
    
//     localStorage.setItem('LoggedUser', lUsername );
//    window.location = "admin/dashboard.html"
  
//   }
        
// })


