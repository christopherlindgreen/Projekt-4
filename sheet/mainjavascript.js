let galleryImages = document.querySelectorAll(".gallery-img");
let getLatestOpenedImg;
let windowWidth = window.innerWidth;

if(galleryImages) {
    galleryImages.forEach(function(image) {
       image.onclick = function() {
           let getElementCss = window.getComputedStyle(image);
           let getfullImgUrl = getElementCss.getPropertyValue("background-image");
           let getImgUrlPos = getFullImgUrl.split("");
           alert(getfullImgUrl);
    });
}