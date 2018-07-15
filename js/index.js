// Adopted from https://bananiumlabs.com
// Created for https://launchhacks.tech
if (typeof ($) === undefined || typeof ($) === null) {
    alert("Core site resources failed to load. Please make sure your browser" + 
    " is JavaScript compatible!");
}
$(document).ready(function () {
    // Custom jQuery by Eric Q. 

    // Load page resources
    if (document.getElementById("nav") !== null && document.getElementById("nav") !== undefined) {
        $('#nav').load("resources/nav.html");   
    }

    if (document.getElementById("member") !== null && document.getElementById("member") !== undefined) {
        $('#member').load("resources/member.html");
    }

    if (document.getElementById("team") !== null && document.getElementById("team") !== undefined) {
        $('#team').load("resources/team.html");
    }

    if (document.getElementById("representativeWrapper") !== null && document.getElementById("representativeWrapper") !== undefined) {
        $('#representativeWrapper').load("resources/representative.html");
    }

    // Detect browser to load the correct svg
    var bannerFile = '../img/banner-animated.svg'; //default (Chrome/Opera)
    if (typeof InstallTrigger !== 'undefined')  { //Firefox 
        console.log('Using Firefox');
        bannerFile = '../img/banner-animated-firefox.svg';
    }
    else if (!!window.StyleMedia)  {// Edge
        console.log('Using Edge');
        bannerFile = '../img/banner-animated-edge.svg';
    }

    // Animate logo movements
    const logo = new Vivus('bannerLogo', {
        file: bannerFile,
        reverseStack: true,
        onReady: function(bannerLogoVivus) {
            bannerLogoVivus.play(2);
        }
    });

    // Animate navbar when scrolled
    $(window).scroll(function () {
        // Change int to configure how many pixels must be scrolled before navbar
        // appears
        if ($(this).scrollTop() > 100) {
            $('.navbar').fadeIn();
        } else {
            $('.navbar').fadeOut();
        }
    });

    // User Tracking
    $('#downloadSP').click(function() {
        // Internal metrics recording
        console.log('Sponsor Packet Download Initialized!');
        
    });
    // --- Reserved END Custom jQuery---

    console.log('init');
    // Select all links with hashes
    $('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function (event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == 
                this.pathname.replace(/^\//, '') && location.hostname === this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: (target.offset().top - $('nav').outerHeight())
                    }, 1000, function () {
                        // Callback after animation
                        // Must change focus!
                        target.focus();
                        // if (target.is(":focus")) { // Checking if the target was focused
                        //     return false;
                        // } else {
                        //     target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                        //     target.focus(); // Set focus again
                        // };
                    });
                }
            }
        });
});