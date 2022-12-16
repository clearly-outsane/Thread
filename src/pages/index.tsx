import { Html } from '@react-three/drei'
import React from 'react'

import Input from '@/components/Input'

import { trpc } from '@/utils/trpc'

// Dynamic import is used to prevent a payload when the website starts, that includes threejs, r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49

// Dom components go here
export default function Page() {
  return <div className='relative min-h-screen'>bing bong</div>
}

// Canvas components go here
// It will receive same props as the Page component (from getStaticProps, etc.)
Page.canvas = () => {
  const mutation = trpc.note.useMutation()
  // const fetchNotes = trpc.fetchNotes.useQuery({})
  return (
    <>
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
