import { greet, Add } from ".";

describe("checks if project setup is working", () => {
  test("greet function is compiled without errors", () => {
    expect(greet()).toBe("hello");
  });
});

describe("verfifies Add function is working accordingly", () => {
  test("Add is a valid function exported properly", () => {
    expect(typeof Add).toBe("function");
  });
  test("empty string returns zero", () => {
    expect(Add("")).toBe(0);
  });
});
