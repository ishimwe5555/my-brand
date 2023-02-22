const LoggedUser = localStorage.getItem('LoggedUser')

if(!LoggedUser){
   alert('You are not authenticated! Please log in to access this page.')
   location.href = "../index.html"
 }

const url = window.location.href.split('%27');
const blogID = url[1]
const blogPostHTML = document.getElementById('blog-post-id');
const response = await fetch('https://my-portfolio-production-2587.up.railway.app/blogs/');
const result = await response.json();
const blogPosts = result.Blogs;

//const l = 'Admin'
l.innerHTML = LoggedUser.username


let numberOfComments = localStorage.getItem('comments')? JSON.parse(localStorage.getItem('comments')).length : 0

let blogLikes = localStorage.getItem('userLikes')? JSON.parse(localStorage.getItem('userLikes')) : [];
const blogLikers = blogLikes.filter(like => like.BlogID == blogID).length

//console.log(blogLikers);
const myblog = blogPosts.filter(post=> post.id == blogID);
let blogImage = new Image();
blogImage.src= myblog[0].coverImage;



blogPostHTML.innerHTML =`
    <div class="blog-title">
    <h4>${myblog[0].title}</h4>
</div>

<div class="blog-image">
<img src="${blogImage.src}" alt="A blog by Norbert Ishimwe"/>
</div>

<div class="blog-content">
<p> ${myblog[0].content}</p>
</div>
</div>

<div class="date-like">
<div class="published-date">
    <p>Published on 2022-12-22</p>
     <p>By <span class="name-span">Norbert Ishimwe</span></p>
</div>
<div class="like-comment">
    <a id="like-button" href="" onclickk="toggleLike(this)" style="color:blue"> </a>
    <a id="comment" href=""> <i class="far fa-comments"></i><span id="comms"> ${numberOfComments} comments</span></a>
</div>
    `
//ADDING COMMENT
var submitMessage = document.getElementById("errors-success");

const commentSubmit = document.querySelector('#comment-btnn')
const comments = myblog[0]['comments'];

commentSubmit.addEventListener('click', (e)=>{
    e.preventDefault();
    var comment = document.getElementById('comment-input').value;
   if(!comment){
    //alert(localStorage.getItem('LoggedUser'))
    submitMessage.innerHTML =
    '<div id="errors" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: #000; display: flex; justify-content: center; align-items: center; background-color: hsla(10, 71%, 41%, 10%); border-radius: 3px; border: 1px solid #b1361e; >' +
    '<p style="width: 100%; margin:0; padding: 0; text-align: center;">No comment have been written </p> </div>';
   }else{  
    const time = Date().split('GMT');
    const displayTime = time[0]
    const username = localStorage.getItem('LoggedUser')

    var newComment = {
        blogID : blogID,
        date : displayTime,
        comment : comment,
        user : username
    };
    if (localStorage.getItem("comments") == null) {
        var commentsArray = [];
        commentsArray.push(newComment);
        localStorage.setItem("comments", JSON.stringify(commentsArray));
        clearForm();
    }else{
        var commentsArray = JSON.parse(localStorage.getItem('comments'))
        commentsArray.push(newComment)
        localStorage.setItem('comments', JSON.stringify(commentsArray))
        submitMessage.innerHTML =
        '<div id="errors" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: hsla(0, 0%, 100%, 0.7); display: flex; justify-content: center; align-items: center; background-color: hsla(130, 71%, 41%, 10%); border-radius: 3px; border: 1px solid #1eb136;; >' +
        '<p style="width: 100%; margin:0; padding: 0; text-align: center;"> Comment added successfully! </p> </div>';
        clearForm() 
        location.reload()
        
    }   
    
 }
  
});
  // --- Listing the comment in HTML---
        let  getComments = JSON.parse(localStorage.getItem('comments'));
        const commentsContainer = document.querySelector(".all-comments");
        const deleteAll = document.querySelector('.btn-danger')


        if(!getComments||getComments.length == 0){
            //alert('null')
            commentsContainer.innerHTML += `
            <h4 class='no-messages'> No Comments on this blog</h4>
            `
            deleteAll.style.display = "none"

         } else{
        getComments.sort((a, b) => a.date - b.date).reverse();
        getComments.forEach((element,index) => {
       // console.log(comment);
        commentsContainer.innerHTML += `
        <div class="comment-content">
        <div class="user-delete">
        <h4>${element.user}</h4>
        <button class="deleteOne" onclick="deleteMessage(${index})">Delete</button>
        </div>    
        <p class='time'>${element.date}</p>
        <p class="short-description">
          ${element.comment}
        </p>
      </div>        
        ` 
        });
         }     
        const deleteMessage = (btn) => {
           //console.log(btn);
          if (btn > -1) { // only splice array when item is found
              getComments.splice(btn, 1); // 2nd parameter means remove one item only
              window.localStorage.setItem("comments", JSON.stringify(getComments));
              alert("Comment Deleted")
              location.reload()
       }
       };

       deleteAll.addEventListener('click',(e)=>{
          e.preventDefault();
          deleteAllMessages()
        
       })
       const deleteAllMessages = ()=>{
          getComments = []
          window.localStorage.removeItem("comments");
          alert("All comments Deleted")
          commentsContainer.innerHTML += `
            <h4 class='no-messages'> No Comments on this blog</h4>
            `
          location.reload();      
       }

function clearForm() {
    //resets the form fields
    document.getElementById("comment-input").value = "";
  }
 

// LIKES FUNCTIONALITY

// Get the like button element
var likeButton = document.getElementById("like-button");

// Update the like button text to show the current number of likes
var userLikes = localStorage.getItem("userLikes");
likesArr = JSON.parse(userLikes)
//let number;
const samelike = localStorage.getItem("userLikes") ? likesArr.filter((like) => like.BlogID == blogID && like.User == LoggedUser): []
//console.log(samelike);
// Add an event listener to the like button that increments the number of likes when clicked

if(samelike==0){
    likeButton.innerHTML = `<i class="far fa-thumbs-up"></i> Like (${blogLikers})`
}else{
    likeButton.innerHTML = `<i class="far fa-thumbs-down"></i> Dislike (${blogLikers})`

}
likeButton.addEventListener("click", function(e) {
    e.preventDefault()
    if ((!userLikes) ||(userLikes.length == 0)) {
    //number=1
    var likesObject = {
    BlogID: blogID,
    User : LoggedUser,
    }
    likesArr = [];
    likesArr.push(likesObject)
    localStorage.setItem('userLikes',JSON.stringify(likesArr))
    location.reload() 
}else{
    if(samelike.length==0){
        //alert('havenot liked before')
       // number=1
        var likesObject = {
        BlogID: blogID,
        User : LoggedUser,
        }
    likesArr.push(likesObject)
    localStorage.setItem('userLikes',JSON.stringify(likesArr))
    location.reload()

    }else{
       // alert('have liked before')
             likeButton.innerHTML = `<i class="far fa-thumbs-up"></i> Like (${blogLikers})`

         for(i = 0; i<likesArr.length; i++){
          if((likesArr[i].User === LoggedUser)&&(likesArr[i].BlogID === blogID)){                           
             likesArr.splice(i,1)
             localStorage.setItem('userLikes',JSON.stringify(likesArr) )
             location.reload()    
 
    }
}
    }
}
});
