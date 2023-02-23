const LoggedUser = localStorage.getItem("LoggedUser");
if (!LoggedUser) {
  alert("You are not authenticated! Please log in to access this page.");
  location.href = "../index.html";
}

const userData = JSON.parse(LoggedUser);
const userId = userData._id
const userName = userData.username
const usernameHolder = document.querySelector("#logged-user");
usernameHolder.innerHTML = userName;
const logout = document.getElementById('logout')
logout.addEventListener('click',(e)=>{
  e.preventDefault()
  //alert('kk')
  window.localStorage.removeItem('LoggedUser')
  window.localStorage.removeItem('auth-token')

  location.href= '../index.html'
})

const url = window.location.href.split("%27");
const blogID = url[1];
const blogPostHTML = document.getElementById("blog-post-id");

window.onload = getPost(blogID);

async function getPost(id) {
  const url = `https://my-portfolio-production-2587.up.railway.app/blogs/b/${blogID}`;
  const response = await fetch(url);
  const result = await response.json();
  const blogPost = result.BlogFetched;
  console.log(blogPost);
  //const comms = document.getElementById('comms');
  const urlComments = `https://my-portfolio-production-2587.up.railway.app/blogs/b/${blogID}/c/`;
  const commentsResponse = await fetch(urlComments);
  const commmentsObject = await commentsResponse.json();
  const blogComments = commmentsObject.Comments;
  let numberOfComments = blogComments ? blogComments.length : 0;
  console.log(blogComments);

  const date = blogPost.date;
  blogPostHTML.innerHTML = `
<div class="blog-title">
<h4>${blogPost.title}</h4>
</div>

<div class="blog-image">
<img src="${blogPost.imageUrl}" alt="A blog by Norbert Ishimwe"/>
</div>

<div class="blog-content">
<p> ${blogPost.content}</p>
</div>
</div>

<div class="date-like">
<div class="published-date">
    <p>Published on ${date}</p>
     <p>By <span class="name-span">Norbert Ishimwe</span></p>
</div>
<div class="like-comment">
    <a id="like-button" href="" onclickk="toggleLike(this)" style="color:blue"> </a>
    <a id="comment" href=""> <i class="far fa-comments"></i><span id="comms"> ${numberOfComments} comments</span></a>
</div>
    `;
  //console.log(date);
  //return blogPost;
  if(numberOfComments === 0){
    const commentsContainer = document.querySelector(".all-comments");
    //const deleteAll = document.querySelector(".btn-danger");
  commentsContainer.innerHTML += `
            <h4 class='no-messages'> No Comments on this blog</h4>
            `;
  //deleteAll.style.display = "none";

  }
  
  //ADDING COMMENT
  var submitMessage = document.getElementById("errors-success");
  const commentSubmit = document.querySelector("#comment-btnn");
  //const comments = myblog[0]['comments'];
  
  commentSubmit.addEventListener("click", async (e) => {
    e.preventDefault();
    var comment = document.getElementById("comment-input").value;
    if (!comment) {
      submitMessage.innerHTML =
        '<div id="errors" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: #000; display: flex; justify-content: center; align-items: center; background-color: hsla(10, 71%, 41%, 10%); border-radius: 3px; border: 1px solid #b1361e; >' +
        '<p style="width: 100%; margin:0; padding: 0; text-align: center;">No comment have been written </p> </div>';
    } else {
      try{
        var commentText = document.getElementById("comment-input").value;
        const token = localStorage.getItem('auth-token')
        const comment = {
          comment : commentText
        }
        const response = await fetch(`https://my-portfolio-production-2587.up.railway.app/blogs/b/${blogID}/c/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(comment)
      })
     
      if (!response.ok) {
       //console.log(response);
        submitMessage.innerHTML =
           '<div id="errors-login" style="width: 100%; height: 40px; padding: 0px 0; margin: 0px 0; font-size: 14px; color: #000; display: flex; justify-content: center; align-items: center; background-color: #191; border-radius: 3px; border: 1px solid #b1361e; >' +
           '<p style="width: 100%; margin:0; padding: 0; text-align: center;">Error commenting! </p> </div>'
      }
      submitMessage.innerHTML =
           
       clearForm();
    location.reload();
    } catch (error) {
      console.error(error);
    }
    }

  })

  // --- Listing the comment in HTML---
//let  getComments = JSON.parse(localStorage.getItem('comments'));
const commentsContainer = document.querySelector(".all-comments");
const deleteAll = document.querySelector(".btn-danger");
//console.log(blogComments);
// if (!blogComments || blogComments.length == 0) {
//   //alert('null')
//   commentsContainer.innerHTML += `
//             <h4 class='no-messages'> No Comments on this blog</h4>
//             `;
//   deleteAll.style.display = "none";
// } else {
  //console.log(userId);

  blogComments.sort((a, b) => a.date - b.date).reverse();
  blogComments.forEach((element, index) => {
  
    // if (element._userId === userId) {
    //   commentsContainer.innerHTML += `
    //         <div class="comment-content">
    //         <div class="user-delete">
    //         <h4>${userName}</h4>
    //         <button class="deleteOne" onclick="deleteMessage(${index})">Delete</button>
    //         </div>    
    //         <p class='time'>${date}</p>
    //         <p class="short-description">
    //           ${element.comment}
    //         </p>
    //       </div>        
    //         `;
    // } else {
      commentsContainer.innerHTML += `
        <div class="comment-content">
        <h4>${userName}</h4>
         
        <p class='time'>${date}</p>
        <p class="short-description">
          ${element.comment}
        </p>
      </div>        
        `;
    // }
   });
 
const deleteMessage = (btn) => {
  if (btn > -1) {
    // only splice array when item is found
    const removedComment = blogComments.splice(btn, 1); // 2nd parameter means remove one item only
    
    blogComments.splice(
      blogComments.findIndex((elem) => elem._id === removedComment[0]._id),
      1
    );

    window.localStorage.setItem("comments", JSON.stringify(allComments));
    alert("Comment Deleted");
    location.reload();
  }
};

const deleteAllMessages = () => {
  allComments = [];
  window.localStorage.removeItem("comments");
  alert("All comments Deleted");
  commentsContainer.innerHTML += `
            <h4 class='no-messages'> No Comments on this blog</h4>
            `;
  location.reload();
};

function clearForm() {
  //resets the form fields
  document.getElementById("comment-input").value = "";
}

} //END OF GET POST FUNCTION**

//let blogLikes = localStorage.getItem('userLikes')? JSON.parse(localStorage.getItem('userLikes')) : [];
//const blogLikers = blogLikes.filter(like => like.BlogID == blogID).length

//const myblog = blogPosts.filter(post=> post._id == blogID);
//console.log(blogPost);



// LIKES FUNCTIONALITY

// Get the like button element
var likeButton = document.getElementById("like-button");

// Update the like button text to show the current number of likes
//var userLikes = localStorage.getItem("userLikes");
//likesArr = JSON.parse(userLikes);
//let number;
//const samelike = localStorage.getItem("userLikes")
//  ? likesArr.filter((like) => like.BlogID == blogID && like.User == LoggedUser)
//  : [];
//console.log(samelike);
// Add an event listener to the like button that increments the number of likes when clicked

//if (samelike == 0) {
  likeButton.innerHTML = `<i class="far fa-thumbs-up"></i> Like (9)`;
//} else {
 // likeButton.innerHTML = `<i class="far fa-thumbs-down"></i> Dislike (${blogLikers})`;
//}
likeButton.addEventListener("click", function (e) {
  e.preventDefault();
  if (!userLikes || userLikes.length == 0) {
    //number=1
    var likesObject = {
      BlogID: blogID,
      User: LoggedUser,
    };
    likesArr = [];
    likesArr.push(likesObject);
    localStorage.setItem("userLikes", JSON.stringify(likesArr));

    location.reload();
  } else {
    if (samelike.length == 0) {
      //alert('havenot liked before')
      // number=1
      var likesObject = {
        BlogID: blogID,
        User: LoggedUser,
      };
      likesArr.push(likesObject);
      localStorage.setItem("userLikes", JSON.stringify(likesArr));
      location.reload();
    } else {
      // alert('have liked before')
      likeButton.innerHTML = `<i class="far fa-thumbs-up"></i> Like (${blogLikers})`;

      for (i = 0; i < likesArr.length; i++) {
        if (likesArr[i].User === LoggedUser && likesArr[i].BlogID === blogID) {
          likesArr.splice(i, 1);
          localStorage.setItem("userLikes", JSON.stringify(likesArr));
          location.reload();
        }
      }
    }
  }
});

// END OF LIKES FUNCTIONALITY

//   function toggleLike(element) {

//     if (element.classList.contains("liked")) {
//         element.classList.remove("liked");
//         element.innerHTML = "Like";
//     } else {

//     element.classList.add("liked");

//     element.innerHTML = "Dislike";

//     }
// }
