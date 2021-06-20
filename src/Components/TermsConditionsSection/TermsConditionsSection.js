import React, { useState } from "react";
import { Accordion, Card, Row, Button } from "react-bootstrap";
import { Container } from "reactstrap";
import PolicyBG from "../../Images/Bg Of policy doc.svg";
// import faqData from "./helpdata.json";
import "./TermsConditionsSection.css";
// import PatternHelp from "../Images/pattern help.svg";
// import PlusSVG from "../Images/plus.svg";
// import MinusSVG from "../Images/Minus .svg";

function TermsConditions() {
  //   const [section, setSection] = useState("general");
  //   const [activeKey, setActiveKey] = useState(null);

  return (
    <div className="text-center terms-container">
      <Container fluid className="terms-container-fluid">
        <Container className="terms-heading-container">
          <Row className="terms-container-welcome">
            <div>
              <p className="mt-5 mb-3 terms-heading">Terms & Conditions</p>
              <p className="h3 mb-3 terms-subheading">Version: 22.02.2021</p>
            </div>
          </Row>
        </Container>
      </Container>

      <Container className="terms-content-container">
        <p className="terms-content-header">Terms & Conditions</p>
        <p className="terms-content-date">Last Revised: 15 February, 2021</p>

        <p className="terms-content-disclaimer">
          Please read all the terms & conditions carefully before accepting it.
        </p>
        <p className="terms-content-point">1. General</p>
        <p className="terms-content-paragraph">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s.
        </p>
        <p className="terms-content-point"> 2. Credit Limit Introduction</p>
        <p className="terms-content-paragraph">
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old. Richard McClintock, a Latin professor at
          Hampden-Sydney College in Virginia, looked up one of the more obscure
          Latin words, consectetur, from a Lorem Ipsum passage, and going
          through the cites of the word in classical literature, discovered the
          undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
          1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and
          Evil) by Cicero, written in 45 BC. This book is a treatise on the
          theory of ethics.
        </p>
        <p className="terms-content-point">2.1 Define Instruction</p>
        {/* <ul>
          <li className="terms-content-subpoint">
            The standard chunk of Lorem Ipsum used since the 1500s is
            reproduced.
          </li>
          <li className="terms-content-subpoint">
            1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero.
          </li>
          <li className="terms-content-subpoint">
            The standard chunk of Lorem Ipsum used since the 1500s is
            reproduced.
          </li>
          <li className="terms-content-subpoint">
            1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero.
          </li>
        </ul> */}
        <p className="terms-content-subpoint">
          The standard chunk of Lorem Ipsum used since the 1500s is reproduced.
        </p>
        <p className="terms-content-subpoint">
          1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero.
        </p>
        <p className="terms-content-subpoint">
          The standard chunk of Lorem Ipsum used since the 1500s is reproduced.
        </p>
        <p className="terms-content-subpoint">
          1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero.
        </p>
        <p className="terms-content-point">2.2 Terms & conditions</p>
        {/* <ul>
          <li className="terms-content-subpoint">
            The standard chunk of Lorem Ipsum used since the 1500s is
            reproduced.
          </li>
          <li className="terms-content-subpoint">
            1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero.
          </li>
        </ul> */}
        <p className="terms-content-subpoint">
          The standard chunk of Lorem Ipsum used since the 1500s is reproduced.
        </p>
        <p className="terms-content-subpoint">
          1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero.
        </p>
        <div className="terms-button-container d-flex align-items-center justify-content-end">
          <Button variant="#343a40" className="terms-button decline mr-1">
            DECLINE
          </Button>
          <Button variant="primary" className="terms-button agree">
            I AGREE
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default TermsConditions;

// Terms & Conditions
// Version: 22.02.2021