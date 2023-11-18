import { countLetters } from "./countLetters.js";
import { countWords } from "./countWords.js";
import { countSpaces } from "./countSpaces.js";

export function analyzeText(text: string) {
  return {
    letters: countLetters(text),
    words: countWords(text),
    spaces: countSpaces(text),
  };
}

export default { countLetters, countWords, countSpaces };
