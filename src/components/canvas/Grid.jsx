import { Instances } from '@react-three/drei'

const Grid = ({ lineWidth = 0.008, height = 0.2 }) => (
  // Renders a grid and crosses as instances
  <Instances rotation={[Math.PI / 2, 0, 0]} position={[0, -1.02, 0]}>
    <planeGeometry args={[lineWidth, height]} />
    <meshBasicMaterial color='#999' />

    <gridHelper args={[20, 30, '#333', '#333']} position={[0, -0.01, 0]} />
  </Instances>
)

export default Grid
