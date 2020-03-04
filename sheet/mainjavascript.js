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
    };

// dette er en kontakt formular til kontakt siden
function _(id){ return document.getElementById(id); }
function submitForm()

{
  alert("din besked er sendt");
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
	ajax.send( formdata );}
