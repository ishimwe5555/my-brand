
const LoggedUser = localStorage.getItem('LoggedUser')
if(!LoggedUser){
   alert('You are not authenticated! Please log in to access this page.')
   location.href = "../index.html"
 }
//const l = document.querySelector('#logged-user')
//l.innerHTML = 'Admin'

const logout = document.getElementById('logout')
logout.addEventListener('click',(e)=>{
  e.preventDefault()
  //alert('kk')
  window.localStorage.removeItem('LoggedUser')
  location.href= '../index.html'
})
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

window.addEventListener('load', function() {
  const loadingAnimation = document.getElementById('loading-animation');
  loadingAnimation.style.display = 'none';
});

var form = document
  .getElementById("add-blog-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    //gets each blog input
    const title = document.getElementById("title").value;
    const category = document.getElementById("category").value;
    const coverImage = document.getElementById("cover-image").value;
    const content = document.getElementById("content").value;
    var submitMessage = document.getElementById("errors-success");
    //const token = localStorage.getItem('auth-token')
    //   var regex = new RegExp(expression);

    // checks if all fields are filled. If not, it i will fire an alert to tell the user to fill all fields
    if (!title || !content) {
      //   alert("Please fill all fields!");
      submitMessage.innerHTML =
        '<div id="errors" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: #000; display: flex; justify-content: center; align-items: center; background-color: hsla(10, 71%, 41%, 10%); border-radius: 3px; border: 1px solid #b1361e; >' +
        '<p style="width: 100%; margin:0; padding: 0; text-align: center;">Please Fill in required blog details! </p> </div>';
    } else {
     
      //If there no previously added messages, the newly added message will be added to the local storage
      showLoading()
       try{
    const title = document.getElementById("title").value;
    //const category = document.getElementById("category").value;
    const coverImage = document.getElementById("cover-image");
    const content = document.getElementById("content").value;
    const token = localStorage.getItem('auth-token')
    
    var data = new FormData()
       // if (coverImage && coverImage.files && coverImage.files.length > 0) {
    data.append('title', title)
    data.append('content', content)
    data.append('blogImage', coverImage.files[0]);
    //console.log(coverImage.files[0]);
      //  }
       
        //data.append('blogImage', coverImage.files[0]);
        const rawResponse = await fetch('https://my-portfolio-production-2587.up.railway.app/blogs/create', {
          method: 'POST',
          body: data,
          headers: {
            'Authorization' : `Bearer ${token}`
          }
        })
        const result = await rawResponse.json();
        hideLoading()
        if(!result || !result.code === 201){
          //console.log(result);
          submitMessage.innerHTML =
          '<div id="errors" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: #000; display: flex; justify-content: center; align-items: center; background-color: #191; border-radius: 3px; border: 1px solid #1eb136;; >' +
          '<p style="width: 100%; margin:0; padding: 0; text-align: center;"> Blog not added! </p> </div>';
          clearForm()
        }
        // Redirect to dashboard or do something else with the response data
        alert('Blog added successfully')
  location.href = "admin-dashboard.html"
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
  //document.getElementById("references").value = ""; 
}
// Show the loading animation
function showLoading() {
  document.getElementById("loading").style.display = "flex";
}

// Hide the loading animation
function hideLoading() {
  document.getElementById("loading").style.display = "none";
}