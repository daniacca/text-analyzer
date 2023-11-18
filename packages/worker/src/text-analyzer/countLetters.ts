export function countLetters(text: string): number {
  return text.replace(/[^a-z]/gi, "").length;
}
