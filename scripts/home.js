let lamellenHTML = '';

lamellenList.forEach((lamelleItem) => {
  const lamId = lamelleItem.id;

  lamellenHTML +=
  `
  <div class="lam-container js-lam-container 
  js-lam-container-${lamelleItem.id}"
  data-lamelle-Id="${lamelleItem.id}">
    <img class="lam-logo" src="${lamelleItem.image}" alt="">
    <div>
      <input type="radio" name="lamellen" class="lam-radio js-radio 
      js-radio-${lamelleItem.id}"
      data-lamelle-Id="${lamelleItem.id}">
    <span>${lamelleItem.name}</span>
    </div>
    <p class="lam-preis">Preis: ${lamelleItem.price} € / qm</p>
  </div>
  `
});

document.querySelector('.js-lam-select-container').innerHTML = lamellenHTML;

function checkRadio(lamelleId) {
  document.querySelector(`.js-radio-${lamelleId}`).checked = true;
  document.querySelector(`.js-lam-container-${lamelleId}`).classList.add('lam-active');
}

/* document.querySelectorAll('.js-qi').forEach((qi) => {
  qi.value = '';
}) */

let lamelleStartId = '0';
checkRadio(lamelleStartId);
calculatePrice();

function getRadio() {
  let radioId = '';
  document.querySelectorAll('.js-radio').forEach((radio) => {
    if (radio.checked) {
      radioId = radio.dataset.lamelleId;
    }
  })
  return radioId
};

function calculatePrice() {
  let price = lamellenList[Number(getRadio())].price;
  let width = document.querySelector('.js-qi-b').value;
  let length = document.querySelector('.js-qi-l').value;

  if (width.includes(',') === true) {
    width = width.replace(/,/g, '.')
  }

  if (length.includes(',') === true) {
    length = length.replace(/,/g, '.')
  }
  const result = `${(width * length * price).toFixed(2)} €`

  document.querySelector('.js-total-price').innerHTML = result
};

document.querySelector('.js-calc-button')
  .addEventListener('click', () => {
    calculatePrice();
});

document.querySelectorAll('.js-lam-container').forEach((container) => {
  container.addEventListener('click', () => {
    const lamelleId = container.dataset.lamelleId;
    checkRadio(lamelleId);
    calculatePrice();
    document.querySelectorAll('.js-lam-container').forEach((container) => {
      container.classList.remove('lam-active');
    })
    document.querySelector(`.js-lam-container-${lamelleId}`).classList.add('lam-active')
  });
});

document.querySelectorAll('.js-qi').forEach((input) => {
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      calculatePrice();
    }
  })
});

let inputList = [];
document.querySelectorAll('input').forEach((input) => {
  inputList.push(input.value);
});

function saveInput(inputList) {
  localStorage.setItem('input', JSON.stringify(inputList));
};

function clearInput() {
  document.querySelectorAll('input').forEach((input) => {
    if(input.type === "radio" | input.type === "checkbox") {
      input.checked = false;
    } else {
      input.value = "";
    }
  });
  document.querySelector('textarea').value = "";
  document.querySelectorAll('.js-lam-container').forEach((container) => {
    container.classList.remove('lam-active');
  })
};

document.querySelector('.js-button-send').addEventListener('click', () => {
  const privacyChecked = document.querySelector('.js-checkbox').checked
  if (privacyChecked) {  
    saveInput(inputList);
    clearInput();
    checkRadio(lamelleStartId);
    document.querySelector('.js-total-price').innerHTML = "0.00 €"
    document.querySelector('.js-checkbox-container').classList.remove('active');
  } else {
    document.querySelector('.js-checkbox-container').classList.add('active');
  }
});

document.querySelector('.js-checkbox').addEventListener('click', () => {
  const privacyChecked = document.querySelector('.js-checkbox').checked
  if (privacyChecked) {
    document.querySelector('.js-checkbox-container').classList.remove('active'); 
  }
})