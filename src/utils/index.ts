import { ReactElement, ReactNode } from 'react'
import Text from '../components/text/'
let baseNumber = 1

export const omit = (obj, keys) => {
  const { [keys]: _, ...newObj } = obj
  return newObj
}

export const generateUniqueId = (h) => {
  return baseNumber++ + new Date().getTime() + h
}

export const isElement = (
  element: ReactElement,
  targetElement: ReactNode,
  targetElementName: string
) => {
  const elementType = element && element.type
  if (!elementType) {
    return false
  }
  return elementType === targetElement || elementType === targetElementName
}

export const isAnimeTextElement = (element: ReactElement) => {
  return isElement(element, Text, 'Text')
}
