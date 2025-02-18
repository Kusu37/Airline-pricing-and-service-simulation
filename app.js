document.addEventListener("DOMContentLoaded", function() {
  // Get DOM elements
  const priceChangeInput = document.getElementById("priceChange");
  const priceChangeValue = document.getElementById("priceChangeValue");
  const customerTypeSelect = document.getElementById("customerType");
  const servicesSelect = document.getElementById("services");
  const applyButton = document.getElementById("applyAction");
  const seatInfo = document.getElementById("seatInfo");
  const priceInfo = document.getElementById("priceInfo");
  const promotionInfo = document.getElementById("promotionInfo");
  const timeInfo = document.getElementById("timeInfo");
  const logList = document.getElementById("logList");

  // Initialize state
  let seats = { economy: 100, business: 0, first_class: 0 };
  let prices = { economy: 100, business: 100, first_class: 100 };
  let promotion = false;
  let timeToDeparture = 100;

  // Update price change value
  priceChangeInput.addEventListener("input", function() {
    priceChangeValue.textContent = priceChangeInput.value;
  });

  // Apply the changes and simulate the environment
  applyButton.addEventListener("click", function() {
    const priceChange = parseInt(priceChangeInput.value);
    const customerType = customerTypeSelect.value;
    const selectedServices = Array.from(servicesSelect.selectedOptions).map(option => option.value);

    // Simulate changes
    prices = applyPriceChange(prices, priceChange);
    seats = applyServiceCharges(seats, selectedServices);
    timeToDeparture -= 1;

    // Simulate promotions
    promotion = Math.random() < 0.1; // 10% chance for a promotion
    if (promotion) {
      prices = applyPromotion(prices);
    }

    // Update the UI with the new status
    updateStatus(seats, prices, promotion, timeToDeparture);
    logChanges(priceChange, selectedServices, customerType);
  });

  // Functions to handle pricing and services
  function applyPriceChange(prices, priceChange) {
    const newPrices = { ...prices };
    for (let cls in newPrices) {
      newPrices[cls] += priceChange * 20; // Change prices based on priceChange
    }
    return newPrices;
  }

  function applyServiceCharges(seats, services) {
    const serviceCharges = {
      priority_boarding: 30,
      vip_lounge_access: 100,
      extra_legroom_seat: 50,
      wifi: 20,
    };

    // Deduct seats based on selected services
    const newSeats = { ...seats };
    services.forEach(service => {
      if (serviceCharges[service]) {
        newSeats.economy -= 1; // For simplicity, assume one service = one seat booked
      }
    });

    return newSeats;
  }

  function applyPromotion(prices) {
    const newPrices = { ...prices };
    for (let cls in newPrices) {
      newPrices[cls] = Math.max(newPrices[cls] * 0.85, 100); // Apply 15% discount
    }
    return newPrices;
  }

  function updateStatus(seats, prices, promotion, timeToDeparture) {
    seatInfo.textContent = `Seats Left: Economy - ${seats.economy}, Business - ${seats.business}, First Class - ${seats.first_class}`;
    priceInfo.textContent = `Prices: Economy - $${prices.economy}, Business - $${prices.business}, First Class - $${prices.first_class}`;
    promotionInfo.textContent = promotion ? "Promotion: 15% Discount Applied!" : "Promotion: None";
    timeInfo.textContent = `Time to Departure: ${timeToDeparture} days`;
  }

  function logChanges(priceChange, services, customerType) {
    const logItem = document.createElement("li");
    logItem.textContent = `Price Change: ${priceChange}, Services: ${services.join(", ")}, Customer Type: ${customerType}`;
    logList.appendChild(logItem);
  }
});
