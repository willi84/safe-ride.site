import { MAX_FLOAT_DECIMAL } from "./../../../config";
import { reduceFloat } from "./../../../_shared/tools/tools";
import { SVG } from "../config";
import { CIRCLE } from "../svg";

const getIcon = (item: string) => {
    if (SVG[item]) {
        return `<img src="${SVG[item]}" width="40" height="40">`
    } else {
        return '';
    }
}
const getCategoryList = (items: Array<string>) => {
    let html = '';
    items.forEach((item: string) => {
        const pictogram = getIcon(item);
        if (pictogram) {
            html += `<li>${pictogram}<br /><small>${item}</small></li>`;
        }
    });
    return items.length > 0 ? `<ul class="categories">${html}</ul>` : '';
}

export const displayRoute = (result, streets, UNFAELLE) => {
    const main = document.querySelector('#result');
    const route = result.features[0].properties.segments[0];
    const coordinates = result.features[0].geometry.coordinates;
    const steps = route.steps;
    const STREETS = Object.keys(streets);
    let listHTML = '';
    steps.forEach((step: any) => {
        const headline = step.name !== '-' ? `${step.name}` : '';
        const points = step.way_points;
        const min = points[0];
        const max = points[1];
        const found = [];
        const coordinatesOpt = coordinates.map((pair: any) => {
            const newLong = reduceFloat((pair[0]).toString(), MAX_FLOAT_DECIMAL);
            const newLat = reduceFloat((pair[1]).toString(), MAX_FLOAT_DECIMAL);
            return [newLong, newLat]
        })
        const relevantCoors = coordinatesOpt.filter((item: any, index: number) => index >= min && index <= max)
        relevantCoors.forEach((element: Array<number>, index: number) => {
                const unfaelle = (UNFAELLE.unfaelle).map((item: any) => item[0])
                unfaelle.forEach(unfall => {
                    if(unfall[0] === element[0] && unfall[1] === element[1]){
                        found.push(element);

                    }
                });

        });
        const street = STREETS[STREETS.indexOf(step.name)];
        const FOUND_ACCIDENTS = found.filter((item, index, self) => {
            return index === self.findIndex((innerItem) => {
              return innerItem[0] === item[0] && innerItem[1] === item[1];
            });
          })

        const streetData = streets[street].categories;
        const listCategories = getCategoryList(streetData);
        if (headline !== '') {
            const numAccidents = FOUND_ACCIDENTS.length;
            let level = 0;
            if(numAccidents >= 1 && numAccidents <= 5){
                level = 1;
            } else if(numAccidents >= 6 && numAccidents <= 19){
                level = 2;
            } else if(numAccidents >= 20){
                level = 3;

            }
            const accidentLevel = `accidents_${level}.svg`;
            listHTML += `
        <li class="street">
              ${CIRCLE}
                <details>
                  <summary>${headline}  (${step.distance}m)</summary>
                  <table>
                    <tr>
                    <td>${numAccidents} x accidents (2021)</td>
                        <td>
                        <ul class="categories"><li><img src="icons/${accidentLevel}" width="40" height="40"></li></ul>
                        </td>
                    </tr>
                    <tr>
                        <td>Beschaffenheit</td>
                        <td>${listCategories}</td>
                    </tr>
                  </table>
                  </details>
                  <p>${step.instruction}</p>
                </li>
                `
        }

    });
    main.innerHTML = listHTML;
}