const LoggedUser = localStorage.getItem('LoggedUser')

if(!LoggedUser){
   alert('You are not authenticated! Please log in to access this page.')
   location.href = "../index.html"
 }
const title = document.querySelector('#title')
const category = document.querySelector('#category')
const coverImage = document.querySelector('#cover-image')
const content = document.querySelector('#content')
const updateBtn = document.querySelector('#submit-blog')

const url = window.location.href.split('%27');
const blogID = url[1]

const allBlogs = JSON.parse(localStorage.getItem('blogs'));

const myBlog = allBlogs.filter((post)=> post.id == blogID);

title.value = myBlog[0].title
category.value = myBlog[0].category
content.append(myBlog[0].content)

updateBtn.addEventListener('click',(e)=>{
    e.preventDefault;   
    myBlog[0].title = title.value
    myBlog[0].category = category.value
    myBlog[0].content = content.value
    localStorage.setItem('blogs',JSON.stringify(allBlogs))
    alert('Blog is updated successfully')

})