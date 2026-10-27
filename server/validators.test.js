
const {
  isValidVisitorName,
  isValidAge,
  isValidBudget,
  isValidTravelType,
  isValidDestinationName,
} = require("./validators");

describe("Tourism application validators", () => {
  test("accepts a valid visitor name", () => {
    expect(isValidVisitorName("John")).toBe(true);
  });

  test("rejects an empty visitor name", () => {
    expect(isValidVisitorName("   ")).toBe(false);
  });

  test("accepts a valid visitor age", () => {
    expect(isValidAge(21)).toBe(true);
  });

  test("rejects an age greater than 120", () => {
    expect(isValidAge(150)).toBe(false);
  });

  test("accepts a non-negative visitor budget", () => {
    expect(isValidBudget(5000)).toBe(true);
  });

  test("accepts a supported travel type", () => {
    expect(isValidTravelType("Family")).toBe(true);
  });

  test("rejects an unsupported travel type", () => {
    expect(isValidTravelType("Unknown")).toBe(false);
  });

  test("rejects a destination name that is too short", () => {
    expect(isValidDestinationName("A")).toBe(false);
  });

  test("rejects an age below 1", () => {
  expect(isValidAge(0)).toBe(false);
});

test("accepts the minimum valid age", () => {
  expect(isValidAge(1)).toBe(true);
});

test("accepts the maximum valid age", () => {
  expect(isValidAge(120)).toBe(true);
});

test("rejects a negative budget", () => {
  expect(isValidBudget(-100)).toBe(false);
});

test("rejects an invalid budget string", () => {
  expect(isValidBudget("abc")).toBe(false);
});

test("rejects an empty budget", () => {
  expect(isValidBudget("")).toBe(false);
});

test("rejects a non-string visitor name", () => {
  expect(isValidVisitorName(123)).toBe(false);
});

test("rejects a non-string travel type", () => {
  expect(isValidTravelType(123)).toBe(false);
});

test("rejects an empty destination name", () => {
  expect(isValidDestinationName("")).toBe(false);
});
});
