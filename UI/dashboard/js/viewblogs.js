window.addEventListener('load', function() {
  const loadingAnimation = document.getElementById('loading-animation');
  loadingAnimation.style.display = 'none';
});
// Show the loading animation
function showLoading() {
  document.getElementById("loading").style.display = "flex";
}

// Hide the loading animation
function hideLoading() {
  document.getElementById("loading").style.display = "none";
}


const LoggedUser = localStorage.getItem('LoggedUser')

if(!LoggedUser){
   alert('You are not authenticated! Please log in to access this page.')
   location.href = "../index.html"
 }
 const logout = document.getElementById('logout')
logout.addEventListener('click',(e)=>{
  e.preventDefault()
  window.localStorage.removeItem('LoggedUser')
  window.localStorage.removeItem('auth-token')
  location.href= '../index.html'
})
let allBlogs = [];
const retrieving = async () => {
  const response = await fetch('https://my-portfolio-production-2587.up.railway.app/blogs/');
  const result = await response.json();
  allBlogs = result.Blogs;

  console.log(allBlogs);
  if(allBlogs.length<1){
    container.innerHTML = '<h4>NO BLOGS POSTED!!</h4>'
  }
  allBlogs.sort((a, b) => a.date - b.date).reverse();
  allBlogs.map((blog) => {
    const container = document.getElementById("all-blogs");
    const coverImg = new Image();
    coverImg.src = blog.imageUrl;
    const blogId = blog._id;
    // let truncatedText = text
    let displayTitle;
    if(blog.title.split(" ").length > 9){
      displayTitle = blog.title.split(" ").slice(0, 9).join(" ") + '...';
    } else{
      displayTitle= blog.title;
    }

    container.innerHTML += `
    <div class="cardd blog">
     <a href="blog-page.html?id='${blogId}'" id="${blogId}">
        <img src=${coverImg.src} alt="" "/>
        <div class='blog-text'>
      
        <h4>${displayTitle}</h4>
      </a> 
      </div> 
      <div class="hover-items">
                        <h3>View or Update</h3>
                        <div class="icons">
                            <a href="blog-page.html?id='${blogId}'" id="${blogId}" class="icon">
                                <i class="fas fa-eye"></i>
                            </a>
                            <a href="update-blog.html?id='${blogId}'" class="icon">
                                <i class="fas fa-edit"></i>
                            </a>
                           
                        </div>
    </div>`;
  });
};

window.onload = () => {
  retrieving();
};


//---UPDATE BLOG---
