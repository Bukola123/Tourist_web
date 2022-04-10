
let form = document.querySelector("#form");
let myfirstNames = document.querySelector("#myFirstName");
let mylastName = document.querySelector("#myLastName");
let myemail = document.querySelector("#myemail");
let mainContainer = document.querySelector("#main-container");



// Adding event listeners

function signupNotification(event) {
	event.preventDefault();
    
	const userName = myfirstNames.value;
	const userEmail = myemail.value;
	
	
	let paragraph = document.createElement("p");

	paragraph.classList.add("form-pop-up");
	paragraph.innerHTML = `Hello <span class = 'pop-up-name'>${userName}</span>, thank you for signing up. A verification link has been sent to ${userEmail}`;
	mainContainer.style.display = "none";
	form.style.display = "none";
	form.submit();
	main.prepend(paragraph);
	
};

form.addEventListener("submit", signupNotification);