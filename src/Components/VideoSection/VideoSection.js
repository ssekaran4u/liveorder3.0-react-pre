import React, { Component } from 'react';
import KnowMoreVideo from '../../Video/KnowMoreVideo.mp4'
import './VideoSection.css'

class VideoSection extends Component {
  render() {
    return (
      <div className="VideoSection MainContainer text-center pt-5">
        <h2 className="h2 mb-4">Want to know More ?</h2>
        <h4 className="h4 grey-subtitle">Play the video &amp; get to know more in depth</h4>
        <div className="VideoSectionDiv position-relative">
          <video controls>
            <source src={KnowMoreVideo} type="video/mp4" />
          </video>
          <div className="PinkCircle"></div>
          <div className="PurpleBlob"></div>
        </div>
      </div>
    );
  }
}

export default VideoSection;