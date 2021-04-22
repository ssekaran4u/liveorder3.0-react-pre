import React,{Component} from 'react'
import Lottie from 'react-lottie'
import animationLoader from './loader-animation.json'

const DashboardLoader = (props) => {
    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: animationLoader,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    return(
        <div className='loaderdashboard'>
            <div className='loader'>
                <Lottie  options={defaultOptions} />   
            </div>
        </div>
    )
}
export default DashboardLoader