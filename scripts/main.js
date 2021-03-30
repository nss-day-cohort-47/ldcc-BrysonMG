import { LoginForm } from "./auth/LoginForm.js";
import { RegisterForm } from "./auth/RegisterForm.js";
import { NavBar } from "./nav/NavBar.js";
import { SnackList } from "./snacks/SnackList.js";
import { SnackDetails } from "./snacks/SnackDetails.js";
import { Footer } from "./nav/Footer.js";
import { populateDropdown } from './toppings/toppings.js';
import {
	logoutUser, setLoggedInUser, loginUser, registerUser, getLoggedInUser,
	getSnacks, getSingleSnack, useSnackCollection
} from "./data/apiManager.js";



const applicationElement = document.querySelector("#ldsnacks");

//login/register listeners
applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id === "login__submit") {
		//collect all the details into an object
		const userObject = {
			name: document.querySelector("input[name='name']").value,
			email: document.querySelector("input[name='email']").value
		}
		loginUser(userObject)
			.then(dbUserObj => {
				if (dbUserObj) {
					sessionStorage.setItem("user", JSON.stringify(dbUserObj));
					startLDSnacks();
				} else {
					//got a false value - no user
					applicationElement.innerHTML = ""
					applicationElement.innerHTML = `${NavBar()}<p class="center">That user does not exist. Please try again or register for your free account.</p> ${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
				}
			})
	} else if (event.target.id === "register__submit") {
		//collect all the details into an object
		const userObject = {
			name: document.querySelector("input[name='registerName']").value,
			email: document.querySelector("input[name='registerEmail']").value,
			isAdmin: false
		}
		registerUser(userObject)
			.then(dbUserObj => {
				sessionStorage.setItem("user", JSON.stringify(dbUserObj));
				startLDSnacks();
			})
	}
})

applicationElement.addEventListener("click", event => {
	if (event.target.id === "logout") {
		logoutUser();
		sessionStorage.clear();
		checkForUser();
	}
})
// end login register listeners

//Topping Dropdown listener
applicationElement.addEventListener("change", event => {
	if (event.target.id === "toppingDropdown") {
		const index = event.target.options.selectedIndex;
		//Below - This variable is the ID of the selected topping
		const selectedOptionId = event.target.options[index].value;
		const snackArr = useSnackCollection()
		
		const filteredArr = snackArr.filter(eachSnack => {
			//check eachSnack of snackArr. Access the snackToppings property which is an array of objects
			//each object in that array is a topping on that snack (eachSnack)
			//inside that array .find aTopping whose toppingId matches the selectedOptionId that we get from our dropdown selection
			//.find returns an undefined each time the ids don't match, so if it evaluates truthy, return that snack
			//filteredArr becomes an array containing all of the snack objects containing the selected topping
			const snack = eachSnack.snackToppings.find(aTopping => aTopping.toppingId === parseInt(selectedOptionId))
			if (snack) {
				return eachSnack
			}
		})
		const divSelector = document.querySelector("#mainContent")
		divSelector.innerHTML = SnackList(filteredArr)

	}
})

//End Topping Dropdown listener

// snack listeners
applicationElement.addEventListener("click", event => {
	event.preventDefault();

	if (event.target.id.startsWith("detailscake")) {
		const snackId = event.target.id.split("__")[1];
		//first we get the one snack from the db whose detail button we clicked
		getSingleSnack(snackId)
			.then(snackObj => {
				//Do another fetch to get all snackToppings relationships, and _expand topping to get the name of each topping
				return fetch("http://localhost:8088/snackToppings?_expand=topping")
				.then(resp => resp.json())
				.then(arr => {
					//this fetch returns an array of objects
					//declare an empty array to store the objects we want
					let arrOfToppings = []
					//for each object in the array, if the objects snackId matches the id of the snack collected by our button click...
					//push the value of the topping property (an object with the topping name) of the object that matched to our empty array
					//arrOfToppings becomes an array of objects containing the names of the toppings our selected snack has
					for (const eachThing of arr) {
						if(eachThing.snackId === parseInt(snackId)) {
							arrOfToppings.push(eachThing.topping)
						}
					}
					//Pass our selected snackObj and our array of toppings into the showDetails function
					showDetails(snackObj, arrOfToppings);
					})

			})
	}
})

applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id === "allSnacks") {
		showSnackList();
	}
})

const showDetails = (snackObj, toppingsArray) => {
	const listElement = document.querySelector("#mainContent");
	listElement.innerHTML = SnackDetails(snackObj, toppingsArray);
}
//end snack listeners

const checkForUser = () => {
	if (sessionStorage.getItem("user")) {
		setLoggedInUser(JSON.parse(sessionStorage.getItem("user")));
		startLDSnacks();
	} else {
		applicationElement.innerHTML = "";
		//show login/register
		showNavBar()
		showLoginRegister();
	}
}

const showLoginRegister = () => {
	//template strings can be used here too
	applicationElement.innerHTML += `${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
}

const showNavBar = () => {
	applicationElement.innerHTML += NavBar();
}

const showSnackList = () => {
	getSnacks().then(allSnacks => {
		const listElement = document.querySelector("#mainContent")
		listElement.innerHTML = SnackList(allSnacks);
	})
}

const showFooter = () => {
	applicationElement.innerHTML += Footer();
}

const startLDSnacks = () => {
	applicationElement.innerHTML = "";
	showNavBar();
	applicationElement.innerHTML += `<div id="mainContent"></div>`;
	showSnackList();
	showFooter();
	populateDropdown();
	
}

checkForUser();