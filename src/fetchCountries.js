// export { fetchCountries }
// function fetchCountries(e) {
//     e.preventDefault();
 
//    const searchQuery = e.target.value;
//   return  fetch("https://restcountries.com/v2/all?fields={name},{capital},{population},{languages},{flags.svg},{name.official}")
//       .then(response => {
    
//         return response.json();
// })
    
// }

export function fetchCountries(name) {
  return fetch("https://restcountries.com/v2/all?fields=name,capital,population,flags,languages").then(response => {
   return response.json()
 })
}

