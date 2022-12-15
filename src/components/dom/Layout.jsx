import { forwardRef, useRef } from 'react'
import { mergeRefs } from 'react-merge-refs'

const Layout = forwardRef(({ children }, ref) => {
  const localRef = useRef()
  return (
    <div
      ref={mergeRefs([ref, localRef])}
      className='dom min-w-screen h-full min-h-screen w-full overflow-hidden bg-zinc-900 text-gray-50'
    >
      {children}
    </div>
  )
})
Layout.displayName = 'Layout'

export default Layout
