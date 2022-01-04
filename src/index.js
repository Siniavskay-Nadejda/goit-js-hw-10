import './css/styles.css';
import debounce from "lodash.debounce";
import Notiflix from 'notiflix';
import fetchCountries from "./fetchCountries"
const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector("#search-box");
const ulEl = document.querySelector(".country-list")
inputEl.addEventListener("input", fetchCountries)
fetchCountries().then