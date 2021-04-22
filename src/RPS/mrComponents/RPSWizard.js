import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

const RPSWizard = (props) => {
  const { step, progress } = props;

  return (
    <div className="wizard-sec">
      <div className="f1-steps">
        <div className="f1-progress">
          <ProgressBar now={progress} className="f1-progress-line" />
        </div>

        <div className={`step ${step === 0 && "active"} ${step > 0 && "activated"}`}>
          <div className="step-details">
            <h5>Step 1</h5>
            <h4>RPS Setup</h4>
          </div>
          <div className="f1-step">
            <div className="f1-step-icon">
              <i className="fa fa-circle" aria-hidden="true"></i>
              <i className="fa fa-check" aria-hidden="true"></i>
            </div>
          </div>
          <p>Select RPS Setup</p>
        </div>

        <div className={`step ${step === 1 && "active"} ${step > 1 && "activated"}`}>
          <div className="step-details">
            <h5>Step 2</h5>
            <h4>RPS Details</h4>
          </div>
          <div className="f1-step">
            <div className="f1-step-icon">
              <i className="fa fa-circle" aria-hidden="true"></i>
              <i className="fa fa-check" aria-hidden="true"></i>
            </div>
          </div>
          <p>RPS Details</p>
        </div>

        <div className={`step ${step === 2 && "active"} ${step > 2 && "activated"}`}>
          <div className="step-details">
            <h5>Step 3</h5>
            <h4>Dr. Details</h4>
          </div>
          <div className="f1-step">
            <div className="f1-step-icon">
              <i className="fa fa-circle" aria-hidden="true"></i>
              <i className="fa fa-check" aria-hidden="true"></i>
            </div>
          </div>
          <p>Dr. Details</p>
        </div>

        <div className={`step ${step === 3 && "active"} ${step > 3 && "activated"}`}>
          <div className="step-details">
            <h5>Step 4</h5>
            <h4>Item Details</h4>
          </div>
          <div className="f1-step">
            <div className="f1-step-icon">
              <i className="fa fa-circle" aria-hidden="true"></i>
              <i className="fa fa-check" aria-hidden="true"></i>
            </div>
          </div>
          <p>Item Details</p>
        </div>

      </div>
    </div>
  )
}

export default RPSWizard;