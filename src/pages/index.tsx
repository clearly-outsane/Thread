import { Html } from '@react-three/drei'
import dynamic from 'next/dynamic'
import React from 'react'

import Input from '@/components/Input'

import { trpc } from '@/utils/trpc'

// Dynamic import is used to prevent a payload when the website starts, that includes threejs, r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49
const Grid = dynamic(() => import('@/components/canvas/Home').then((Home) => Home.Grid), { ssr: false })

// Dom components go here
export default function Page() {
  return (
    <div className='relative flex min-h-screen w-full justify-center'>
      <span className='m-4'>
        <button
          type='button'
          className='inline-flex items-center rounded-lg bg-gray-800  from-purple-600 to-blue-500 p-[2px] text-center text-sm font-medium text-white  hover:bg-gradient-to-r focus:outline-none  focus:ring-0 focus:ring-blue-800'
        >
          <span className='relative rounded-md bg-gray-800 px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0'>
            Explore
            <span className='ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-blue-200 text-xs font-semibold text-blue-800'>
              2
            </span>
          </span>
        </button>
      </span>
    </div>
  )
}

// Canvas components go here
// It will receive same props as the Page component (from getStaticProps, etc.)
Page.canvas = () => {
  const mutation = trpc.note.useMutation()
  // const fetchNotes = trpc.fetchNotes.useQuery({})
  return (
    <>
      <axesHelper />
      <Grid />
      <Html>
        <Input
          center
          onSubmit={(data) => {
            mutation.mutate({ text: data.note })
          }}
        />

        {/* <ul>
          <li>
            fetchingNotes.. ({fetchNotes.status}):
            <pre>{JSON.stringify(fetchNotes.data, null, 2)}</pre>
          </li>
        </ul> */}
      </Html>
    </>
  )
}

export async function getStaticProps() {
  return { props: { title: 'Index' } }
}
