const LoggedUser = localStorage.getItem('LoggedUser')

if(!LoggedUser){
   alert('You are not authenticated! Please log in to access this page.')
   location.href = "../index.html"
 }
let allBlogs = [];
const retrieving = async () => {
  allBlogs = await JSON.parse(localStorage.getItem("blogs"));
  //console.log(allBlogs);
  allBlogs.sort((a, b) => a.id - b.id).reverse();
  allBlogs.map((blog) => {
    const container = document.getElementById("all-blogs");
    const coverImg = new Image();
    coverImg.src = blog.coverImage;
    const blogId = blog.id;
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
