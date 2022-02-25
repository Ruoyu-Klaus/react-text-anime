import React from 'react'

let baseNumber = 1

export const omit = (obj, keys) => {
  const { [keys]: _, ...newObj } = obj
  return newObj
}

export const generateUniqueId = (h) => {
  return baseNumber++ + new Date().getTime() + h
}

export const getTextNode = (children: React.ReactNode) => {
  let textNodes: string[] = []
  React.Children.map(children, (child: React.ReactNode) => {
    if (React.isValidElement(child)) {
      React.Children.map(
        child.props.children,
        (innerChild: React.ReactNode) => {
          textNodes = [...textNodes, ...getTextNode(innerChild)]
        }
      )
    }
    if (Array.isArray(child)) {
      for (const text of child) {
        textNodes = [...textNodes, text]
      }
    }
    if (typeof child === 'string' || typeof child === 'number') {
      textNodes = [...textNodes, child.toString()]
    }
  })
  return textNodes
}
