import React, {Component} from "react"

const DCRHeader = (props) => {
    const { isFull, showHeader } = props
    return(
        <div className="dcr-head">
            <div>
                <h5 className="dcr-list-sec-head"> List</h5>
            </div>
            <div className="dcr-head-options">
                {
                    isFull &&
                    <img src="../public/assets/images/collapse-grey.svg" className="fullscreen_img"
                         alt="fullscreen_img" onClick={props.changeView}/>
                }
                {
                    !isFull &&
                    <img src="../public/assets/images/fullscreen.svg" className="fullscreen_img"
                         alt="fullscreen_img" onClick={props.changeView} />
                }
                <button
                    onClick={props.toggleHeader}
                    className="hide-tablehead-btn"
                >
                    <span className="hide-mobile">{showHeader ? "Hide " : "Show " }Table Options</span>
                    <span className="show-mobile">{showHeader ? "Hide " : "Show " }</span>
                </button>
            </div>
        </div>
    )
}

export default DCRHeader