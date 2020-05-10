import { StrengthPipe } from "./strength.pipe";

describe("StrengthPipe", () => {
  it("Should display week if strength is 5", () => {
    let pipe = new StrengthPipe();

    expect(pipe.transform(5)).toEqual("5 (weak)");
  });

  it("should display strong if the strength is 10", () => {
    let pipe = new StrengthPipe();

    expect(pipe.transform(10)).toEqual("10 (strong)");
  });
  it("Should display excellent if strength is 20", () => {
    let pipe = new StrengthPipe();

    expect(pipe.transform(20)).toEqual("20 (unbelievable)");
  });
});
