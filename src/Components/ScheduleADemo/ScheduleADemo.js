import {
  Button,
  Col,
  Form,
  FormControl,
  InputGroup,
  // Modal,
  Row,
} from "react-bootstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import React, { useState } from "react";
import DemoBGC2 from "../../Images/bg Of demo c2@3x.png";
import ShopSVG from "../../Images/shop.svg";
import SmartphoneSVG from "../../Images/smartphone (1).svg";
import ZipcodeSVG from "../../Images/zip-code.svg";
import UserSVG from "../../Images/user.svg";
import "./ScheduleADemo.css";

function ScheduleADemo(props) {
  const [firstName, setFirstName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [phone, setPhone] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [description, setDescription] = useState("");
  const [isSeller, setIsSeller] = useState(false);

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
    props.scheduleDemoHandler();
  }

  return (
    <Modal
      className="schedule-demo-modal"
      isOpen={props.isOpen}
      centered
      size="xl"
    >
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
              {/* <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                Firm Name
              </Form.Label> */}

              {/* <InputGroup
                className="mb-2 schedule-input-group"
                style={{ borderRadius: "6px", border: "solid 1px #c3cde4" }}
              >
                <InputGroup.Text style={{ backgroundColor: "#f6f8fd" }}>
                  <img
                    src={ShopSVG}
                    width="16px"
                    height="16px"
                    alt="shop-icon"
                  />
                </InputGroup.Text>
                <Form.Control
                  id="inlineFormInput"
                  className="schedule-form"
                  placeholder="Firm Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </InputGroup> */}

              <div className="sample-input-img shop">
                <img
                  // className="sample-input-img"
                  src={ShopSVG}
                  width="16px"
                  height="16px"
                  alt="user-icon"
                />
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
              {/* <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                Owner Name
              </Form.Label> */}
              {/* <InputGroup
                className="mb-2 schedule-input-group"
                style={{ borderRadius: "6px", border: "solid 1px #c3cde4" }}
              >
                <InputGroup.Text style={{ backgroundColor: "#f6f8fd" }}>
                  <img
                    src={UserSVG}
                    width="16px"
                    height="16px"
                    alt="user-icon"
                  />
                </InputGroup.Text>
                <FormControl
                  id="inlineFormInputGroup"
                  className="schedule-form"
                  placeholder="Owner Name"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                />
              </InputGroup> */}
              <div className="sample-input-img user">
                <img
                  // className="sample-input-img"
                  src={UserSVG}
                  width="16px"
                  height="16px"
                  alt="user-icon"
                />
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
          <Row className="align-items-center justify-content-center mb-auto mt-2 mx-5">
            <Col xs="12" sm="12" md="12" lg="6" xl="6" className="pl-auto pr-2">
              {/* <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                Phone Number/Landline
              </Form.Label> */}
              {/* <InputGroup
                className="mb-2 schedule-input-group"
                style={{ borderRadius: "6px", border: "solid 1px #c3cde4" }}
              >
                <InputGroup.Text style={{ backgroundColor: "#f6f8fd" }}>
                  <img
                    src={SmartphoneSVG}
                    width="16px"
                    height="16px"
                    alt="smartphone-icon"
                  />
                </InputGroup.Text>
                <Form.Control
                  id="inlineFormInput"
                  placeholder="Phone Number/Landline"
                  className="schedule-form"
                  maxLength="10"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </InputGroup> */}
              <div className="sample-input-img smartphone">
                <img
                  // className="sample-input-img"
                  src={SmartphoneSVG}
                  width="16px"
                  height="16px"
                  alt="user-icon"
                />
              </div>
              <input
                className="sample-input-text"
                type="text"
                placeholder="Phone Number/Landline"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Col>
            <Col xs="12" sm="12" md="12" lg="6" xl="6" className="pr-auto pl-2">
              {/* <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                Pincode
              </Form.Label> */}
              {/* <InputGroup
                className="mb-2 schedule-input-group"
                style={{ borderRadius: "6px", border: "solid 1px #c3cde4" }}
              >
                <InputGroup.Text style={{ backgroundColor: "#f6f8fd" }}>
                  <img
                    src={ZipcodeSVG}
                    width="16px"
                    height="16px"
                    alt="zipcode-icon"
                  />
                </InputGroup.Text>
                <FormControl
                  id="inlineFormInputGroup"
                  className="schedule-form"
                  placeholder="Pincode"
                  maxLength="6"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                />
              </InputGroup> */}
              <div className="sample-input-img pincode">
                <img
                  // className="sample-input-img"
                  src={ZipcodeSVG}
                  width="16px"
                  height="16px"
                  alt="user-icon"
                />
              </div>
              <input
                className="sample-input-text"
                type="text"
                placeholder="Pincode"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </Col>
          </Row>
          {/* <Row className="align-items-center justify-content-center mt-auto mb-2 mx-5 demo-2">
            <Col xs="12" sm="12" md="12" lg="6" xl="6" className="pr-auto pl-2">
              <div className="sample-input-img">
                <img
                  // className="sample-input-img"
                  src={UserSVG}
                  width="16px"
                  height="16px"
                  alt="user-icon"
                />
              </div>
              <input className="sample-input-text" type="text" placeholder="" value={} onChange={} />
            </Col>
          </Row> */}
          <Row className="my-auto mx-5">
            <Col xs="12" sm="12" md="12" lg="12" xl="12">
              <div className="description-row-header" style={{}}>
                <Form.Label htmlFor="inlineFormInputGroup">
                  Description<span className="span-required-red">*</span>
                </Form.Label>
                <label>
                  Max <span className="span-blue-green">470</span> Characters
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
                maxLength="470"
                value={
                  description.length > 0
                    ? description
                    : "Yes, I am interested in a demo."
                }
                onChange={(e) => setDescription(e.target.value)}
              />
            </Col>
          </Row>
          <Row className="my-auto mx-5">
            <Col xs="6" sm="6" md="6" lg="6" xl="6">
              <Form.Check
                type="checkbox"
                id="autoSizingCheck"
                className="mb-2 schedule-form-checkbox"
                label="Remember me"
                checked={isSeller}
                onChange={(e) => setIsSeller(!isSeller)}
              />
            </Col>
          </Row>
          <Row className="mx-5 mb-4 mt-auto justify-content-end row">
            <div className="mr-3 close-btn">
              <Button variant="#c3cde4" onClick={props.scheduleDemoHandler}>
                Close
              </Button>
            </div>
            <div className="mr-3">
              <Button variant="primary" onClick={dataHandler}>
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
