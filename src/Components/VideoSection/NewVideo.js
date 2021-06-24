import React, { Component } from "react";
import ModalVideo from "react-modal-video";
import PlayButtonSVG from "../../Images/Play icon.svg";
import VideoPreview from "../../Images/Watch the Video.png";
import "./NewVideoSection.css";

class NewVideo extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
    };
    this.openModal = this.openModal.bind(this);
  }

  openModal() {
    this.setState({ isOpen: true });
  }

  render() {
    return (
      <div className="VideoContainer MainContainer text-center pt-5">
        <h2 className="h2 mb-4">Want to know More ?</h2>
        <h4 className="h4 grey-subtitle">
          Click on the video to get to know us better
        </h4>
        <div className="row-narrow">
          <div className="featured-video">
            <div className="column-container">
              <div className="column centered">
                <React.Fragment>
                  <ModalVideo
                    channel="youtube"
                    isOpen={this.state.isOpen}
                    videoId="q9XI0Lo-SWE"
                    onClose={() => this.setState({ isOpen: false })}
                  />
                  <div
                    className="video-btn video-popup px-0"
                    onClick={this.openModal}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="475.591"
                      height="450.268"
                      viewBox="0 0 475.591 450.268"
                    >
                      <path
                        fill="#eff5ff"
                        d="M259.943-23.351c30.74 35.491 43.315 82.439 48.066 127.99 4.751 45.271 1.677 89.7-16.488 129.108-18.165 39.682-50.861 74.894-92.22 92.22-41.359 17.047-91.1 16.488-129.387-2.795-38.565-19.282-65.951-57.009-93.9-98.088s-56.726-85.234-48.621-121.563c8.384-36.05 53.935-63.995 94.176-97.809C62.089-28.1 97.3-67.784 139.219-75.609c41.918-7.545 90.263 16.488 120.724 52.258z"
                        opacity="0.956"
                        transform="rotate(79.98 121.529 249.259)"
                      />
                    </svg>

                    <div className="play-button-container" title="Play Video">
                      <span>
                        <img
                          className="play-button-img"
                          src={PlayButtonSVG}
                          alt="play button icon"
                        />
                      </span>

                      {/* <div className="play-button">
                        <img src={PlayButtonSVG} alt="play button icon" /> */}
                      {/* <svg>
                          <title>Play Button</title>
                          <polygon points="10 33 10 1 34 17"></polygon>
                        </svg> */}
                      {/* </div> */}
                    </div>
                    <div className="image-container">
                      <img
                        className="card"
                        width="640"
                        height="384"
                        alt="Watch The Video"
                        src={VideoPreview}
                        // src="https://www.elegantthemes.com/images/home/divi-video-cover.jpg"
                        // data-src="https://www.elegantthemes.com/images/home/divi-video-cover.jpg"
                        //  data-srcset="https://www.elegantthemes.com/images/home/divi-video-cover-large.jpg 1592w, https://www.elegantthemes.com/images/home/divi-video-cover.jpg 796w, https://www.elegantthemes.com/images/home/divi-video-cover-small.jpg 384w"
                        sizes="(max-width: 520px) 100vw, 796px"
                        //  srcset="https://www.elegantthemes.com/images/home/divi-video-cover-large.jpg 1592w, https://www.elegantthemes.com/images/home/divi-video-cover.jpg 796w, https://www.elegantthemes.com/images/home/divi-video-cover-small.jpg 384w"
                      />
                      {/* <img className="card" width="512" height="340" alt="Watch The Video" src="https://www.elegantthemes.com/images/home/divi-video-cover.jpg" data-src="https://www.elegantthemes.com/images/home/divi-video-cover.jpg" data-srcset="https://www.elegantthemes.com/images/home/divi-video-cover-large.jpg 1592w, https://www.elegantthemes.com/images/home/divi-video-cover.jpg 796w, https://www.elegantthemes.com/images/home/divi-video-cover-small.jpg 384w" sizes="(max-width: 520px) 100vw, 796px" srcset="https://www.elegantthemes.com/images/home/divi-video-cover-large.jpg 1592w, https://www.elegantthemes.com/images/home/divi-video-cover.jpg 796w, https://www.elegantthemes.com/images/home/divi-video-cover-small.jpg 384w" /> */}
                    </div>
                  </div>
                </React.Fragment>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewVideo;
