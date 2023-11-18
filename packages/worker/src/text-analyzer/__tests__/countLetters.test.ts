import { countLetters } from "../countLetters";

describe("countLetters", () => {
  it("counts letters", () => {
    expect(countLetters("hello world")).toBe(10);
  });

  it("counts letters with punctuation", () => {
    expect(countLetters("hello, world!")).toBe(10);
  });

  it("counts letters with newlines", () => {
    expect(countLetters("hello\nworld")).toBe(10);
  });

  it("counts letters with tabs", () => {
    expect(countLetters("hello\tworld")).toBe(10);
  });

  it("counts letters with multiple spaces", () => {
    expect(countLetters("hello  world")).toBe(10);
  });

  it("counts letters with leading spaces", () => {
    expect(countLetters("  hello world")).toBe(10);
  });

  it("counts letters with trailing spaces", () => {
    expect(countLetters("hello world  ")).toBe(10);
  });

  it("counts letters with leading and trailing spaces", () => {
    expect(countLetters("  hello world  ")).toBe(10);
  });

  it("counts letters with multiple newlines", () => {
    expect(countLetters("hello\n\nworld")).toBe(10);
  });
});
