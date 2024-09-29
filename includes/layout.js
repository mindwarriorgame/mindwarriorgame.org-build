const menuBtn = document.querySelector(".menu-btn");
menuBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    document.body.classList.toggle("menu-open");
});

document.body.addEventListener("click", () => {
    document.body.classList.remove("menu-open");
});

const sidebar = document.querySelector('.sidebar');

const hasScrollbar = sidebar.scrollHeight > sidebar.clientHeight;

if (hasScrollbar) {
    sidebar.addEventListener('scroll', function () {
        if (sidebar.scrollTop > 0) {
            sidebar.classList.add('scrolled');
        } else {
            sidebar.classList.remove('scrolled');
        }
    });
} else {
    sidebar.classList.add('scrolled');
}

sidebar.querySelectorAll('li').forEach((li) => {
    li.addEventListener('click', () => {
        const linkInside = li.querySelector('a');
        if (linkInside) {
            linkInside.click();
        }
    });
});