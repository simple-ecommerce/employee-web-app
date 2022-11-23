import { TextHelpers } from "./TextHelpers";

describe("TextService", () => {
  it("should test toSnakeCase", () => {
    expect(TextHelpers.toSnakeCase("aBC")).toBe("a_b_c");
  });
  it("should test toCamelCase", () => {
    expect(TextHelpers.toCamelCase("a_b_c")).toBe("aBC");
  });
  it("should test snakeCaseToText", () => {
    expect(TextHelpers.snakeCaseToText("net_as_new_30")).toBe("Net as new 30");
    expect(TextHelpers.snakeCaseToText("a_b_c")).toBe("A b c");
  });
});
