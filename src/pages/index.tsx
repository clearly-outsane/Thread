import { Html } from '@react-three/drei'
import React from 'react'

import Input from '@/components/Input'

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
  return (
    <>
      <Html>
        <Input center />
      </Html>
    </>
  )
}

export async function getStaticProps() {
  return { props: { title: 'Index' } }
}
