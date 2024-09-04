// Responsive NavBar Toggle
document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('ul');
    const navToggle = document.createElement('div');
    navToggle.classList.add('nav-toggle');
    navToggle.innerHTML = '<span>&#9776;</span>';
    document.querySelector('.main').prepend(navToggle);

    navToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
    });
});
