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

           
       }
       })
    }

function closeImg() {
    document.querySelector(".img-window").remove();

}

// dette er en kontakt formular til kontakt siden
function _(id){ return document.getElementById(id); }
function submitForm(kontaktside){
  
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
            



/**
 * Smooth scroll to section
 */
// Get all elements with the data-scroll attribute
var dataScroll = document.querySelectorAll('[data-scroll]');
// Navigation height
var navigationHeight = 130;

// Scroll to a section with an id that matches scrollID
function scrollToElement(scrollID) {
    // Get element with the id scrollID
    var scrollElement = document.getElementById(scrollID);
    // Get distance from top of element to top of page
    var distance = window.pageYOffset + scrollElement.getBoundingClientRect().top;

    // Scroll to distance variable minus the navigation height
    window.scroll({
        top: distance - navigationHeight,
        behavior: 'smooth'
    });
}

// Function to add event listeners for smooth scroll to section
function initSmoothScroll() {
    // Loop through the dataScroll array and add a click event listener
    for (var i = 0; i < dataScroll.length; i++) {
        var element = dataScroll[i];

        element.addEventListener('click', function (event) {
            // Prevent default link behavior
            event.preventDefault();
            console.log('test');

            // Get id from data-scroll attribute and pass it to scrollToElement
            var scrollID = this.getAttribute('data-scroll');
            scrollToElement(scrollID)
        });
    }
}

initSmoothScroll();