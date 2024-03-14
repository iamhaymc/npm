import { getNanoid } from "../dist/_index";

describe("getNanoid", () => {
  it("returns a string", () => {
    expect(getNanoid()).toBeTruthy();
  });
});
