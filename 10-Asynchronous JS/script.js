'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountryCard = function (data, className) {
  const languages = Object.values(data.languages).join(', ');
  const currencyName = Object.values(data.currencies)
    .map(c => c.name)
    .join(', ');
  const html = `
          <article class="country ${className}">
          <img class="country__img" src="${data.flags.png}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(3)} million people</p>
            <p class="country__row"><span>🗣️</span>${languages}</p>
            <p class="country__row"><span>💰</span>${currencyName}</p>
          </div>
        </article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

// using XMLHttpRequest
const getCountryData = function (country, className = '') {
  const req = new XMLHttpRequest();
  req.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  req.send();

  req.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    renderCountryCard(data, className);

    const neighbours = data.borders;
    const neighbourCode = neighbours.pop();
    if (!neighbourCode) return;

    const req2 = new XMLHttpRequest();
    req2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbourCode}`);
    req2.send();
    req2.addEventListener('load', function () {
      const [data2] = JSON.parse(this.responseText);
      renderCountryCard(data2, 'neighbour');
    });
  });
};

getCountryData('ukraine');

const renderError = function (msg) {
  countriesContainer.insertAdjacentElement('beforeend', msg);
  countriesContainer.opacity = 1;
};

const getContryDataPromise = function (country) {
  fetch('https://restcountries.com/v3.1/name/country')
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      renderCountryCard(...data);
    })
    .catch(err => {
      console.err(err);
      renderError(err.message);
    });
};

btn.addEventListener('click', function () {
  getContryDataPromise('Ukraine');
});

// const lottryPr = new Promise(function (resolve, reject) {
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       resolve('promise resolved succcesfully');
//     } else {
//       reject(new Error('promise is REJECTED'));
//     }
//   }, 2000);
// });
// lottryPr.then(msg => console.log(msg)).catch(err => console.error(err));

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

// wait(2)
//   .then(() => {
//     console.log('RESOLVED after 2 sec');
//     return wait(1);
//   })
//   .then(() => console.log('Waited for 1 sec more'));

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };
// getPosition().then(d => console.log(d));

// Render images using promises and Event Listeners
const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const el = document.createElement('img');
    el.src = imgPath;

    el.addEventListener('load', function () {
      const container = document.querySelector('.images');
      if (!container) return;
      container.appendChild(el);

      resolve(el);
    });

    el.addEventListener('error', function () {
      reject(new Error('Error loading an image'));
    });
  });
};

// Render images using then() chain after waiting for certain time
// let currentImage;
// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImage = img;

//     return wait(2);
//   })
//   .then(() => {
//     currentImage.style.display = 'none';

//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImage = img;

//     return wait(2);
//   })
//   .then(() => {
//     currentImage.style.display = 'none';

//     return createImage('img/img-3.jpg');
//   })
//   .then(img => {
//     currentImage = img;
//     return wait(2);
//   })
//   .then(() => {
//     img.style.display = 'none';
//   })
//   .catch(err => alert(err));

// Render images using async/await in IIFE after waiting for certain time
(async function () {
  try {
    let curImg = await createImage('img/img-1.jpg');
    await wait(2);
    img1.style.display = 'none';

    curImg = await createImage('img/img-1.jpg');
    await wait(2);
    img2.style.display = 'none';

    curImg = await createImage('img/img-1.jpg');
    await wait(2);
    img3.style.display = 'none';
  } catch (err) {
    console.log(`Something went wring ${err.message}`);
  }
});

const imgArr = ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg'];
const loadAll = async function (imgArr) {
  const imgs = imgArr.map(async img => await createImage(img));
  const res = await Promise.all(imgs);
  res.forEach(img => img.classList.add('parallel'));
};

loadAll(imgArr);

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(resp => {
    if (!resp.ok) throw new Error(`${errorMsg} (code: ${resp.status})`);
    return resp.json();
  });
};

const get3Countries = async function (c1, c2, c3) {
  try {
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/alpha/${c1}`),
      getJSON(`https://restcountries.com/v3.1/alpha/${c2}`),
      getJSON(`https://restcountries.com/v3.1/alpha/${c3}`),
    ]);

    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.error(err);
  }
};
get3Countries('ukr', 'deu', 'fra');

(async function () {
  try {
    const res = await Promise.race([
      // const res = await Promise.allSettled([
      // const res = await Promise.any([
      // const res = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/alpha/ukr`),
      getJSON(`https://restcountries.com/v3.1/alpha/deu`),
      getJSON(`https://restcountries.com/v3.1/alpha/fra`),
    ]);
  } catch (err) {
    console.error(err);
  }
})();

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Took too long to receive a response'));
    }, s * 1000);
  });
};
