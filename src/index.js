import './css/styles.css';
import debounce from "lodash.debounce";
import Notiflix from 'notiflix';
import { fetchCountries } from "./fetchCountries"

const DEBOUNCE_DELAY = 300;
const countryInputRef = document.querySelector('#search-box')
const countryListRef = document.querySelector('.country-list')
const countryInfoRef = document.querySelector('.country-info')

countryInputRef.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY))

function onInput() {
  const name = countryInputRef.value.trim()
  if (name === '') {
    return (countryListRef.innerHTML = ''), (countryInfoRef.innerHTML = '')
  }

  fetchCountries(name)
    .then(countries => {
      countryListRef.innerHTML = ''
      countryInfoRef.innerHTML = ''
      if (countries.length === 1) {
        countryListRef.insertAdjacentHTML('beforeend', renderList(countries))
        countryInfoRef.insertAdjacentHTML('beforeend', renderInfo(countries))
      } else if (countries.length >= 10) {
        
           Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
      } else {
        countryListRef.insertAdjacentHTML('beforeend', renderList(countries))
      }
    })
        .catch(erorr => {
         Notiflix.Notify.failure('Oops, there is no country with that name')
    })
}

function renderList(countries) {
  const markup = countries
    .map(({ name, flags }) => {
      return `
          <li class="country-list__item">
               <img class="country-list__flag" src="${flags.svg}" alt="Flag of ${name.official}" width = 30px height = 30px>
              <h2 class="country-list__name">${name.official}</h2>
          </li>
          `
    })
    .join('')
  return markup
}

function renderInfo(countries) {
  const markup = countries
    .map(({ capital, population, languages }) => {
      return `
        <ul class="country-info__list">
            <li class="country-info__item"><p><b>Capital: </b>${capital}</p></li>
            <li class="country-info__item"><p><b>Population: </b>${population}</p></li>
            <li class="country-info__item"><p><b>Languages: </b>${Object.values(languages).join('')}</p></li>
        </ul>
        `
    })
    .join('')
  return markup
}


