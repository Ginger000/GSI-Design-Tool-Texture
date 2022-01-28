import { useSpring, animated} from '@react-spring/three'
import React, {useRef, useEffect} from 'react';
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";


const name = (type) => `Grass001_1K_${type}.jpg`;
const name2 = (type) => `PavingStones092_1K_${type}.jpg`;


const GSIplantedSurface =  ({position, args, color, GSIRatio, prevGSIRatios, surfaceType}) => {

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

      const [
        colorMap2,
        displacementMap2,
        normalMap2,
        roughnessMap2,
        aoMap2
      ] = useLoader(TextureLoader, [
        name2("Color"),
        name2("Displacement"),
        name2("Normal"),
        name2("Roughness"),
        name2("AmbientOcclusion")
      ]);
    
    let prevRatios = prevGSIRatios.current
    
    const mesh = useRef(null);
    useEffect(()=>{
        mesh.current.geometry.translate(0, 0, 3.01)
    },[])
    // let a = (GSIRatio/(GSIRatio+1)).toFixed(2)
    const {GSIScale} = useSpring({

        // GSIScale:[1,1,GSIRatio/(GSIRatio+1)],
        GSIScale: GSIRatio === 2 ? [1,1,1] : [1,1,GSIRatio/(GSIRatio+1)] ,
        // delay: prevRatios[prevRatios.length-2] < GSIRatio ? 2000 : 0 ,
        config:{
            duration:prevRatios[prevRatios.length-2] < GSIRatio ? 2500 :1000
        }
    })

    // const {scaleX, scaleY, scaleZ} = GSIScale;

    // const [colorMap, displacementMap, normalMap, roughnessMap, aoMap] = useLoader(
    //     TextureLoader, [
    //         name("Color"),
    //         name("Displacement"),
    //         name("Normal"),
    //         name("Roughness"),
    //         name("AmbientOcclusion")
    //     ] 
    // )
    // colorMap.wrapS = THREE.RepeatWrapping
    // colorMap.wrapT = THREE.RepeatWrapping
    // colorMap.repeat.set(scaleZ,1)
    // displacementMap.repeat.set(1,scaleZ)
    // normalMap.repeat.set(1,scaleZ)
    // roughnessMap.repeat.set(1,scaleZ)
    // aoMap.repeat.set(1,scaleZ)


    return (
        <animated.mesh position={position} ref={mesh} scale={GSIScale}>
            {console.log("hahahahahah prev",prevRatios[prevRatios.length-2])}
            <boxBufferGeometry attach="geometry" args={args}  />
            <meshStandardMaterial attach="material" 
                displacementScale={0}
                map={surfaceType === "planted" ? colorMap : colorMap2}
                displacementMap={surfaceType === "planted" ? displacementMap : displacementMap2}
                normalMap={surfaceType === "planted" ? normalMap : normalMap2  }
                roughnessMap={surfaceType === "planted" ? roughnessMap : roughnessMap2}
                aoMap = {surfaceType === "planted" ? aoMap:aoMap2}
            />
        </animated.mesh>
    )
}

export default GSIplantedSurface;
