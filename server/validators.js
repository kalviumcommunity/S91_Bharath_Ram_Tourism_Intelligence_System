
function isValidVisitorName(name) {
  return typeof name === "string" && name.trim().length > 0;
}

function isValidAge(age) {
  return Number.isInteger(Number(age)) &&
    Number(age) >= 1 &&
    Number(age) <= 120;
}

function isValidBudget(budget) {
  if (
    typeof budget === "string" &&
    budget.trim() === ""
  ) {
    return false;
  }

  return (
    Number.isFinite(Number(budget)) &&
    Number(budget) >= 0
  );
}

function isValidTravelType(type) {
  return typeof type === "string" &&
    ["Solo", "Family", "Friends", "Business", "Couple"].includes(type);
}

function isValidDestinationName(name) {
  return typeof name === "string" && name.trim().length >= 2;
}

module.exports = {
  isValidVisitorName,
  isValidAge,
  isValidBudget,
  isValidTravelType,
  isValidDestinationName,
};
