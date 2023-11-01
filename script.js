const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');

registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
});
loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

const btnPopup = document.querySelector('.btnLogin-popup');

btnPopup.addEventListener('click', () => {
    wrapper.classList.add('active-popup');
});

const closeicon = document.querySelector('.close-icon');

closeicon.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
});