const id = (id) => document.getElementById(id);
const classes = (classes) => document.getElementsByClassName(classes);
const firstName = id('name');
const surname = id('surname');
const delDate = id('delivery_date');
const houseNum = id('house_number');
const flatNum = id('flat_number');
const street = id('street');
const cash = id('cash');
const card = id('card');
const form = id('form');
const confirmBtn = id('confirm_btn');
const errorMsg = classes('error');
const back = id('back');
let popupTab = document.createElement('div');
popupTab.setAttribute('class', 'popup_tab');
document.body.appendChild(popupTab);

// delivery date not earlier than next day

let today = new Date();
let dd = today.getDate() + 1;
let mm = today.getMonth() + 1;
let yyyy = today.getFullYear();
if (dd < 10) {
  dd = '0' + dd;
}
if (mm < 10) {
  mm = '0' + mm;
}

today = yyyy + '-' + mm + '-' + dd;
document.getElementById('delivery_date').setAttribute('min', today);

// other validations
const validation = (id, serial, message) => {
  errorMsg[serial].innerHTML = message;
  id.style.border = '2px solid red';
};

const removeErr = (id, serial) => {
  errorMsg[serial].innerHTML = '';
  id.style.border = '';
};

let inputs = [
  firstName,
  surname,
  delDate,
  street,
  houseNum,
  flatNum,
  cash,
  card,
];
inputs.forEach((e, i) =>
  e.addEventListener('focusout', () => {
    if (e.value === '') {
      validation(e, i, 'invalid entry');
      if (i == 5) {
        validation(
          e,
          i,
          'invalid entry, only positive numbers and dash are allowed'
        );
      }
    } else {
      removeErr(e, i);
    }
  })
);

form.addEventListener('click', () => {
  let result = inputs.every((e) => e.validity.valid === true);
  console.log(result, 'result');
  if (result) {
    confirmBtn.disabled = false;
    confirmBtn.classList.add('active');
  } else {
    confirmBtn.disabled = true;
    confirmBtn.classList.remove('active');
  }
});

// summary popup

const getFromStorage = () => {
  return localStorage.getItem('orders')
    ? JSON.parse(localStorage.getItem('orders'))
    : [];
};

const saveToStorage = (list) => {
  localStorage.setItem('orders', JSON.stringify(list));
  return list;
};

const addDataToStorage = (
  formName,
  formSurname,
  formStreet,
  fromHouse,
  formFlat
) => {
  const myStorage = { formName, formSurname, formStreet, fromHouse, formFlat };
  saveToStorage(myStorage);
};

const displayData = () => {
  const data = getFromStorage();
  console.log(data, 'data');
  popupTab.innerHTML = `<div class="confirm_popup">
  <div class="header_popup">
    <h2 class="title_popup">Order received</h2>
  </div>
  <div class="details_popup">
      <p>Customer:${data.formName} ${data.formSurname}</p>
      <p>Address: ${data.formStreet} ${data.fromHouse} ${data.formFlat}</p>
  </div>
  <div class="back" id="back">
    <a href="./index.html">Back to Main</a>
  </div>
</div>`;
  popupTab.classList.add('active');
};

confirmBtn.addEventListener('click', (e) => {
  e.preventDefault();
  form.style.display = 'none';
  console.log('hi');

  addDataToStorage(
    firstName.value,
    surname.value,
    street.value,
    houseNum.value,
    flatNum.value
  );
  displayData();
});

console.log(popupTab, 'pp1');
