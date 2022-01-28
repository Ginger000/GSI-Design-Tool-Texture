import React, {useRef, useEffect} from 'react';
import { useSpring, animated} from '@react-spring/three'
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
const name = (type) => `Concrete034_1K_${type}.jpg`;


const GSIbaseSurface = ({position, args, color, GSIratio}) => {
    const [
        colorMap,
        displacementMap,
        normalMap,
        roughnessMap,
      ] = useLoader(TextureLoader, [
        name("Color"),
        name("Displacement"),
        name("Normal"),
        name("Roughness"),
      ]);
    const mesh = useRef(null);
    useEffect(()=>{
        mesh.current.geometry.translate(0, 0, -3)
    }, [])
    const {hardScale} = useSpring({
        hardScale:GSIratio ===2? [1,1,0] : [1,1,1-GSIratio/(GSIratio+1)],
        config:{
            duration:1000
        }
    })
    return <animated.mesh position={position} ref={mesh} scale={hardScale}>
                <boxBufferGeometry attach="geometry" args={args}  />
                <meshStandardMaterial attach="material"
                 displacementScale={0}
                 map={colorMap}
                 displacementMap={displacementMap}
                 normalMap={normalMap}
                 roughnessMap={roughnessMap}
                />
            </animated.mesh>;
};

export default GSIbaseSurface;
