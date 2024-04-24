document.getElementById("taxForm").addEventListener("submit", function (event) {
  event.preventDefault();

  

  let isValid = true;
  isValid &= validateInput("grossIncome");
  isValid &= validateInput("extraIncome");
  isValid &= validateInput("deductions");

  

  if (isValid) {
    const grossIncome =
      parseFloat(document.getElementById("grossIncome").value) || 0;
    const extraIncome =
      parseFloat(document.getElementById("extraIncome").value) || 0;
    const deductions =
      parseFloat(document.getElementById("deductions").value) || 0;
    const ageGroup = document.getElementById("ageGroup").value;
    let taxableIncome = grossIncome + extraIncome - deductions;
    let taxDue = calculateTax(taxableIncome, ageGroup);

    document.getElementById("result").textContent = `Total Tax Due: ${taxDue}`;
    document.getElementById("result").style.display = "block";
  }

});

function validateInput(id) {
  const input = document.getElementById(id);
  const errorIcon = document.getElementById(id + "Error");
  const tooltip = errorIcon.getAttribute("data-tooltip");

  if (input.value.trim() === "") {
    input.classList.remove("input-error");
    errorIcon.style.display = "none";
  } else if (isNaN(input.value)) {
    input.classList.add("input-error");
    errorIcon.style.display = "inline";
    errorIcon.setAttribute("data-tooltip", "Please enter a valid number");
    return false;
  } 
  else {
    input.classList.remove("input-error");
    errorIcon.style.display = "none";
    errorIcon.setAttribute("data-tooltip", tooltip);
    return true;
  }
}

function calculateTax(income, ageGroup) {
  let tax = 0;
  const taxThreshold = 800000; // 8 Lakhs
  const taxRates = {
    under40: 0.3,
    "40to59": 0.4,
    over59: 0.1,
  };

  if (income > taxThreshold) {
    let taxRate = ageGroup === "over59" ? taxRates.over59 : taxRates["40to59"];
    tax = (income - taxThreshold) * taxRate;
  }
  return tax;
}

["grossIncome", "extraIncome", "deductions"].forEach(function (id) {
  const input = document.getElementById(id);
  input.addEventListener("input", function () {
    validateInput(id);
  });
});
