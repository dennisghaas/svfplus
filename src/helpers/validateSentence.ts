import {exceptions} from "@/config.ts";
export function validateSentence(sentence: string) {
  const sentenceLowerCase = sentence.toLowerCase()

  if (exceptions.includes(sentenceLowerCase)) {
    return true
  }

  const words = sentenceLowerCase.trim().split(/\s+/).filter(Boolean)
  return words.length >= 3
}
