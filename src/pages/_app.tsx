import { NextComponentType } from 'next'
import { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { useRef } from 'react'

import '@/styles/index.css'

import Layout from '@/components/dom/Layout'

import Header from '@/config'
import { trpc } from '@/utils/trpc'

const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: true })

type CustomAppProps = AppProps & { Component: NextComponentType & { canvas?: (props: any) => JSX.Element } }

function App({ Component, pageProps = { title: 'index' } }: CustomAppProps) {
  const ref = useRef()
  return (
    <>
      <Header title={pageProps.title} />
      <Layout ref={ref}>
        {/* The canvas can either be in front of the dom or behind. If it is in front it can overlay contents.
         * Setting the event source to a shared parent allows both the dom and the canvas to receive events.
         * Since the event source is now shared, the canvas would block events, we prevent that with pointerEvents: none. */}
        {Component?.canvas && (
          <div className='pointer-events-none absolute top-0 right-0 bottom-0 left-0'>
            <Scene className='pointer-events-none' eventSource={ref} eventPrefix='client'>
              <Component.canvas {...pageProps} />
            </Scene>
          </div>
        )}
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default trpc.withTRPC(App)
