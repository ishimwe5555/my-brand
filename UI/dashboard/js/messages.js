const LoggedUser = localStorage.getItem('LoggedUser')

if(!LoggedUser){
   alert('You are not authenticated! Please log in to access this page.')
   location.href = "../index.html"
 }
 const logout = document.getElementById('logout')
 logout.addEventListener('click',(e)=>{
   e.preventDefault()
   //alert('kk')
   window.localStorage.removeItem('LoggedUser')
   window.localStorage.removeItem('auth-token')

   location.href= '../index.html'
 })

 window.onload = getMessage();

 async function getMessage(){
   const token = localStorage.getItem('auth-token')

   const response = await fetch(`https://my-portfolio-production-2587.up.railway.app/messages`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${token}`
      },})
const result = await response.json();
 const getMessages = result.Messages;
// console.log(getMessages);
if(!getMessages||getMessages.length == 0){
   //alert('null')
   commentsContainer.innerHTML += `
   <h4 class='no-messages'> No messages received</h4>
   `
} 
const table = () =>{

   getMessages.sort((a, b) => a.date - b.date).reverse();
   getMessages.forEach((element,index) => {
//console.log(element.names);
commentsContainer.innerHTML += `
<div class="comment-content message-content">
<div class="user-delete">
   <h4>${element.name}</h4>
   <button class="deleteOne" onclick="deleteMessage(${index})">Delete</button>
</div>
<p>${element.date}</p>

<p class="short-description">
 ${element.message}
</p>
</div>       
`
});
}


table();

}
 
const deleteMessage = (btn) => {
      //console.log(btn);
    if (btn > -1) { // only splice array when item is found
        getMessages.splice(btn, 1); // 2nd parameter means remove one item only
        window.localStorage.setItem("messages", JSON.stringify(getMessages));
        alert("Message Deleted")
        location.reload()
 }
 };

const deleteAll = document.querySelector('.btn-danger')
deleteAll.addEventListener('click',(e)=>{
   e.preventDefault();
   deleteAllMessages()
 
})
const deleteAllMessages = ()=>{
   getMessages = []
   window.localStorage.removeItem("messages");
   alert("All Messages Deleted")
   
       location.reload();

}