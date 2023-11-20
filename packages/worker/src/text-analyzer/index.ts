import { countLetters } from "./countLetters";
import { countWords } from "./countWords";
import { countSpaces } from "./countSpaces";

export function analyzeText(text: string) {
  return {
    letters: countLetters(text),
    words: countWords(text),
    spaces: countSpaces(text),
  };
}

export default { countLetters, countWords, countSpaces };
