import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Lottie from "react-lottie";
import { Modal, ModalBody } from "reactstrap";
import SuccessAnimation from "../../Images/animated/Success-animation.json";
import "./SuccessModal.css";

function SuccessModal(props) {
  const [modal, setModal] = useState(false);

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: SuccessAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    setModal(props.isOpen);
  }, [props.isOpen]);

  return (
    <Modal className="success-modal" isOpen={modal} centered size="md">
      <ModalBody
        className="success-modal-body"
        style={{ padding: "0", borderRadius: "14px" }}
      >
        <Lottie
          options={defaultOptions}
          // width="192"
          // height={screenHeight}
          style={{
            // width: "100%",
            borderRadius: "14px",
            width: "75%",
            height: "75%",
          }}
        />
        <h3 className="success-heading">
          Your demo has been scheduled successfully
        </h3>
        <p className="success-paragraph">Our team will contact you very soon</p>
      </ModalBody>
    </Modal>
  );
}

export default SuccessModal;
