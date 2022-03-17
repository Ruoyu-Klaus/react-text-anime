import React, { ReactElement, ReactNode } from 'react'
let baseNumber = 1

export const omit = (obj: {}, keys: string[]) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keys.includes(key))
  )
}

export const generateUniqueId = (h: number) => {
  return baseNumber++ + new Date().getTime() + h
}

export const delay = async (timeout: number) => {
  return await new Promise((resolve) => setTimeout(resolve, timeout))
}

export const isStringOrNumber = (value: any) => {
  return typeof value === 'string' || typeof value === 'number'
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

export const createCharacterReactNode = (text: string) => {
  return text.split('').map((char) => {
    const id = generateUniqueId(1)
    return React.createElement(React.Fragment, { key: id }, char)
  })
}
