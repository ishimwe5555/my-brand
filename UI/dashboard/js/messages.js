//import { getMessages } from "../../../server/src/controllers/messages"
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

//  window.addEventListener('load', function() {
//    const loadingAnimation = document.getElementById('loading-animation');
//    loadingAnimation.style.display = 'none';
//  });
 
 window.onload = getMessagez();
async function getMessagez(){
const token = localStorage.getItem('auth-token')
//showLoading()
const response = await fetch(`https://my-portfolio-production-2587.up.railway.app/messages`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${token}`
      },})
const result = await response.json();
//hideLoading()
const getMessages = result.Messages;
//console.log(getMessages.length);
const messageContainer = document.querySelector("#all-messages");

if(!getMessages||getMessages.length == 0){
   //alert('null')
   messageContainer.innerHTML += `
   <h4 class='no-messages'> No messages received</h4>
 `
} 
const table = () =>{

   getMessages.sort((a, b) => a.date - b.date).reverse();
   getMessages.forEach((element,index) => {
//console.log(element.names);
messageContainer.innerHTML += `
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
showLoading()
async function deleteMessage(btn){
   const token = localStorage.getItem('auth-token')
   //showLoading()
   const response = await fetch(`https://my-portfolio-production-2587.up.railway.app/messages`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${token}`
      },})
const result = await response.json();

let getMessages = result.Messages;

getMessages.reverse()
// reversedMessages.splice(btn, 1)
// getMessages = reversedMessages.reverse()
messageToDeleteId = getMessages[btn]._id
const deleteMessage = await fetch(`https://my-portfolio-production-2587.up.railway.app/messages/delete/${messageToDeleteId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${token}`
      },})      
//const deleteMessageResponse = await deleteMessage.json();
hideLoading()
if(deleteMessage.ok){
 //  alert('Message deleted')
location.reload()
}
else{
   console.error('Error deleting')
}
 };

const deleteAll = document.querySelector('.btn-danger')
deleteAll.addEventListener('click',(e)=>{
   e.preventDefault();
   deleteAllMessages()
 
})
async function deleteAllMessages(){
   const token = localStorage.getItem('auth-token')
   const response = await fetch(`https://my-portfolio-production-2587.up.railway.app/messages`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${token}`
      },})
const result = await response.json();
let getMessages = result.Messages;

getMessages.forEach(async (element) => {
   const deleteMessage = await fetch(`https://my-portfolio-production-2587.up.railway.app/messages/delete/${element._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${token}`
      },})      

});
 //  window.localStorage.removeItem("messages");
   alert("All Messages Deleted")
       location.reload();

}

// Show the loading animation
function showLoading() {
   document.getElementById("loading").style.display = "flex";
 }
 
 // Hide the loading animation
 function hideLoading() {
   document.getElementById("loading").style.display = "none";
 }