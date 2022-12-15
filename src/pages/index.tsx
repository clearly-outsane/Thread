import { Html } from '@react-three/drei'
import { useRouter } from 'next/router'
import React from 'react'

import Input from '@/components/Input'

import { trpc } from '@/utils/trpc'

// Dynamic import is used to prevent a payload when the website starts, that includes threejs, r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49

// Dom components go here
export default function Page() {
  const router = useRouter()

  return (
    <div className='relative min-h-screen' onClick={() => router.push('blob')}>
      bing bong
    </div>
  )
}

// Canvas components go here
// It will receive same props as the Page component (from getStaticProps, etc.)
Page.canvas = () => {
  const mutation = trpc.note.useMutation()
  return (
    <>
      <Html>
        <Input
          center
          onSubmit={(note) => {
            mutation.mutate({ text: note })
          }}
        />
      </Html>
    </>
  )
}

export async function getStaticProps() {
  return { props: { title: 'Index' } }
}
