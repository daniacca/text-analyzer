export function countWords(text: string): number {
  return getWords(text).length;
}

export function getWords(text: string): string[] {
  const lowers = text.trim().toLowerCase();
  const noPunctuation = lowers.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
  const noMultipleSpaces = noPunctuation.replace(/\s{2,}/g, " ");
  return noMultipleSpaces.split(/\s+/);
}
