import { SVG } from "../config";
import { CIRCLE } from "../svg";

const getIcon = (item: string) => {
    if(SVG[item]){
        return `<img src="${SVG[item]}" width="40" height="40">`
    } else {
        return '';
    }
}
const getCategoryList = (items: Array<string>) => {
    let html = '';
    items.forEach((item: string) => {
        const pictogram = getIcon(item);
        if(pictogram){
            html += `<li>${pictogram}<br /><small>${item}</small></li>`;      
        }
    });
    return items.length > 0 ? `<ul class="categories">${html}</ul>` : '';
}

export const displayRoute = (result, streets) => {
    const main = document.querySelector('#result');
    const route = result.features[0].properties.segments[0];
    console.log(route);
    console.log(result.features[0]);
    const steps = route.steps;
    const STREETS = Object.keys(streets);
    let listHTML = '';
    steps.forEach((step: any) => {
      const headline = step.name !== '-' ? `${step.name}` : '';
      console.log(STREETS.indexOf(step.name))
      const street = STREETS[STREETS.indexOf(step.name)];
      console.log(street)
      const streetData = streets[street].categories;
      const listCategories = getCategoryList(streetData);
      console.log(streetData)
      if(headline !== '') {
        listHTML += `
        <li class="street">
              ${CIRCLE}
                <details>
                  <summary>${headline}  (${step.distance}m)</summary>
                  ${listCategories}
                  </details>
                  <p>${step.instruction}</p>
                </li>
                `
      }

    });
    main.innerHTML = listHTML;
}