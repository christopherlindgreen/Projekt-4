let galleryImages = document.querySelectorAll(".gallery-img");
let getLatestOpenedImg;
let windowWidth = window.innerWidth;

if(galleryImages) {
    galleryImages.forEach(function(image, galleri) {
       image.onclick = function() {
           let getElementCss = window.getComputedStyle(image);
           let getFullImgUrl = getElementCss.getPropertyValue("background-image");
           let getImgUrlPos = getFullImgUrl.split("/img/");
           let setNewImgUrl = getImgUrlPos[1].replace('")', '');
           
           getLatestOpenedImg = galleri + 1;

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

    newImg.setAttribute("src", "projekt-4/img/" + calcNewImg + ".jpg");
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
  
  alert("Tak for din henvendelse! Vi konktakter dig inden for to dage");
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
/* slideshow forside */

var slideIndex,slides,dots,captionText;
function initGallery(){
    slideIndex = 0;
    slides=document.getElementsByClassName("imageHolder");
    slides[slideIndex].style.opacity=1;

    captionText=document.querySelector(".captionTextHolder .captionText");
    captionText.innerText=slides[slideIndex].querySelector(".captionText").innerText;

    if(slides.length<2){
        var nextPrevBtns=document.querySelector(".leftArrow,.rightArrow");
        nextPrevBtns.style.display="none";
        for (i = 0; i < nextPrevBtn.length; i++) {
            nextPrevBtn[i].style.display="none";
        }
    }

    //til prikker
    dots=[];
    var dotsContainer=document.getElementById("dotsContainer"),i;
    for (i = 0; i < slides.length; i++) {
        var dot=document.createElement("span");
        dot.classList.add("dots");
        dotsContainer.append(dot);
        dot.setAttribute("onclick","moveSlide("+i+")");
        dots.push(dot);
    }
    dots[slideIndex].classList.add("active");
}
initGallery();
function plusSlides(n) {
    moveSlide(slideIndex+n);
}
function moveSlide(n){
    var i;
    var current,next;
    var moveSlideAnimClass={
          forCurrent:"",
          forNext:""
    };
    var slideTextAnimClass;
    if(n>slideIndex) {
        if(n >= slides.length){n=0;}
        moveSlideAnimClass.forCurrent="moveLeftCurrentSlide";
        moveSlideAnimClass.forNext="moveLeftNextSlide";
        slideTextAnimClass="slideTextFromTop";
    }else if(n<slideIndex){
        if(n<0){n=slides.length-1;}
        moveSlideAnimClass.forCurrent="moveRightCurrentSlide";
        moveSlideAnimClass.forNext="moveRightPrevSlide";
        slideTextAnimClass="slideTextFromBottom";
    }

    if(n!=slideIndex){
        next = slides[n];
        current=slides[slideIndex];
        for (i = 0; i < slides.length; i++) {
            slides[i].className = "imageHolder";
            slides[i].style.opacity=0;
            dots[i].classList.remove("active");
        }
        current.classList.add(moveSlideAnimClass.forCurrent);
        next.classList.add(moveSlideAnimClass.forNext);
        dots[n].classList.add("active");
        slideIndex=n;
        captionText.style.display="none";
        captionText.className="captionText "+slideTextAnimClass;
        captionText.innerText=slides[n].querySelector(".captionText").innerText;
        captionText.style.display="block";
    }

}
var timer=null;
function setTimer(){
    timer=setInterval(function () {
        plusSlides(1) ;
    },10000);
}
setTimer();
function playPauseSlides() {
    var playPauseBtn=document.getElementById("playPause");
    if(timer==null){
        setTimer();
        playPauseBtn.style.backgroundPositionY="0px"
    }else{
        clearInterval(timer);
        timer=null;
        playPauseBtn.style.backgroundPositionY="-33px"
    }
}
/* slideshow slut */


/*indmeldelse */



		
			var fname, lname, email, gender, member;
			function _(x){
				return document.getElementById(x);
			}
			function processPhase1(){
                email = _("email").value;
				fname = _("firstname").value;
				lname = _("lastname").value;
				

				

				if(fname.length > 2 && lname.length > 2){
					_("phase1").style.display = "none";
					_("phase2").style.display = "block";
					_("progressBar").value = 33;
					_("status").innerHTML = "Trin 2 af 3";
				} else {
					alert("Udfyld venligst felterne");	
				}
			}
			function processPhase2(){
				gender = _("gender").value;
				if(gender.length > 0){
					_("phase2").style.display = "none";
					_("phase3").style.display = "block";
					_("progressBar").value = 66;
					_("status").innerHTML = "Trin 3 af 3";
				} else {
					alert("Vælg venligst dit køn");	
				}
			}
			function processPhase3(){
				member = _("member").value;
				if(member.length > 0){
					_("phase3").style.display = "none";
					_("show_all_data").style.display = "block";
					_("display_fname").innerHTML = fname;
					_("display_lname").innerHTML = lname;
					_("display_email").innerHTML = email;
					_("display_gender").innerHTML = gender;
					_("display_member").innerHTML = member;
					_("progressBar").value = 100;
					_("status").innerHTML = "Dine oplysninger";
				} else {
					alert("Vælg venligst dit medlemsskab");	
				}
			}
			function submitForm(){
				
				
				_("multiphase").submit();
				alert("Tak for din henvendelse! Vi konktakter dig inden for to dage");
			}
			

