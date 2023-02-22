//--LOCAL STORAGE--

var form = document
  .getElementById("contact-submit")
  .addEventListener("click", async (e) => {
    e.preventDefault();
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    //gets each user input
    var names = document.getElementById("contact-names").value;
    var email = document.getElementById("contact-email").value;
    var subject = document.getElementById("contact-subject").value;
    var message = document.getElementById("contact-message").value;
    var submitMessage = document.getElementById("errors-success");
   
    // checks if all fields are filled. If not, validate.
    if (!names || !email || !message) {
      
      submitMessage.innerHTML =
        '<div id="errors" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: #000; display: flex; justify-content: center; align-items: center; background-color: #191; border-radius: 3px; border: 1px solid #b1361e; >' +
        '<p style="width: 100%; margin:0; padding: 0; text-align: center;">Please fill in all required details! </p> </div>';
    } else if(!email.match(mailformat)){
      alert('Invalid email address')
      submitMessage.innerHTML =
      '<div id="errors" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: #000; display: flex; justify-content: center; align-items: center; background-color: #191; border-radius: 3px; border: 1px solid #b1361e; >' +
      '<p style="width: 100%; margin:0; padding: 0; text-align: center;">Invalid email address</p> </div>';
    }else if(message.length<2){
    //   alert('Short password')
      submitMessage.innerHTML =
      '<div id="errors" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: #000; display: flex; justify-content: center; align-items: center; background-color: #191; border-radius: 3px; border: 1px solid #b1361e; >' +
      '<p style="width: 100%; margin:0; padding: 0; text-align: center;">Too short Message!</p> </div>';
    }
    else {
        
      var newMessage = {
        name: names,
        email: email,
        message: message
      };

      // checks if there are some users  stored previously in the local storage and retrieve them if any
      //If there no previously added messages, the newly added message will be added to the local storage
       try{
    const response = await fetch('https://my-portfolio-production-2587.up.railway.app/messages/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(newMessage)
  })
 
  if (!response.ok) {
    console.log(response);
   }
  
 submitMessage.innerHTML =
          '<div id="errors" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: #000; display: flex; justify-content: center; align-items: center; background-color: #191; border-radius: 3px; border: 1px solid #1eb136;; >' +
          '<p style="width: 100%; margin:0; padding: 0; text-align: center;"> Message sent successfully! </p> </div>';
          clearForm()
  // Redirect to dashboard or do something else with the response data
 // location.href = "dashboard/dashboard.html"
} catch (error) {
  console.error(error);
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


