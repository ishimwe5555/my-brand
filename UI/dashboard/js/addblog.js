
const LoggedUser = localStorage.getItem('LoggedUser')
if(!LoggedUser){
   alert('You are not authenticated! Please log in to access this page.')
   location.href = "../index.html"
 }
const l = document.querySelector('#logged-user')
l.innerHTML = LoggedUser


let url = "";
var imageInput = document.getElementById("cover-image");
imageInput.addEventListener("change", () => {
  let fileReader = new FileReader();
  fileReader.readAsDataURL(imageInput.files[0]);
  fileReader.addEventListener("load", () => {
     url = fileReader.result;
       // console.log(url);
  });
});

var form = document
  .getElementById("add-blog-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    //gets each blog input
    var title = document.getElementById("title").value;
    var category = document.getElementById("category").value;
    var coverImage = document.getElementById("cover-image").value;
    var content = document.getElementById("content").value;
    var submitMessage = document.getElementById("errors-success");
    var likes = 0;
    var comments = [];
    //   var regex = new RegExp(expression);

    // checks if all fields are filled. If not, it i will fire an alert to tell the user to fill all fields
    if (!title || !content) {
      //   alert("Please fill all fields!");
      submitMessage.innerHTML =
        '<div id="errors" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: #000; display: flex; justify-content: center; align-items: center; background-color: hsla(10, 71%, 41%, 10%); border-radius: 3px; border: 1px solid #b1361e; >' +
        '<p style="width: 100%; margin:0; padding: 0; text-align: center;">Please Fill in required blog details! </p> </div>';
    } else {
      // otherwise, user input for each field will be stored in an object
      //generated a unique id using date.now() because it will always be unique
      var newBlog = {
        title: title,
        image: email,
        content: content
      };

      // checks if there are some users  stored previously in the local storage and retrieve them if any
      //If there no previously added messages, the newly added message will be added to the local storage
       try{
    const response = await fetch('https://my-portfolio-production-2587.up.railway.app/blogs/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(newBlog)
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
  document.getElementById("title").value = "";
  document.getElementById("category").value = "";
  document.getElementById("cover-image").value = "";
  document.getElementById("content").value = "";
  document.getElementById("references").value = ""; 
}
