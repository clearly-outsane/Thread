import React from 'react'
import { useForm } from 'react-hook-form'
import { FieldValues } from 'react-hook-form/dist/types'

import useAutosizeTextArea from './useAutosizeTextArea'

type InputTypes = {
  center?: boolean
  onSubmit?: (data: FieldValues) => void
}

const Input = ({ center = false, onSubmit }: InputTypes) => {
  const { register, handleSubmit, watch } = useForm()
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null)
  const { ref, onChange, onBlur, name } = register('note')
  const watchNote = watch('note')
  useAutosizeTextArea(textAreaRef.current, watchNote)

  const _onSubmit = (data: FieldValues) => {
    // eslint-disable-next-line no-console
    typeof onSubmit === 'function' ? onSubmit(data) : console.log(data)
  }

  return (
    <>
      <form onSubmit={handleSubmit(_onSubmit)}>
        <div
          className={`mb-4 w-full min-w-[360px] ${
            center ? 'translate-x-[-50%] translate-y-[-50%]' : ''
          } rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700`}
        >
          <div className='rounded-t-lg bg-white px-4 pt-2 dark:bg-gray-800'>
            <label htmlFor='note' className='sr-only'>
              Type something...
            </label>
            <textarea
              onChange={onChange}
              onBlur={onBlur}
              name={name}
              ref={(e) => {
                ref(e)
                textAreaRef.current = e
              }}
              id='note'
              className='mb-1 h-[20px] w-full resize-none overflow-hidden border-0 bg-white px-0 text-sm text-gray-900 focus:outline-none focus:ring-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400'
              placeholder='Type something...'
              required
            ></textarea>
          </div>
          <div className='flex items-center justify-between border-t px-3 py-2 dark:border-gray-600'>
            <button
              type='submit'
              className='inline-flex items-center rounded-lg bg-blue-700 py-2.5 px-4 text-center text-xs font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900'
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default Input
