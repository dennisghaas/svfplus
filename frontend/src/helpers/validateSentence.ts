export function validateSentence(sentence: string) {
  const exceptions = [
    'spätschicht',
    'nachtschicht',
    'frühschicht',
    'verletzt',
    'bin krank',
    'krank',
    'urlaub',
    'brauch pause',
    'pause',
  ]
  const sentenceLowerCase = sentence.toLowerCase()

  if (exceptions.includes(sentenceLowerCase)) {
    return true
  }

  const words = sentenceLowerCase.trim().split(/\s+/).filter(Boolean)
  return words.length >= 3
}
