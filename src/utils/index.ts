import React, { ReactElement, ReactNode } from 'react'

export const omit = (obj: {}, keys: string[]) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keys.includes(key))
  )
}

export const generateUniqueId = () => {
  return (
    new Date().getTime() +
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2.15)
  )
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
    const id = generateUniqueId()
    return React.createElement(React.Fragment, { key: id }, char)
  })
}
