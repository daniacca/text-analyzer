import { countSpaces } from "../countSpaces";

describe("countSpaces", () => {
  it("counts spaces", () => {
    expect(countSpaces("hello world")).toBe(1);
  });

  it("counts spaces with punctuation", () => {
    expect(countSpaces("hello, world!")).toBe(1);
  });

  it("counts spaces with newlines", () => {
    expect(countSpaces("hello\nworld")).toBe(1);
  });

  it("counts spaces with tabs", () => {
    expect(countSpaces("hello\tworld")).toBe(1);
  });

  it("counts spaces with multiple spaces", () => {
    expect(countSpaces("hello  world")).toBe(2);
  });

  it("counts spaces with leading spaces", () => {
    expect(countSpaces("  hello world")).toBe(3);
  });

  it("counts spaces with trailing spaces", () => {
    expect(countSpaces("hello world  ")).toBe(3);
  });

  it("counts spaces with leading and trailing spaces", () => {
    expect(countSpaces("  hello world  ")).toBe(5);
  });

  it("counts spaces with multiple newlines", () => {
    expect(countSpaces("hello\n\nworld")).toBe(2);
  });
});
