import { useSpring, animated} from '@react-spring/three'
import React, { useRef, useEffect} from 'react';
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";

const name = (type) => `Ground048_1K_${type}.jpg`;
const GSIdepth = ({position, args, color, GSIRatio, prevGSIRatios, depth}) => {
    const [
        colorMap,
        displacementMap,
        normalMap,
        roughnessMap,
        aoMap
      ] = useLoader(TextureLoader, [
        name("Color"),
        name("Displacement"),
        name("Normal"),
        name("Roughness"),
        name("AmbientOcclusion")
      ]);
    let prevRatios = prevGSIRatios.current
    const mesh = useRef(null);
    useEffect(()=>{
        mesh.current.geometry.translate(0, -1.25, 3.01)
    },[])

    const {GSISoilScale} = useSpring({
        
        // GSISoilScale:[1,1,GSIRatio/(GSIRatio+1)],
        GSISoilScale:GSIRatio ===2? [1,depth/2.5,1] : [1,depth/2.5,GSIRatio/(GSIRatio+1)],
        // delay:prevGSIRatio < GSIRatio ? 2000 : 0 ,
        // delay:2000,
        config:{
            duration:prevRatios[prevRatios.length-2] < GSIRatio ? 2500 :1000
        }
    })
    return (
        <animated.mesh position={position} ref={mesh} scale={GSISoilScale}>
            <boxBufferGeometry attach="geometry" args={args}  />
            <meshStandardMaterial attach="material" 
                displacementScale={0}
                map={colorMap}
                displacementMap={displacementMap}
                normalMap={normalMap}
                roughnessMap={roughnessMap}
                aoMap={aoMap}
            />
        </animated.mesh>
    )
}

export default GSIdepth;
