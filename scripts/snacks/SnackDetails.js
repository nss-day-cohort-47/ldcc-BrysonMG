export const SnackDetails = (snackObject, toppingsArray) => {
	let detailHTML = ''
	//for each object in the toppings array, add the value of the name property followed by a comma and space to our empty string
	//detailHTML becomes a string that lists out every topping name from the array passed into this function
	for (const eachTopping of toppingsArray) {
		detailHTML += `${eachTopping.name}, `
	}
	//return the HTML containing the snack objects info, and the toppings list
	return `
	<div class="col">
		<div class="card shadow-sm" >
            <img class="bd-placeholder-img card-img-top"  style="max-width: 540px;" aria-label="Placeholder:${snackObject.name}" preserveAspectRatio="xMidYMid slice" focusable="false" src="${snackObject.snackImg}" alt="${snackObject.name}">
            <div class="card-body">
				<h5 color="primary">${snackObject.name}</h5>
              	<p class="card-text">${snackObject.description}</p>
				 
				  <div class="container">
					<div class="row row-cols-2">
						<div class="col col-details">Type: ${snackObject.type.name}</div>
						<div class="col col-details">Shape: ${snackObject.shape.name}</div>
						<div class="col col-details">Flavor: ${snackObject.inFlavor.name}</div>
						<div class="col col-details">Season: ${snackObject.season.name}</div>
					</div>
					<div class="row row-cols-1">
						<div class="col col-details">${detailHTML}</div>
					</div>
				</div>
			  	
				<div class="d-flex justify-content-between align-items-center">
					<div class="btn-group">
					<button type="button" class="btn btn-sm btn-outline-secondary" id="editcake__${snackObject.id}" disabled>Edit</button>
					<button type="button" class="btn btn-sm btn-outline-secondary" id="deletecake__${snackObject.id}" disabled>Delete</button>
					</div>
                	<small class="text-muted">Count: ${snackObject.count}</small>
              	</div>
            </div>
    	</div>
	</div>
	`
}