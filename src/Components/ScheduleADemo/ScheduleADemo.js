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
  const [ownerName, setOwnerName] = useState("");
  const [phone, setPhone] = useState("");
  // const [inValidPhone, setInvalidPhone] = useState(false);
  // const [inValidPincode, setInvalidPincode] = useState(false);
  const [pinCode, setPinCode] = useState("");
  const [description, setDescription] = useState(
    "Yes, I am interested in a demo."
  );
  const [isSeller, setIsSeller] = useState(false);

  useEffect(() => {
    setModal(props.isOpen);
  }, [props.isOpen]);

  function dataHandler() {
    let data = {
      firstName,
      ownerName,
      phone,
      pinCode,
      description,
      isSeller,
    };
    props.scheduleDataHandler(data);
    setModal(false);
    props.scheduleDemoHandler();
  }

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
            <Col xs="12" sm="12" md="12" lg="6" xl="6" className="pl-auto pr-2">
              <div className="sample-input-img shop">
                <img src={ShopSVG} width="16px" height="16px" alt="user-icon" />
              </div>
              <input
                className="sample-input-text"
                type="text"
                placeholder="Firm Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Col>
            <Col xs="12" sm="12" md="12" lg="6" xl="6" className="pr-auto pl-2">
              <div className="sample-input-img user">
                <img src={UserSVG} width="16px" height="16px" alt="user-icon" />
              </div>
              <input
                className="sample-input-text"
                type="text"
                placeholder="Owner Name"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
              />
            </Col>
          </Row>

          {/* Phone Number and Pin Code */}
          <Row className="align-items-center justify-content-center mb-3 mt-2 mx-5">
            <Col xs="12" sm="12" md="12" lg="6" xl="6" className="pl-auto pr-2">
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
                onChange={(e) => handleNumberChange(e, "phone")}
              />
            </Col>
            <Col xs="12" sm="12" md="12" lg="6" xl="6" className="pr-auto pl-2">
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
                onChange={(e) => handleNumberChange(e, "pincode")}
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
                className="schedule-form"
                as="textarea"
                rows={4}
                maxLength="500"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
              <Button variant="#c3cde4" onClick={props.scheduleDemoHandler}>
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
