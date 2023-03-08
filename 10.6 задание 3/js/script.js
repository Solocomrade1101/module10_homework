const input = document.querySelector('#input');
const buttonSub = document.querySelector('#button1');
const buttonGeo = document.querySelector('#button2');
const main = document.querySelector('.main');
const wsUrl = 'wss://echo-ws-service.herokuapp.com';

let websocket;

function writeToScreen(message, position = 'main__right', style) {
   let div = document.createElement('div');
   div.className = 'main__string';
   div.innerHTML = ` <div class=${position}><span ${style}>${message}</span> </div>`;
   main.append(div)
};

document.addEventListener('DOMContentLoaded', () => {
   websocket = new WebSocket(wsUrl);
   websocket.onopen = function (evt) {
      console.log('good')
   };

   websocket.onerror = function (evt) {
      console.log(evt.data)
   };

   websocket.onmessage = function (evt) {
      if (evt.data == input.value) {
         writeToScreen(evt.data, position = 'main__left');
      } else {
         let div = document.createElement('div');
         div.className = 'main__string';
         div.innerHTML = ` <div class='main__left'><a target="_blank" href =${evt.data}>Ваше местоположение</a> </div>`;
         main.append(div)
      }

      input.value = '';
      main.scrollTo({
         top: main.scrollHeight,
         behavior: "smooth"
      });
   };
});

buttonSub.addEventListener('click', () => {
   const message = input.value;
   writeToScreen(message);
   websocket.send(message);
});


buttonGeo.addEventListener('click', () => {
   writeToScreen("Гео-локация", 'main__right', 'style="color: #7ab6ff ;"');


   if (!navigator.geolocation) {
      writeToScreenGeo('ваш браузер не поддерживает геолокацию')
   } else {
      writeToScreenGeo('определение местоположения...');
      navigator.geolocation.getCurrentPosition(success, error);
   }
});

let success = (position) => {
   let latitude = position.coords.latitude;
   let longitude = position.coords.longitude;
   let href = `https://www.openstreetmap.org/#map=17/${latitude}/${longitude}`;
   websocket.send(href)
};


let error = () => {
   writeToScreenGeo('невозможно определить геолокацию')
};


function writeToScreenGeo(text) {
   let div = document.createElement('div');
   div.className = 'main__string';
   div.innerHTML = ` <div class='main__left'><p style="margin: 0;">${text}</p></div>`;
   main.append(div)
};

