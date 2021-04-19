const headerDropdown = document.getElementsByClassName("dropdown-header");
const headerArrow = document.querySelectorAll(".header-arrow");

for (let i = 0; i < headerDropdown.length; i++) {
  headerDropdown[i].addEventListener("click", () => {
    let menu = headerDropdown[i].nextElementSibling;
    // rotate arrow
    headerArrow[i].classList.toggle("header-arrow-active");
    // toggle menu
    if (menu.style.maxHeight) {
      menu.style.maxHeight = null;
    } else {
      menu.style.maxHeight = menu.scrollHeight + 200 + "px";
      menu.style.overflowX = "auto";
    }
  });
}

// calculate quantity

let quantityTotal = 0;
const quantityNumber = document.querySelectorAll(".quantity-number");
const quantityContainer = document.querySelectorAll(".quantity-container");

for (let i = 0; i < quantityNumber.length; i++) {
  quantityTotal += Number(quantityNumber[i].innerHTML);
}

// toggle offers total
const offersCheckbox = document.querySelectorAll(".checkbox-offers");
const recalculateText = document.querySelector(".recalculate-text");

let totalOffers = 0;

for (let i = 0; i < offersCheckbox.length; i++) {
  offersCheckbox[i].addEventListener("click", (e) => {
    const value = parseFloat(e.target.value.split(",").join(""));
    if (e.target.checked === true) {
      totalOffers += value;
      quantityTotal += Number(quantityContainer[i].innerHTML);
    } else {
      totalOffers -= value;
      quantityTotal -= Number(quantityContainer[i].innerHTML);
    }
    shippingQty.innerHTML = quantityTotal;

    recalculateText.innerHTML = "$" + Number(totalOffers).toFixed(2);
    if (totalOffers < 2) {
      recalculateText.innerHTML = "";
    }

    // offers total, subtotal
    const recalculateTextTop = document.querySelector(".recalculate-text-top");
    const recalculateTextTotal = document.querySelector(
      ".recalculate-text-total",
    );

    const detailsTotalPriceNumber = Number(
      detailsTotalPrice.innerHTML.split(",").join(""),
    );
    const recalculateTextNumber = Number(
      recalculateText.innerHTML.split("$").join(""),
    );

    const offersTotalNumber = detailsTotalPriceNumber + recalculateTextNumber;

    recalculateTextTop.innerHTML = "$" + detailsTotalPriceNumber;

    if (offersTotalNumber === detailsTotalPriceNumber) {
      recalculateTextTotal.innerHTML = "";
    } else {
      recalculateTextTotal.innerHTML = "$" + offersTotalNumber.toFixed(2);
    }
  });
}

// toggle breakage total

const breakageCheckbox = document.querySelectorAll(".breakage-checkbox");
const breagakeTotal = document.querySelector(".breagake-total");

let totalBreakage = 0;

for (let i = 0; i < breakageCheckbox.length; i++) {
  breakageCheckbox[i].addEventListener("click", (e) => {
    const value = parseFloat(e.target.value.split(",").join(""));
    if (e.target.checked === true) {
      totalBreakage += value;
    } else {
      totalBreakage -= value;
    }
    breagakeTotal.innerHTML = "$" + totalBreakage;
    if (totalBreakage < 2) {
      breagakeTotal.innerHTML = "";
    }
  });
}

// toggle shipping calendar
const shippingSelect = document.querySelector(".shipping-select");
const shippingCalendarStg = document.querySelector(
  ".shipping-calendar-storage",
);
const shippingCalendarLoc = document.querySelector(".shipping-calendar-local");
const shippingBtl = document.querySelector(".shipping-per-bottle");
const shippingTot = document.querySelector(".shipping-total");
const storageMonths = document.querySelector(".storage-months");
const storageMonthsTh = document.querySelector(".storage-months-th");
const shippingQty = document.querySelector(".shipping-total-quantity");

shippingSelect.addEventListener("change", () => {
  // check if the option is storage, then sets the prices and the date inputs
  if (shippingSelect.value === "Standar (Ground) Shipping") {
    shippingTot.innerHTML =
      parseFloat(shippingQty.innerHTML) * parseFloat(shippingBtl.innerHTML);
    shippingCalendarStg.style.display = "none";
    shippingCalendarLoc.style.display = "none";
    storageMonths.style.display = "none";
    storageMonthsTh.style.display = "none";

    // check if the option is local pickup, then sets the prices and the date inputs
  } else if (shippingSelect.value === "Local Pickup") {
    shippingCalendarLoc.style.display = "block";
    shippingTot.innerHTML = "0.00";
    shippingCalendarStg.style.display = "none";
    shippingBtl.innerHTML = "0.00";
    storageMonths.style.display = "none";
    storageMonthsTh.style.display = "none";
  } else if (shippingSelect.value === "Expedited (Air) Shipping") {
    shippingBtl.innerHTML = "25.00";
    shippingTot.innerHTML = "175.00";
    storageMonths.style.display = "none";
    storageMonthsTh.style.display = "none";
    // if no matches just return defaults
  } else if (shippingSelect.value === "Storage") {
    shippingCalendarStg.style.display = "block";
    shippingBtl.innerHTML = "5.00";
    shippingCalendarLoc.style.display = "none";
    shippingTot.innerHTML = "25.00";
    storageMonths.style.display = "table-cell";
    storageMonthsTh.style.display = "table-cell";
  }
});

// shipping storage calculation per month

const storageCalendar = document.querySelector(".storage-calendar");

shippingQty.innerHTML = quantityTotal;

storageCalendar.addEventListener("change", () => {
  const todayMonth = new Date().getMonth() + 1;
  const storageDate = new Date(storageCalendar.value);
  const months = storageDate.getMonth() + 1;
  const totalQty = parseFloat(shippingQty.innerHTML);
  const totalShipPerBtl = parseFloat(shippingBtl.innerHTML);
  const totalMonth = months - todayMonth;
  storageMonths.innerHTML = months - todayMonth;
  shippingTot.innerHTML = (totalQty * totalShipPerBtl * totalMonth).toFixed(2);
});

// toggle add card and ach
const cardSelect = document.querySelector(".card-select");
const addCardContainer = document.querySelector(".add-new-card");
const addAchContainer = document.querySelector(".add-new-ach");

cardSelect.addEventListener("change", () => {
  if (cardSelect.value === "Add New Card") {
    addCardContainer.style.display = "flex";
  } else {
    addCardContainer.style.display = "none";
  }
  if (cardSelect.value === "Add New ACH") {
    addAchContainer.style.display = "block";
  } else {
    addAchContainer.style.display = "none";
  }
});

// toggle text focus
// when clicking on change will automatically focus the text

const changeBilling = document.querySelector("#change-billing");
const textAreaBilling = document.querySelector("#textarea-billing");

changeBilling.addEventListener("click", () => {
  textAreaBilling.toggleAttribute("disabled");
  textAreaBilling.focus();
});

// toggle text focus

const changeShipping = document.querySelector("#change-shipping");
const textAreaShipping = document.querySelector("#textarea-shipping");

changeShipping.addEventListener("click", () => {
  textAreaShipping.toggleAttribute("disabled");
  textAreaShipping.focus();
});

// promo code

const discount = document.querySelector(".discount");
const discountInput = document.getElementById("promo-code");
const totalDiscount = document.querySelector(".total-discount");
const discountValue = "10.00";

discountInput.addEventListener("change", () => {
  let pTotal =
    parseFloat(detailsTotalPrice.innerHTML.split(",").join("")) +
    totalOffers +
    totalBreakage +
    parseFloat(shippingTotal.innerHTML);
  discount.innerHTML = "$" + discountValue;
  totalDiscount.innerHTML =
    "$" + (Number(pTotal).toFixed(2) - Number(discountValue));
});

// calculate payment total

const paymentTotal = document.querySelector(".payment-total");
let shippingTotal = document.querySelector(".shipping-total");
let detailsTotalPrice = document.querySelector(".details-total-price");

document.addEventListener("change", () => {
  let pTotal =
    parseFloat(detailsTotalPrice.innerHTML.split(",").join("")) +
    totalOffers +
    totalBreakage +
    parseFloat(shippingTotal.innerHTML);
  paymentTotal.innerHTML = "$" + Number(pTotal).toFixed(2);

  if (shippingSelect.value !== "Storage") {
    shippingTot.innerHTML =
      parseFloat(shippingQty.innerHTML) * parseFloat(shippingBtl.innerHTML);
  }
  if (shippingSelect.value === "Standar (Ground) Shipping") {
    if (parseFloat(shippingQty.innerHTML === 1)) {
      shippingBtl.innerHTML = "16.00";
    } else if (parseFloat(shippingQty.innerHTML) === 2) {
      shippingBtl.innerHTML = "13.00";
    } else if (parseFloat(shippingQty.innerHTML) === 3) {
      shippingBtl.innerHTML = "12.00";
    } else if (parseFloat(shippingQty.innerHTML) === 4) {
      shippingBtl.innerHTML = "11.00";
    } else if (parseFloat(shippingQty.innerHTML) >= 5) {
      shippingBtl.innerHTML = "10.00";
    }
  }
});

shippingTot.innerHTML =
  parseFloat(shippingQty.innerHTML) * parseFloat(shippingBtl.innerHTML);
