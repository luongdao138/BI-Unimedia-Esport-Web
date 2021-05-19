import { Part, PartType, RegexMatchResult, MentionPartType, MentionData } from '../types/mention.type'
import matchAll from 'string.prototype.matchall'
import { regex } from '../constants'

const mentionRegEx = regex.mention

const parseValue = (value: string, partTypes: PartType[]): { plainText: string; parts: Part[] } => {
  if (value == null) {
    value = ''
  }

  let plainText = ''
  let parts: Part[] = []

  // We don't have any part types so adding just plain text part
  if (partTypes.length === 0) {
    plainText += value
    parts.push(generatePlainTextPart(value))
  } else {
    const [partType, ...restPartTypes] = partTypes

    const regex = isMentionPartType(partType) ? mentionRegEx : partType.pattern

    const matches: RegexMatchResult[] = Array.from(matchAll(value ?? '', regex))

    // In case when we didn't get any matches continue parsing value with rest part types
    if (matches.length === 0) {
      return parseValue(value, restPartTypes)
    }

    // In case when we have some text before matched part parsing the text with rest part types
    if (matches[0].index != 0) {
      const text = value.substr(0, matches[0].index)

      const plainTextAndParts = parseValue(text, restPartTypes)
      parts = parts.concat(plainTextAndParts.parts)
      plainText += plainTextAndParts.plainText
    }

    // Iterating over all found pattern matches
    for (let i = 0; i < matches.length; i++) {
      const result = matches[i]

      if (isMentionPartType(partType)) {
        const mentionData = getMentionDataFromRegExMatchResult(result)

        // Matched pattern is a mention and the mention doesn't match current mention type
        // We should parse the mention with rest part types
        if (mentionData.trigger !== partType.trigger) {
          const plainTextAndParts = parseValue(mentionData.original, restPartTypes)
          parts = parts.concat(plainTextAndParts.parts)
          plainText += plainTextAndParts.plainText
        } else {
          const part = generateMentionPart(partType, mentionData)

          parts.push(part)

          plainText += part.text
        }
      } else {
        const part = generateRegexResultPart(partType, result)

        parts.push(part)

        plainText += part.text
      }

      // Check if the result is not at the end of whole value so we have a text after matched part
      // We should parse the text with rest part types
      if (result.index + result[0].length !== value.length) {
        // Check if it is the last result
        const isLastResult = i === matches.length - 1

        // So we should to add the last substring of value after matched mention
        const text = value.slice(result.index + result[0].length, isLastResult ? undefined : matches[i + 1].index)

        const plainTextAndParts = parseValue(text, restPartTypes)
        parts = parts.concat(plainTextAndParts.parts)
        plainText += plainTextAndParts.plainText
      }
    }
  }

  // Exiting from parseValue
  return {
    plainText,
    parts,
  }
}

const isMentionPartType = (partType: PartType): partType is MentionPartType => {
  return (partType as MentionPartType).trigger != null
}

const generatePlainTextPart = (text: string): Part => ({
  text,
})

const getMentionDataFromRegExMatchResult = ([, original, trigger, userId]: RegexMatchResult): MentionData => ({
  original,
  trigger,
  userId,
})

// eslint-disable-next-line
const defaultPlainStringGenerator = ({}: MentionPartType, { userId }: MentionData) => {
  return `${userId}`
}

const generateMentionPart = (mentionPartType: MentionPartType, mention: MentionData): Part => {
  const text = mentionPartType.getPlainString
    ? mentionPartType.getPlainString(mention)
    : defaultPlainStringGenerator(mentionPartType, mention)

  return {
    text,
    partType: mentionPartType,
    data: mention,
  }
}

const generateRegexResultPart = (partType: PartType, result: RegexMatchResult): Part => ({
  text: result[0],
  partType,
})

export { parseValue, isMentionPartType }
