const popup = document.getElementById("image-popup");
const popupImg = document.getElementById("popup-image");
const closeBtn = document.querySelector(".close-btn");

document.querySelectorAll('.image-link').forEach(function(link) {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        popup.style.display = "block";
        popupImg.src = this.href;
    });
});


closeBtn.onclick = function() {
    popup.style.display = "none";
}

popup.onclick = function(event) {
    if (event.target === popup) {
        popup.style.display = "none";
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        popup.style.display = "none";
    }
});