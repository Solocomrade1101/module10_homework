const button = document.querySelector('.button');
const div = document.querySelector('.button__icons');
const icons1 = document.querySelector('#one')
const icons2 = document.querySelector('#two')

button.addEventListener('click', () => {
   icons1.classList.toggle('none')
   icons2.classList.toggle('block')
})