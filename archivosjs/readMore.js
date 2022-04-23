let btnCollapse = document.getElementById("btnCollapse");

btnCollapse.addEventListener("click", function(e){
  this.getAttribute("aria-expanded") === "true"? 
    (btnCollapse.innerText = "Read less")
    : (btnCollapse.innerText = "Read more");
});