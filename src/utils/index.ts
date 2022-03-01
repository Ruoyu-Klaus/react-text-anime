import { ReactElement, ReactNode } from 'react'
import Text from '../components/text/'
import Delay from '../components/delay'
let baseNumber = 1

export const omit = (obj, keys) => {
  const { [keys]: _, ...newObj } = obj
  return newObj
}

export const generateUniqueId = (h) => {
  return baseNumber++ + new Date().getTime() + h
}

export const delay = async (timeout: number) => {
  return await new Promise((resolve) => setTimeout(resolve, timeout))
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

export const isDelayElement = (element: ReactElement) => {
  return isElement(element, Delay, 'Delay')
}
