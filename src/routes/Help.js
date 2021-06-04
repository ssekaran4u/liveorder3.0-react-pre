import React, { useState } from "react";
import { Accordion, Card, Container, Row } from "react-bootstrap";
import faqData from "./helpdata.json";
import "./help.css";
import PatternHelp from "../Images/pattern help.svg";

function Help() {
  const [section, setSection] = useState("general");
  const [activeKey, setActiveKey] = useState(null);

  return (
    <>
      <div className="text-center help-container">
        <Container
          fluid
          style={{ backgroundColor: "rgba(236, 232, 254, 0.2)" }}
        >
          <Container>
            <Row className="help-container-welcome">
              <div style={{ textAlign: "left" }} className="pt-5">
                <h3 className="h3 mt-5 mb-3">Namaste!</h3>
                <h3 className="h3 mb-3">How can we assist you?</h3>
                <p className="help-write-to-us body-copy mb-3">
                  Write us on
                  <span className="highlight-purple">Support@liveorder.in</span>
                  or Call
                  <span className="highlight-purple">+91-9087656789</span>
                  <br />
                  We would love to hear from you
                </p>
              </div>
              <div>
                <img src={PatternHelp} />
              </div>
            </Row>
          </Container>
        </Container>

        <Container>
          <Row
            className="help-faq-row"
            style={{
              marginLeft: "0",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "baseline",
              }}
            >
              <h4
                onClick={() => setSection("general")}
                className={section === "general" ? "active" : ""}
              >
                General
              </h4>
              <h4
                onClick={() => setSection("buyer")}
                className={section === "buyer" ? "active" : ""}
              >
                For Buyers
              </h4>
              <h4
                onClick={() => setSection("seller")}
                className={section === "seller" ? "active" : ""}
              >
                For Sellers
              </h4>
            </div>
          </Row>
          <Accordion>
            {faqData[section].map((sec, secIndex) => {
              return (
                <Card className="help-card text-left" key={secIndex}>
                  <Accordion.Toggle
                    as="text"
                    eventKey={`${secIndex}`}
                    onClick={() =>
                      activeKey === secIndex
                        ? setActiveKey(null)
                        : setActiveKey(secIndex)
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <Card.Header className="help-card-header">
                      <h5>{sec.question}</h5>
                      <span className="highlight-purple">
                        {activeKey === secIndex ? "-" : "+"}
                      </span>
                    </Card.Header>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={`${secIndex}`}>
                    <Card.Body className="h5 help-card-body">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Mauris quis ligula consectetur, sollicitudin turpis eget,
                      fringilla nisi. Duis at luctus ex, a laoreet orci. Aliquam
                      et pretium nisi. Duis gravida lobortis elit, rutrum
                      efficitur ligula blandit sit amet. Nullam vel nisl sed
                      massa egestas vehicula. Fusce in lorem commodo, rhoncus
                      turpis vitae, dapibus risus. Phasellus eu ex quis ligula
                      rhoncus imperdiet. Curabitur sollicitudin tincidunt leo at
                      laoreet. Curabitur luctus laoreet egestas. Nunc lacus
                      ligula, faucibus ac volutpat ac, accumsan a turpis
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              );
            })}
          </Accordion>
        </Container>
      </div>
      {/* <HeroSection />
      <WhyLiveSection />
      <NewVideo />
      <PartnerSection />
      <Testimonials />
      <LetsStartSection /> */}
    </>
  );
}

export default Help;
