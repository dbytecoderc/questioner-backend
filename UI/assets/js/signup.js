const apiUrl = 'https://enigmatic-refuge-95413.herokuapp.com/api/v1/auth/signup';
const windowUrlArray = window.location.href.split('/');
windowUrlArray.pop();
const windowUrl = windowUrlArray.join('/');
const first_name = document.querySelector('#first-name');
const last_name = document.querySelector('#last-name');
const e_mail = document.querySelector('#email');
const phone_number = document.querySelector('#phone-number');
const user_name = document.querySelector('#user-name');
const pass_word = document.querySelector('#password');
const confirm_password = document.querySelector('#confirm-password');

//NOT YET FUNCTIONAL
const inputFields = [
  first_name, last_name, e_mail, phone_number,
  user_name, pass_word, confirm_password,
];


function showAlert(message, className) {
  const div = document.createElement('div');
  //Add ClassName
  div.className = `alert ${className}`;
  const p = document.createElement("p");
  p.appendChild(document.createTextNode(message));
  div.appendChild(p);

  const container = document.querySelector('.signup--section');
  const form = document.querySelector('.signup--form');

  //Insert alert
  container.insertBefore(div, form);
  //Timeout after 5 seconds
  setTimeout(function () {
    document.querySelector('.alert').remove();
  }, 5000);
}

function clearAlert() {
  document.getElementById('number').value = '';
}

//NOT YET FUNCTIONAL
const removeClass = (errorclass) => {
  const errorText = document.querySelector(errorclass);
  if (errorText) {
    errorText.display.hidden = true;
    errorText.remove();
  }
};


//NOT YET FUNCTIONAL
const inputErrorHandler = (errorArray, errorData) => {
  errorArray.forEach((errorKey) => {
    const errorId = `${errorKey}`;
    const checkFieldError = inputFields.find(field => field.id === errorId);
    removeClass(`.${errorId}`);
    checkFieldError.insertAdjacentHTML('afterend', `
    <p class="${errorId}" id="red">${errorData[errorId][0]}</p><br>
    `);
  });
};

//NOT YET FUNCTIONAL
const emailErrorHandler = (errorData) => {
  removeClass('.emailerror');
  emailInput.insertAdjacentHTML('afterend', `
  <p class="emailerror" id="red">${errorData}</p><br>
  `);
};
//NOT YET FUNCTIONAL
const usernameErrorHandler = (errorData) => {
  removeClass('.usernameerror');
  usernameInput.insertAdjacentHTML('afterend', `
  <p class="usernameerror" id="red">${errorData}</p><br>
  `);
};


const register = async (e) => {
  e.preventDefault();
  // resetInputFields();
  // showLoader();


  const firstname = first_name.value;
  const lastname = last_name.value;
  const email = e_mail.value;
  const phonenumber = phone_number.value;
  const username = user_name.value;
  const password = pass_word.value;
  const confirmPassword = confirm_password.value;

  const userInput = {
    firstname,
    lastname,
    username,
    email,
    password,
    confirmPassword,
    phonenumber,
  };

  await fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify(userInput),
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(res => res.json())
    .then((data) => {
      if (data.status !== 201) {
        console.log(data.error);
        showAlert('Some inputs are incorrect check console for directives this is not a permanent fix', 'error');
      }

      if (data.status === 201) {
        showAlert('Account created successfully you would be redirected to the login page', 'success');
        setTimeout(() => {
          window.location.href = `${windowUrl}/login.html`;
        }, 5000);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const signup = document.querySelector('#signup--form');
signup.addEventListener('submit', register);