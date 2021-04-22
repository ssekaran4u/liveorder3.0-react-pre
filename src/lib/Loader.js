import React,{Component} from 'react'
import Lottie from 'react-lottie'
import animationLoader from './loader-animation.json'

const Loader = (props) => {
    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: animationLoader,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    if (!props.show)
        return null
    return(
        <div className='loaderBack'>
            <div className='loader'>
                <Lottie  options={defaultOptions} />   
            </div>
        </div>
    )
}
export default Loader

