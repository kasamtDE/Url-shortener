let toggle=document.querySelector(".toggle")
let navbar=document.querySelector(".navbar")
let nav=document.querySelector("nav")
let input=document.querySelector(".input")
let shortenIt=document.querySelector(".shorten-it")
let error=document.querySelector(".error")
let errorBorder=document.querySelector(".error-border")
let linkContainer=document.querySelector(".link-container")
let shortenBtn=document.getElementById("shorten-btn")
let copy=document.querySelector(".copy")

/* toggle nav*/
toggle.addEventListener("click",function(){
    navbar.classList.toggle("active")
    toggle.classList.toggle("clicked")
})



let handler = async () =>{
  let url=input.value;
    
  function isValidURL(url) {
    link = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
   return (link !== null);
  };
  
  if(url==="" || url===" " || !isValidURL(url)){
    error.style.visibility="visible"
    errorBorder.style.visibility="visible"
  }else{
    error.style.visibility=""
    errorBorder.style.visibility=""
    let shorten=shortenBtn.textContent="Shortening..."
    let preventEdit=input.disabled=true
     let fetching= await axios(`https://api.shrtco.de/v2/shorten?url=${url}`)
     .then(data => {
      let editAgain=input.disabled=false
      let shortenBack=shortenBtn.textContent="Shorten It!"
      let shortLink=data.data.result.short_link
      let newDiv=document.createElement("div") /*container for given url*/
      newDiv.classList.add("shortened-container")
      linkContainer.append(newDiv)
      var newlink=document.createElement("li") /*shortened url*/
      newlink.classList.add("shortened-link")
      newlink.textContent=shortLink
      newDiv.append(newlink)
      let newButton=document.createElement("button")
      newButton.textContent="Copy"
      newButton.classList.add("copy")
      newDiv.append(newButton)
      newButton.addEventListener("click",function(e){
        e.target.textContent="Copied!"
        let textArea  = document.createElement('textarea');
        textArea.width  = "1px"; 
        textArea.height = "1px";
        textArea.background =  "transparents" ;
        textArea.value = newlink.textContent;
        document.body.append(textArea);
        textArea.select();
        textArea.setSelectionRange(0, 99999)
        document.execCommand('copy');
        document.body.removeChild(textArea);
         });
      }).catch(rejected=> console.log(rejected))
    };
  if(isValidURL(input.value)){
    let newDiv=document.createElement("div")
    linkContainer.append(newDiv)
    let originaLink=input.value
    let newLi=document.createElement("li")
    newLi.classList.add("original-link")
    newLi.innerText=originaLink
    newDiv.append(newLi)
    input.value="" 
  };
};


shortenIt.addEventListener("click",handler)
input.addEventListener("keydown",(event)=>{
    if(event.code==="Enter"){
      handler();
    };
  });




   



