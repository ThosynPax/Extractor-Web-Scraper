// Pop Up
document.addEventListener("DOMContentLoaded", function () {
    const rectangle = document.querySelector(".rectangle");
    const popup2 = document.getElementById("popup-2");

    rectangle.addEventListener("click", function (e) {
        e.stopPropagation();
        popup2.style.display = "block";
    });

    const closeIcon2 = document.querySelector(".close-icon-2");
    closeIcon2.addEventListener("click", function () {
        popup2.style.display = "none";
    });
});



 document.addEventListener("DOMContentLoaded", function() {
    const popupTrigger = document.getElementById("popup-trigger");
    const popup = document.getElementById("popup");
    const closeButton = document.getElementById("close-button");

    popupTrigger.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent the default link behavior
        popup.style.display = "block";
    });

    closeButton.addEventListener("click", function() {
        popup.style.display = "none";
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const website = document.querySelector(".website");
    const popup3 = document.getElementById("popup-3");

    website.addEventListener("click", function (e) {
        e.stopPropagation();
        popup3.style.display = "block";
    });

    const closeIcon3 = document.querySelector(".close-icon-3");
    closeIcon3.addEventListener("click", function () {
        popup3.style.display = "none";
    });
});

// IG Popup
document.addEventListener("DOMContentLoaded", function () {
    const instagramRectangle = document.querySelector(".rectangle.instagram");
    const instagramPopup = document.getElementById("popup-instagram");

    instagramRectangle.addEventListener("click", function (e) {
        e.stopPropagation();
        instagramPopup.style.display = "block";
    });

    const closeIconInstagram = document.querySelector(".close-icon-instagram");
    closeIconInstagram.addEventListener("click", function () {
        instagramPopup.style.display = "none";
    });
});

// FB Popup
document.addEventListener("DOMContentLoaded", function () {
    const facebookRectangle = document.querySelector(".rectangle.facebook");
    const facebookPopup = document.getElementById("popup-facebook");

    facebookRectangle.addEventListener("click", function (e) {
        e.stopPropagation();
        facebookPopup.style.display = "block";
    });

    const closeIconFacebook = document.querySelector(".close-icon-facebook");
    closeIconFacebook.addEventListener("click", function () {
        facebookPopup.style.display = "none";
    });
});

// FB Twitter
document.addEventListener("DOMContentLoaded", function () {
    const twitterRectangle = document.querySelector(".rectangle.twitter");
    const twitterPopup = document.getElementById("popup-twitter");

    twitterRectangle.addEventListener("click", function (e) {
        e.stopPropagation();
        twitterPopup.style.display = "block";
    });

    const closeIconTwitter = document.querySelector(".close-icon-twitter");
    closeIconTwitter.addEventListener("click", function () {
        twitterPopup.style.display = "none";
    });
});

// FB Linkedin
document.addEventListener("DOMContentLoaded", function () {
    const linkedinRectangle = document.querySelector(".rectangle.linkedin");
    const linkedinPopup = document.getElementById("popup-linkedin");

    linkedinRectangle.addEventListener("click", function (e) {
        e.stopPropagation();
        linkedinPopup.style.display = "block";
    });

    const closeIconLinkedin = document.querySelector(".close-icon-linkedin");
    closeIconLinkedin.addEventListener("click", function () {
        linkedinPopup.style.display = "none";
    });
});
