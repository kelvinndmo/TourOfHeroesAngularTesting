describe("my first test", () => {
  let sut;

  beforeEach(() => {
    sut = {};
  });

  it("should be true if true", () => {
    //arange
    sut.a = false;

    //act
    sut.a = true;

    //assert
    expect(sut.a).toBe(true);
  });
});
