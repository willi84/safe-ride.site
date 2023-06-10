import { displayRoute } from "./route/route";
import { handleErrorJSON } from "./fetch/fetch";
import { ID } from "./config";

const API_KEY = '5b3ce3597851110001cf624810937c89';
const DATA_URL = 'data.json';
const ROUTE_URL = 'route.json';
const UNFALL_URL = 'unfaelle.json';
let STREET_DATA;
let UNFAELLE = [];
const getCoordinates = (address: string): Promise<Array<number>> => {
  return new Promise((resolve, reject) => {
    const api = `https://api.openrouteservice.org/geocode/search?api_key=${API_KEY}${ID}&text=${address}&boundary.country=DE&layers=address`
    fetch(api)
    .then(handleErrorJSON).then(result => {
      resolve(result.features[0].geometry.coordinates);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
        reject(error);
    });
  });
}
const submitButton = document.querySelector('#search');
console.log(submitButton);
submitButton.addEventListener('click', (event) => {
  console.log('submint');
  const isRealata = (document.querySelector('#realData') as HTMLInputElement).checked;
  console.log(isRealata);
  const start = (document.querySelector('#start') as HTMLInputElement).value;
  const end = (document.querySelector('#end') as HTMLInputElement).value;
  console.log(start)
  let startCoords =[];
  let endCoords =[];
  (async () => {
    
    // do sth
    startCoords = await getCoordinates(start);
    endCoords = await getCoordinates(end);
    console.log('startCoords');
    console.log(startCoords);
    console.log(endCoords);
    const real = `https://api.openrouteservice.org/v2/directions/cycling-road?api_key=${API_KEY}${ID}&start=${startCoords.join(',')}&end=${endCoords.join(',')}`;
    // return 'ok';
    console.log(real);
    const route = isRealata ? `${real}` : ROUTE_URL;
    fetch(route)
    .then(handleErrorJSON).then(result => {
      displayRoute(result, STREET_DATA, UNFAELLE);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });

  })()
})

fetch(DATA_URL)
  .then(handleErrorJSON).then(result => {
    STREET_DATA = result;
    fetch(UNFALL_URL)
    .then(handleErrorJSON).then(result => {
      UNFAELLE = result;
      console.log(UNFAELLE)
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });