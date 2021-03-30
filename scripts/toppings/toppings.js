import { useSnackCollection } from '../data/apiManager.js'

const topping2Option = (toppingObj) => {
    //Converts a topping object to HTML
    return `<option value="${toppingObj.id}">${toppingObj.name}</option>`
}

export const populateDropdown = () => {
    const DOMselector = document.querySelector('#toppingDropdown');
    let HTMLstring = '';
    return fetch("http://localhost:8088/toppings")
    .then(response => response.json())
    .then(toppingsArr => {
        for (const eachTopping of toppingsArr) {
            //for each topping in the array, convert it to html and store it in an empty string
            HTMLstring += topping2Option(eachTopping)
        }
        DOMselector.innerHTML = '<option selected disabled hidden>Select A Topping</option>' + HTMLstring;
    })
}

