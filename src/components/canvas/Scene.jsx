import { Preload } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

export default function Scene({ children, ...props }) {
  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <Canvas {...props}>
      {/* <color attach='background' args={['#000']} /> */}
      <directionalLight intensity={0.75} />
      <ambientLight intensity={0.75} />
      {children}
      <Preload all />
    </Canvas>
  )
}
