import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Modal, ModalBody } from "reactstrap";
import DemoBGC2 from "../../Images/bg Of demo c2@3x.png";
import ShopSVG from "../../Images/shop.svg";
import SmartphoneSVG from "../../Images/smartphone (1).svg";
import ZipcodeSVG from "../../Images/zip-code.svg";
import UserSVG from "../../Images/user.svg";
import "./ScheduleADemo.css";

function ScheduleADemo(props) {
  const [modal, setModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [errorName, setErrorName] = useState(false);

  const [ownerName, setOwnerName] = useState("");
  const [errorOwner, setErrorOwner] = useState(false);

  const [phone, setPhone] = useState("");
  const [errorPhone, setErrorPhone] = useState(false);

  const [pinCode, setPinCode] = useState("");
  const [errorPincode, setErrorPincode] = useState(false);

  const [description, setDescription] = useState(
    "Yes, I am interested in a demo."
  );
  const [errorDescription, setErrorDescription] = useState(false);
  const [isSeller, setIsSeller] = useState(false);

  useEffect(() => {
    setModal(props.isOpen);
  }, [props.isOpen]);

  function dataHandler() {
    // if (firstName === "") {
    //   setErrorName(true);
    // }

    // if (ownerName === "") {
    //   setErrorOwner(true);
    // }

    // if (phone === "") {
    //   setErrorPhone(true);
    // }

    // if (pinCode === "") {
    //   setErrorPincode(true);
    // }

    // if (description === "") {
    //   setErrorDescription(true);
    // }

    let data = {
      firstName,
      ownerName,
      phone,
      pinCode,
      description,
      isSeller,
    };

    // if (
    //   errorName === false &&
    //   errorOwner === false &&
    //   errorPhone === false &&
    //   errorPincode === false &&
    //   errorDescription === false
    // ) {
    props.scheduleDataHandler(data);
    setModal(false);
    props.scheduleDemoHandler();
    resetFormData();
    // }
  }

  const resetFormData = () => {
    setFirstName("");
    setOwnerName("");
    setPhone("");
    setPinCode("");
    setDescription("");
    setIsSeller(false);
  };

  const handleNumberChange = (e, type) => {
    let telephone = e.target.value;

    if (telephone.length > 0) {
      if (!Number(telephone)) {
        if (type === "pincode") {
          // return setInvalidPincode(true);
          return;
        } else if (type === "phone") {
          // return setInvalidPhone(true);
          return;
        } else {
          return;
        }
      }

      if (type === "pincode") {
        setPinCode(e.target.value);
        // setInvalidPincode(false);
      } else if (type === "phone") {
        setPhone(e.target.value);
        // setInvalidPhone(false);
      }
    } else {
      if (type === "pincode") {
        setPinCode("");
        // setInvalidPincode(false);
      } else if (type === "phone") {
        setPhone("");
        // setInvalidPhone(false);
      }
    }
  };

  return (
    <Modal className="schedule-demo-modal" isOpen={modal} centered size="xl">
      <ModalBody
        className="schedule-modal-body"
        style={{ padding: "0", borderRadius: "14px" }}
      >
        <div className="m-0 p-0 header-image">
          <img src={DemoBGC2} width="100%" alt="demo-icon" />
          <h6 className="h6-small">
            Thank you for showing interest in “Live Order”
          </h6>
          <p className="body-copy">Fill the form to proceed.</p>
        </div>
        <Form className="mt-4">
          {/* Firm Name and Owner Name */}
          <Row className="align-items-center justify-content-center mt-auto mb-3 mx-5">
            <Col
              xs="12"
              sm="12"
              md="12"
              lg="6"
              xl="6"
              className={`${
                errorName === true ? "error-red" : ""
              } pl-auto pr-2`}
            >
              <div className="sample-input-img shop">
                <img src={ShopSVG} width="16px" height="16px" alt="user-icon" />
              </div>
              <input
                className="sample-input-text"
                type="text"
                placeholder="Firm Name"
                value={firstName}
                onChange={(e) => {
                  if (e.target.value === "") {
                    setErrorName(true);
                    setFirstName(e.target.value);
                  } else {
                    setErrorName(false);
                    setFirstName(e.target.value);
                  }
                }}
              />
            </Col>
            <Col
              xs="12"
              sm="12"
              md="12"
              lg="6"
              xl="6"
              className={`${
                errorOwner === true ? "error-red" : ""
              } pr-auto pl-2`}
            >
              <div className="sample-input-img user">
                <img src={UserSVG} width="16px" height="16px" alt="user-icon" />
              </div>
              <input
                className="sample-input-text"
                type="text"
                placeholder="Owner Name"
                value={ownerName}
                onChange={(e) => {
                  if (e.target.value === "") {
                    setErrorOwner(true);
                    setOwnerName(e.target.value);
                  } else {
                    setErrorOwner(false);
                    setOwnerName(e.target.value);
                  }
                }}
              />
            </Col>
          </Row>

          {/* Phone Number and Pin Code */}
          <Row className="align-items-center justify-content-center mb-3 mt-2 mx-5">
            <Col
              xs="12"
              sm="12"
              md="12"
              lg="6"
              xl="6"
              className={`${
                errorPhone === true ? "error-red" : ""
              } pr-2 pl-auto`}
            >
              <div className="sample-input-img smartphone">
                <img
                  src={SmartphoneSVG}
                  width="16px"
                  height="16px"
                  alt="user-icon"
                />
              </div>
              <input
                className="sample-input-text"
                type="text"
                pattern="[0-9]"
                maxLength={10}
                placeholder="Phone Number/Landline"
                value={phone}
                onChange={(e) => {
                  if (e.target.value === "") {
                    setErrorPhone(true);
                    handleNumberChange(e, "phone");
                  } else {
                    setErrorPhone(false);
                    handleNumberChange(e, "phone");
                  }
                }}
              />
            </Col>
            <Col
              xs="12"
              sm="12"
              md="12"
              lg="6"
              xl="6"
              className={`${
                errorPincode === true ? "error-red" : ""
              } pr-auto pl-2`}
            >
              <div className="sample-input-img pincode">
                <img
                  src={ZipcodeSVG}
                  width="16px"
                  height="16px"
                  alt="user-icon"
                />
              </div>
              <input
                className="sample-input-text"
                type="text"
                pattern="[0-9]"
                placeholder="Pincode"
                maxLength={6}
                value={pinCode}
                onChange={(e) => {
                  if (e.target.value === "") {
                    setErrorPincode(true);
                    handleNumberChange(e, "pincode");
                  } else {
                    setErrorPincode(false);
                    handleNumberChange(e, "pincode");
                  }
                }}
              />
            </Col>
          </Row>

          <Row className="my-auto mx-5">
            <Col xs="12" sm="12" md="12" lg="12" xl="12">
              <div className="description-row-header" style={{}}>
                <Form.Label htmlFor="inlineFormInputGroup">
                  Description<span className="span-required-red">*</span>
                </Form.Label>
                <label>
                  Max{" "}
                  <span
                    className={
                      500 - description.length > 250
                        ? "span-blue-green"
                        : 500 - description.length > 50
                        ? "span-yellow"
                        : "span-red"
                    }
                  >
                    {500 - description.length}
                  </span>{" "}
                  Characters
                </label>
              </div>
              <Form.Control
                style={{
                  borderRadius: "6px",
                  border: "solid 1px #c3cde4",
                  resize: "none",
                }}
                id="inlineFormInputGroup"
                className={`${
                  errorDescription === true ? "error-red" : ""
                } schedule-form`}
                as="textarea"
                rows={4}
                maxLength="500"
                value={description}
                onChange={(e) => {
                  if (e.target.value === "") {
                    setErrorDescription(true);
                    setDescription(e.target.value);
                  } else {
                    setErrorDescription(false);
                    setDescription(e.target.value);
                  }
                }}
              />
            </Col>
          </Row>
          <Row className="my-auto mx-5">
            <Col xs="6" sm="6" md="6" lg="6" xl="6">
              <label className="schedule-checkbox-container">
                Are you a seller
                <input
                  type="checkbox"
                  checked={isSeller}
                  onChange={(e) => setIsSeller(!isSeller)}
                />
                <span className="checkmark"></span>
              </label>
            </Col>
          </Row>
          <Row className="mx-5 mb-4 mt-auto justify-content-end row">
            <div className="mr-3 close-btn">
              <Button variant="#c3cde4" onClick={props.closeModal}>
                Close
              </Button>
            </div>
            <div className="mr-3">
              <Button
                variant="primary"
                className="schedule-demo-form-btn"
                onClick={dataHandler}
              >
                Schedule Demo
              </Button>
            </div>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  );
}

export default ScheduleADemo;
