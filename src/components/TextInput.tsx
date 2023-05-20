import React, { ChangeEventHandler } from 'react'

interface ITextInputProps {
  className?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  id: string
  placeholder: string
  label?: string
  type?: string
}

export const TextInput = (props: ITextInputProps): JSX.Element => {
  const { className, id, placeholder, label } = props
  return (
    <div className={className}>
      {(label != null) && <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>}
      <input onChange={props.onChange} type="text" id={id} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
    </div>
  )
}
