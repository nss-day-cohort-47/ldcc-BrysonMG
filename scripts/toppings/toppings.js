import { useSnackCollection } from '../data/apiManager.js'

// export const filterByTopping = (toppingId) => {
//     const allSnacks = useSnackCollection();
//     let filteredArr = [];
//     for (const eachSnack of allSnacks) {
//         if (eachSnack.
//     }
// }

const topping2Option = (toppingObj) => {
    return `<option value="${toppingObj.id}">${toppingObj.name}</option>`
}

export const populateDropdown = () => {
    const DOMselector = document.querySelector('#toppingDropdown');
    let HTMLstring = '';
    return fetch("http://localhost:8088/toppings")
    .then(response => response.json())
    .then(toppingsArr => {
        for (const eachTopping of toppingsArr) {
            HTMLstring += topping2Option(eachTopping)
        }
        DOMselector.innerHTML = '<option selected disabled hidden>Select A Topping</option>' + HTMLstring;
    })
}

