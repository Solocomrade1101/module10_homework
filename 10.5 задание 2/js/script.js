const button = document.querySelector('.button');

button.addEventListener('click', () => {
   alert(`
   Ширина экрана: ${window.screen.width}
   Высота экрана: ${window.screen.height}
   `)
});