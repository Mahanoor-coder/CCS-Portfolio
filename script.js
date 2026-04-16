// ===== DOM READY =====
document.addEventListener("DOMContentLoaded", function () {

    /* ===== MOBILE MENU TOGGLE ===== */
    const toggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    toggle.addEventListener("click", function() {
        navLinks.classList.toggle("active");
    });

    /* ===== SLIDER ===== */
    const slides = document.querySelectorAll('.slide');
    const next = document.querySelector('.next');
    const prev = document.querySelector('.prev');
    let index = 0;
    let autoSlide;

    function showSlide(i){
        slides.forEach(slide => slide.classList.remove('active'));
        slides[i].classList.add('active');
    }

    function nextSlide(){ index = (index+1)%slides.length; showSlide(index); }
    function prevSlide(){ index = (index-1+slides.length)%slides.length; showSlide(index); }

    if(next){ next.addEventListener('click', ()=>{ nextSlide(); clearInterval(autoSlide); }); }
    if(prev){ prev.addEventListener('click', ()=>{ prevSlide(); clearInterval(autoSlide); }); }

    function startAutoSlide(){ autoSlide = setInterval(nextSlide,4000); }
    function stopAutoSlide(){ clearInterval(autoSlide); }

    const slider = document.querySelector('.slider');
    if(slider){
        slider.addEventListener('mouseenter', stopAutoSlide);
        slider.addEventListener('mouseleave', startAutoSlide);
    }

    if(slides.length>0){ showSlide(index); startAutoSlide(); }

    /* ===== GALLERY FILTER ===== */
    window.filterSelection = function(category){
        const items = document.querySelectorAll(".gallery-item");
        items.forEach(item => {
            item.style.display = (category=="all" || item.classList.contains(category)) ? "block" : "none";
        });
    }
    filterSelection("all");

    /* ===== GALLERY LIGHTBOX ===== */
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");

    window.openLightbox = function(src){
        lightbox.style.display="flex";
        lightboxImg.src=src;
    }
    window.closeLightbox = function(){ lightbox.style.display="none"; }

    /* ===== ACTIVE NAV LINK HIGHLIGHT ===== */
    const sections = document.querySelectorAll("section, footer");
    const navLinksAll = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", function(){
        let current = "";
        sections.forEach(section=>{
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if(pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight){
                current = section.getAttribute("id");
            }
        });

        navLinksAll.forEach(link=>{
            link.classList.remove("active");
            if(link.getAttribute("href")=="#"+current){
                link.classList.add("active");
            }
        });
    });

    /* ===== NAVBAR SCROLL BACKGROUND ===== */
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function(){
        if(window.scrollY > 50){ navbar.classList.add('scrolled'); }
        else{ navbar.classList.remove('scrolled'); }
    });

});