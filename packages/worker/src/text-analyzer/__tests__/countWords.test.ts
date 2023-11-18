import { countWords } from "../countWords";

describe("countWords", () => {
  it("counts words", () => {
    expect(countWords("hello world")).toBe(2);
  });

  it("counts words with punctuation", () => {
    expect(countWords("hello, world!")).toBe(2);
  });

  it("counts words with newlines", () => {
    expect(countWords("hello\nworld")).toBe(2);
  });

  it("counts words with tabs", () => {
    expect(countWords("hello\tworld")).toBe(2);
  });

  it("counts words with multiple spaces", () => {
    expect(countWords("hello  world")).toBe(2);
  });

  it("counts words with leading spaces", () => {
    expect(countWords("  hello world")).toBe(2);
  });

  it("counts words with trailing spaces", () => {
    expect(countWords("hello world  ")).toBe(2);
  });

  it("counts words with leading and trailing spaces", () => {
    expect(countWords("  hello world  ")).toBe(2);
  });

  it("counts words with multiple newlines", () => {
    expect(countWords("hello\n\nworld")).toBe(2);
  });

  it("counts words in long text with multiple newlines", () => {
    expect(countWords("hello\n\nworld\n\nhow\n\nare\n\nyou")).toBe(5);
  });
});
