let galleryImages = document.querySelectorAll(".gallery-img");
let getLatestOpenedImg;
let windowWidth = window.innerWidth;

if(galleryImages) {
    galleryImages.forEach(function(image, index) {
       image.onclick = function() {
           let getElementCss = window.getComputedStyle(image);
           let getFullImgUrl = getElementCss.getPropertyValue("background-image");
           let getImgUrlPos = getFullImgUrl.split("/img/");
           let setNewImgUrl = getImgUrlPos[1].replace('")', '');
           
           getLatestOpenedImg = index + 1;

           let container = document.body;
           let newImgWindow = document.createElement("div");
           container.appendChild(newImgWindow);
           newImgWindow.setAttribute("class", "img-window");
           newImgWindow.setAttribute("onclick", "closeImg()");

           let newImg = document.createElement("img");
           newImgWindow.appendChild(newImg);
           newImg.setAttribute("src", "img/" + setNewImgUrl);
           newImg.setAttribute("id", "current-img");

           newImg.onload = function() {
            let imgWidth = this.width;
            let calcImgToEdge = ((windowWidth - imgWidth) / 2) - 80;
            
            let newNextBtn = document.createElement("a");
            let btnNextText = document.createTextNode("Næste");
            newNextBtn.appendChild(btnNextText);
            container.appendChild(newNextBtn);
            newNextBtn.setAttribute("class", "img-btn-next");
            newNextBtn.setAttribute("onclick", "changeImg(1)");
            newNextBtn.style.cssText = "right: " + calcImgToEdge + "px;";
 
            let newPrevBtn = document.createElement("a");
            let btnPrevText = document.createTextNode("Forrige");
            newPrevBtn.appendChild(btnPrevText);
            container.appendChild(newPrevBtn);
            newPrevBtn.setAttribute("class", "img-btn-prev");
            newPrevBtn.setAttribute("onclick", "changeImg(0)");
            newPrevBtn.style.cssText = "left: " + calcImgToEdge + "px;";

           }
       }
       })
    }

function closeImg() {
    document.querySelector(".img-window").remove();
    document.querySelector(".img-btn-next").remove();
    document.querySelector(".img-btn-prev").remove();
}

function changeImg(changeDir) {
    document.querySelector("#current-img").remove();

    let getImgWindow = document.querySelector(".img-window");
    let newImg = document.createElement("img");
    getImgWindow.appendChild(newImg);

    let calcNewImg;
    if(changeDir === 1) {
         calcNewImg = getLatestOpenedImg + 1;
         if(calcNewImg > galleryImages.length) {
            calcNewImg = 1;
         }
    }
    else if(changeDir === 0) {
        calcNewImg = getLatestOpenedImg - 1;
        if(calcNewImg < 1) {
            calcNewImg = galleryImages.length;
        }
    }

    newImg.setAttribute("src", "img/img" + calcNewImg + ".png");
    newImg.setAttribute("id", "current-img");

    getLatestOpenedImg = calcNewImg;

    newImg.onload = function() {
        let imgWidth = this.width;
        let calcImgEdge = ((windowWidth - imgWidth) / 2) - 80;

        let nextBtn = document.querySelector(".img-btn-next");
        nextBtn.style.cssText = "right: " + calcImgToEdge + "px;";

        let prevBtn = document.querySelector(".img-btn-next");
        prevBtn.style.cssText = "right: " + calcImgToEdge + "px;";

    }



}

// dette er en kontakt formular til kontakt siden
function _(id){ return document.getElementById(id); }
function submitForm(){
  
  alert("Din besked er sendt");
	_("mybtn").disabled = true;
	_("status").innerHTML = '';
	var formdata = new FormData();
	formdata.append( "n", _("n").value );
	formdata.append( "e", _("e").value );
	formdata.append( "m", _("m").value );
	var ajax = new XMLHttpRequest();
	ajax.open( "POST", "example_parser.php" );
	ajax.onreadystatechange = function() {
		if(ajax.readyState == 4 && ajax.status == 200) {
			if(ajax.responseText == "success"){
        _("my_form").innerHTML = ''+_("n").value+'';
          } else {
				_("status").innerHTML = ajax.responseText;
				_("mybtn").disabled = false;
			}
		}
	}
  ajax.send( formdata );
}
	ajax.send( formdata );}

/* slideshow forside */
