window.addEventListener("scroll", function(){
    var header = this.document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 5)
    // header.classList.toggle("sticky", window.scrollY > 5)
})

// window.addEventListener("load", function(){
//     var footer = this.document.querySelector("footer");
//     footer.classList.toggle("sticky")
//     // footer.classList.toggle("sticky", window.scrollY > 5)
// })

// element.scrollIntoView({ behavior: "smooth" });