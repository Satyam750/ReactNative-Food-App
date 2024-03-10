import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react"
import { Image } from "react-native"

import Animated from "react-native-reanimated"


export default function CachedImage(props) {
    const [cachedSource, setCachedSource] = useState(null)
    const {uri} = props

    useEffect(()=>{
     const getCachedImage = async()=>{
        try { 
             const cachedImageData = await AsyncStorage.getItem(uri);
             if(cachedImageData){
                setCachedSource({uri:cachedImageData})
             }else{
                const response = await fetch(uri);
                const imageBlob = await response.blob()
                const base64Data = await new Promise((resolve) => {
                    const render = new FileReader()
                    render.readAsDataURL(imageBlob)
                    render.onloadend = () => {
                        resolve(render.result)
                    }
                })
                await AsyncStorage.setItem(uri, base64Data);
                setCachedSource({uri:base64Data})
             }
        } catch (error) {
            console.error('Error caching image',error)
        }
     }
     getCachedImage()
    },[])
  return (
    <Animated.Image source={cachedSource} {...props}/>
  )
}