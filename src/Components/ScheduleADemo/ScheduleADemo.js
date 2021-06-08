import {
  Button,
  Col,
  Form,
  FormControl,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import React, { useState } from "react";
import DemoBGC2 from "../../Images/bg Of demo c2.svg";
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
    <Modal.Dialog className="schedule-demo-modal">
      <Modal.Body
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
        <Form>
          {/* Firm Name and Owner Name */}
          <Row className="align-items-center justify-content-center my-auto mx-5">
            <Col xs="12" sm="12" md="6" lg="6" xl="6">
              <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                Firm Name
              </Form.Label>
              <InputGroup
                className="mb-2"
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
              </InputGroup>
            </Col>
            <Col xs="12" sm="12" md="6" lg="6" xl="6">
              <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                Owner Name
              </Form.Label>
              <InputGroup
                className="mb-2"
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
              </InputGroup>
            </Col>
          </Row>

          {/* Phone Number and Pin Code */}
          <Row className="align-items-center justify-content-center my-auto mx-5">
            <Col xs="12" sm="12" md="6" lg="6" xl="6">
              <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                Phone Number/Landline
              </Form.Label>
              <InputGroup
                className="mb-2"
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
              </InputGroup>
            </Col>
            <Col xs="12" sm="12" md="6" lg="6" xl="6">
              <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                Pincode
              </Form.Label>
              <InputGroup
                className="mb-2"
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
              </InputGroup>
            </Col>
          </Row>

          <Row className="my-auto mx-5">
            <Col xs="12" sm="12" md="12" lg="12" xl="12">
              <Form.Label
                htmlFor="inlineFormInputGroup"
                style={{ color: "#0d1321" }}
              >
                Description
              </Form.Label>
              <Form.Control
                style={{ borderRadius: "6px", border: "solid 1px #c3cde4" }}
                id="inlineFormInputGroup"
                className="schedule-form"
                as="textarea"
                rows={3}
                value={description}
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
          <Row className="mx-3 mb-4 mt-auto justify-content-end row">
            <div className="mr-3 close-btn">
              <Button variant="#c3cde4" onClick={props.scheduleDemoHandler}>
                Close
              </Button>
            </div>
            <div>
              <Button variant="primary" onClick={dataHandler}>
                Schedule Demo
              </Button>
            </div>
          </Row>
        </Form>
      </Modal.Body>
    </Modal.Dialog>
  );
}

export default ScheduleADemo;
