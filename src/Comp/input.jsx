import React from 'react'

const Input = ({name,placeholder,value,onChange,validateError}) => {

  return (
    <div className="p-2  w-full">
    <input
      name={name}
      className="p-2  w-full"
      placeholder={placeholder}
      required
      value={value}
      onChange={onChange}
    />
    {validateError && (
      <span className="text-red-700">{validateError}</span>
    )}
  </div>
  )
};

export default Input;