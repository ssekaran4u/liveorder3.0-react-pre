import React, { useState } from "react";
import { Accordion, Card, Container, Row } from "react-bootstrap";
import faqData from "./helpdata.json";
import "./help.css";
import PatternHelp from "../Images/pattern help.svg";
import PlusSVG from "../Images/plus.svg";
import MinusSVG from "../Images/Minus .svg";

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
                <h3 className="h3 mt-5 mb-3 help-heading">Namaste!</h3>
                <h3 className="h3 mb-3 help-heading">How can we assist you?</h3>
                <p className="help-write-to-us body-copy mb-3">
                  Write us on{" "}
                  <span className="highlight-purple">Support@liveorder.in</span>{" "}
                  or Call{" "}
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

        <Container className="help-faq-container">
          <Row className="help-faq-row mx-5 my-1 ml-0 mb-3">
            <div
              className="d-flex align-items-baseline justify-content-start"
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "baseline",
              }}
            >
              <h4
                onClick={() => setSection("general")}
                className={
                  section === "general"
                    ? "cursor-pointer active"
                    : "cursor-pointer"
                }
              >
                General
              </h4>
              <h4
                onClick={() => setSection("buyer")}
                className={
                  section === "buyer"
                    ? "cursor-pointer active"
                    : "cursor-pointer"
                }
              >
                For Buyers
              </h4>
              <h4
                onClick={() => setSection("seller")}
                className={
                  section === "seller"
                    ? "cursor-pointer active"
                    : "cursor-pointer"
                }
              >
                For Sellers
              </h4>
            </div>
            <span className="help-faq-row-horizontal-line"></span>
          </Row>
          <Accordion className="px-5">
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
                    <Card.Header className="help-card-header border-0">
                      <h5>{sec.question}</h5>
                      <img
                        src={activeKey === secIndex ? MinusSVG : PlusSVG}
                        alt={
                          activeKey === secIndex
                            ? "minus symbol icon"
                            : "plus symbol icon"
                        }
                      />
                      {/* <span className="highlight-purple">
                        {activeKey === secIndex ? "-" : "+"}
                      </span> */}
                    </Card.Header>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={`${secIndex}`}>
                    <Card.Body className="px-0 h5 help-card-body border-bottom-1">
                      {secIndex === 0 ? (
                        <>
                          Live order is B2B online ordering platform connecting
                          Buyer’s and Sellers which gives over all solution to
                          “Buyer’s” in turn increasing the business of
                          “Sellers.” <br /> <br />
                          Buyer’s are benefited with several options with eases
                          their day to day routine in the Pharma World. Sellers
                          can reach out new Buyer’s with better utilisation of
                          time by reducing call centre cost.
                        </>
                      ) : (
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Mauris quis ligula consectetur, sollicitudin turpis eget fringilla nisi. Duis at luctus ex, a laoreet orci. Aliquamet pretium nisi. Duis gravida lobortis elit, rutrumefficitur ligula blandit sit amet. Nullam vel nisl sedmassa egestas vehicula. Fusce in lorem commodo, rhoncusturpis vitae, dapibus risus. Phasellus eu ex quis ligularhoncus imperdiet. Curabitur sollicitudin tincidunt leo atlaoreet. Curabitur luctus laoreet egestas. Nunc lacusligula, faucibus ac volutpat ac, accumsan a turpis"
                      )}
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
