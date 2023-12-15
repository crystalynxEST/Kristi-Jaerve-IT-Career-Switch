$(window).on('load', function() {
  $('#preloader').fadeOut('slow', function() {
      $(this).remove();
      
  });
});


// resize header to size of browser window

var ready = (callback) => {
	if (document.readyState != "loading") callback();
	else document.addEventListener("DOMContentLoaded", callback);
}

ready(() => { 
	document.querySelector(".header").style.height = window.innerHeight + "px";
})

/* --------------- CONTACT ME ----------------- */

function email(data) {
	const message = document.getElementById("status-message")
	fetch("php/app.php", {
		method: "POST",
		body: data,
		headers: {
			'X-Requested-With' : 'XMLHttpRequest'
		}
	})
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok.');
            console.log(response)
        }
        return response.json();
    })
    .then(response => {
        message.innerHTML = response.message;
        console.log(response)

        // Clear the form fields
        document.getElementById("contact-form").reset();
    })
    .catch(error => {
        console.error("Error caught:", error);
        message.innerHTML = "An error occurred: " + error.message;

        
    });
}

// Form
const form = document.getElementById("contact-form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    email(formData);
  });


document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting immediately
    
    // Show the loader and hide the form
    document.getElementById("loader").style.display = "block";
    // document.getElementById("contact-form").style.display = "none";
    
    setTimeout(function () {
      // After submission is complete, hide the loader and show the response message
      document.getElementById("loader").style.display = "none";
      document.getElementById("status-message").textContent = "Form submitted successfully!";
    }, 2000); // Simulate a 2-second delay
  });
  

  /* ----------------- CAROUSEL ------------------ */
  $(function(){

    $('.carousel-item').eq(0).addClass('active');

    var total = $('.carousel-item').length;
    var current = 0;

    $('#moveRight').on('click', function(){
      var next=current;
      current= current+1;
      setSlide(next, current);
    });

    $('#moveLeft').on('click', function(){
      var prev=current;
      current = current- 1;
      setSlide(prev, current);
    });

    function setSlide(prev, next){
      var slide= current;
      if(next>total-1){
        slide=0;
        current=0;
      }

      if(next<0){
        slide=total - 1;
        current=total - 1;
      }


        $('.carousel-item').eq(prev).removeClass('active');
        $('.carousel-item').eq(slide).addClass('active');
        setTimeout(function(){
        },800);
      // console.log('current '+current);
      // console.log('prev '+prev);
    }
  });