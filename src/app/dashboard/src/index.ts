import { displayRoute } from "./route/route";
import { handleErrorJSON } from "./fetch/fetch";

const DATA_URL = 'data.json';
const ROUTE_URL = 'route.json';
console.log('hello world');
let STREET_DATA;
const submitButton = document.querySelector('#search');
console.log(submitButton);
submitButton.addEventListener('click', (event) => {
  console.log('submint');
  fetch(ROUTE_URL)
  .then(handleErrorJSON).then(result => {
    displayRoute(result, STREET_DATA);
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
})

fetch(DATA_URL)
  .then(handleErrorJSON).then(result => {
    STREET_DATA = result;
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

// fetch(ROUTE_URL)
//   .then(handleErrorJSON).then(result => {
//     displayRoute(result);
//   })
//   .catch(error => {
//     console.error('There was a problem with the fetch operation:', error);
//   });