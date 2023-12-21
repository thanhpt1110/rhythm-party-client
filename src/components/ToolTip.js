import React from 'react'

const ToolTip = ({ text, children }) => {
  return (
    <div className="group relative inline-block max-w-3xl w-full">
      {children}
      <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition absolute bottom-full transform -translate-x-1/2 left-2 mb-1 text-gray-300 text-xs font-semibold">
          {text}
      </div>
  </div>
  )
}

export default ToolTip
