// JavaScript for toggling the mobile menu
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const submenu = document.querySelector('.submenu');


menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('show'); // Toggle the 'show' class on the mobile menu
});
