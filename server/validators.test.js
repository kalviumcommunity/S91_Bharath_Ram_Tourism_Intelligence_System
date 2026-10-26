
const {
  isValidVisitorName,
  isValidAge,
  isValidBudget,
  isValidTravelType,
  isValidDestinationName,
} = require("./validators");

describe("Tourism application validators", () => {
  test("accepts a valid visitor name", () => {
    expect(isValidVisitorName("Bharath")).toBe(true);
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
});
