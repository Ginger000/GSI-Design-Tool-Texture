import React, {useEffect, useRef} from 'react';
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";


const name = (type) => `Ground036_1K_${type}.jpg`;

const GSIbase = ({position, args, color}) => {
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
    const mesh = useRef(null);
    useEffect(()=>{
        mesh.current.geometry.translate(0, 0, -3)
    },[])
    return <mesh position={position} ref={mesh}>
        <boxBufferGeometry attach="geometry" args={args}  />
        <meshStandardMaterial attach="material"
            displacementScale={0}
            map={colorMap}
            displacementMap={displacementMap}
            normalMap={normalMap}
            roughnessMap={roughnessMap}
            aoMap={aoMap} 
        />
    </mesh>
};

export default GSIbase;
