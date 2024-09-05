'use strict';

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);
  clicks = 0;

  constructor(coords, distance, duration) {
    this.coords = coords;
    this.distance = distance;
    this.duration = duration;
  }

  _setDescription() {
    // prettier-ignore
    const monthsOfYear = [
      "January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"
    ];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }

  click() {
    this.clicks++;
  }
}

class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }

  calcPace() {
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this._setDescription();
  }

  calcSpeed() {
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

class App {
  #map;
  #mapEvent;
  #workouts = [];
  #mapZoomLevel = 13;

  constructor() {
    this._getPosition();
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
    containerWorkouts.addEventListener('click', this._moveToPopUp.bind(this));
    this._getLocalStorage('workout');
  }

  _getPosition() {
    if (!navigator.geolocation) alert('Cannot use navigation in your browser');

    navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), () =>
      alert('Something went wrong!')
    );
  }

  _loadMap(pos) {
    const { latitude, longitude } = pos.coords;
    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);
    L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    L.marker(coords).addTo(this.#map).bindPopup('You are here!').openPopup();

    this.#map.on('click', this._showForm.bind(this));

    this.#workouts.forEach(w => this._renderWorkoutMarker(w));
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    const validInputs = (...inputs) => inputs.every(i => Number.isFinite(i));
    const allPositive = (...inputs) => inputs.every(i => i > 0);
    e.preventDefault();

    const { lat, lng } = this.#mapEvent.latlng;
    const workoutType = inputType.value;
    const distance = Number(inputDistance.value);
    const duration = Number(inputDuration.value);

    let newWorkout;
    if (workoutType === 'running') {
      const cadence = Number(inputCadence.value);
      if (
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      ) {
        alert('Check your input. Input only numbers');
      }

      newWorkout = new Running([lat, lng], distance, duration, cadence);
    }

    if (inputType.value === 'cycling') {
      const elevation = Number(inputElevation.value);

      console.log(elevation);
      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      ) {
        alert('Check your input. Input only positive numbers');
      }

      newWorkout = new Cycling([lat, lng], distance, duration, elevation);
    }
    this.#workouts.push(newWorkout);
    console.log(this.#workouts);

    this._renderWorkoutMarker(newWorkout);

    this._renderWorkout(newWorkout);

    this._hideForm();

    this._setLocalStorage('workout');
  }

  _hideForm() {
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';

    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }

  _renderWorkout(w) {
    let html = `
        <li class="workout workout--${w.type}" data-id=${w.id}>
          <h2 class="workout__title">${w.description}</h2>
          <div class="workout__details">
            <span class="workout__icon">${
              w.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
            }</span>
            <span class="workout__value">${w.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${w.duration}</span>
            <span class="workout__unit">min</span>
          </div>`;

    if (w.type === 'running') {
      html += `
            <div class="workout__details">
              <span class="workout__icon">⚡️</span>
              <span class="workout__value">${w.pace.toFixed(1)}/span>
              <span class="workout__unit">min/km</span>
            </div>
            <div class="workout__details">
              <span class="workout__icon">🦶🏼</span>
              <span class="workout__value">${w.cadence}</span>
             <span class="workout__unit">spm</span>
            </div>
         </li>`;
    }

    if (w.type === 'cycling') {
      html += `
      <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${w.calcSpeed().toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${w.elevationGain}</span>
            <span class="workout__unit">m</span>
          </div>
        </li>`;
    }

    form.insertAdjacentHTML('afterend', html);
  }

  _renderWorkoutMarker(w) {
    L.marker(w.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${w.type}-popup`,
        })
      )
      .setPopupContent(
        `${w.type === 'running' ? '🏃‍♂️' : '🚴‍♀️' + ' '} ${w.description}`
      )
      .openPopup();
  }

  _moveToPopUp(e) {
    const wEl = e.target.closest('.workout');
    if (!wEl) return;

    const w = this.#workouts.find(w => w.id === wEl.dataset.id);
    this.#map.setView(w.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
  }

  _setLocalStorage(key) {
    localStorage.setItem(key, JSON.stringify(this.#workouts));
  }

  _getLocalStorage(key) {
    const data = JSON.parse(localStorage.getItem(key));
    if (!data) return;

    this.#workouts = data;
    this.#workouts.forEach(w => this._renderWorkout(w));
  }

  reset(key) {
    localStorage.removeItem(key);
    location.reload();
  }
}

const app = new App();
