const username = document.querySelector('#username');
const password = document.querySelector('#password');
const repeatPassword = document.querySelector('#repeatPassword');
const email = document.querySelector('#email');
const sendBtn = document.querySelector('.send');
const clearBtn = document.querySelector('.clear');
const popup = document.querySelector('.popup');
const closeBtn = document.querySelector('.close');


const emailRegex =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



const showError = (input, msg) => {
	const formBox = input.parentElement;
	const errorMsg = formBox.querySelector('.error-text');
	errorMsg.classList.add('error');
	errorMsg.textContent = msg;
};


const checkErrors = () => {
	const allInputs = document.querySelectorAll('.error');
	let errorCount = 0;

	allInputs.forEach((el) => {
		if (el.classList.contains('error')) {
			errorCount++;
		}
	});
	if (errorCount === 0) {
		popup.classList.add('show-popup');
	}
};




const checkForm = (input) => {
	input.forEach((el) => {
		if (el.value === '') {
			showError(el, el.placeholder);
		} else {
			clearError(el);
		}
	});
};




const clearError = (input) => {
	const formBox = input.parentElement;
	const errorMsg = formBox.querySelector('.error-text');
	errorMsg.classList.remove('error');
	errorMsg.textContent = '';
};




const checkLength = (input, min) => {
	if (input.value.length < min) {
		showError(
			input,
			`${input.previousElementSibling.innerText.slice(
				0,
				-1
			)} must contain ${min} characters`
		);
	}
};




const checkPassword = (pass1, pass2) => {
	if (pass1.value !== pass2.value) {
		showError(pass2, 'Passwords do not match.');
	}
};




const checkMail = (el) => {
	if (el.test(email.value)) {
		clearError(email);
	} else {
		showError(email, 'E-mail is incorrect');
	}
};



const clearAll = () => {
	[username, password, repeatPassword, email].forEach((el) => {
		el.value = '';
		clearError(el);
	});
};



sendBtn.addEventListener('click', (e) => {
	e.preventDefault();
	checkForm([username, password, repeatPassword, email]);
	checkLength(username, 5);
	checkLength(password, 8);
	checkPassword(password, repeatPassword);
	checkMail(emailRegex);
	checkErrors();
});




clearBtn.addEventListener('click', (e) => {
	e.preventDefault();
	clearAll();
});



closeBtn.addEventListener('click', (e) => {
	e.preventDefault();
	popup.classList.remove('show-popup');
	clearAll();
});

