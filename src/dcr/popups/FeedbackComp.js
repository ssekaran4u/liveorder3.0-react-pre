/* 
* showing modal for feedback
* Request URL=url/DCRAPI
* Index=Work_contact_save
* Request string=
 {"Index":"Work_contact_save","Data":{"SAMPLES GIVEN0301":{"QuestionCode":"03","QuestionGroupCode":"01","marks":"3","fscode":"MR2"},"RELATIONSHIP WITH DOCTOR0201":{"QuestionCode":"02","QuestionGroupCode":"01","marks":"4","fscode":"MR2"},"PRODUCT EXPLANATION0101":{"QuestionCode":"01","QuestionGroupCode":"01","marks":"5","fscode":"MR2       "},"COMMUNICATION SKILL0401":{"QuestionCode":"04","QuestionGroupCode":"01","marks":"2","fscode":"MR2"},"PRODUCT KNWOLEDGE0601":{"QuestionCode":"06","QuestionGroupCode":"01","marks":"1","fscode":"MR2"}},"Header":{"dcrno":"305038","doc":"DD00003"},"Token":""}

* Response string=success	
* Response Error={}

*/

import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import StarComp from "./StarComp";
import { postToServer } from "../../lib/comm-utils";
import { header } from "../../testdata/missedreport";
class FeedbackComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            AnswerJson: {}
        };

        this.funWork_contact_Answer = this.funWork_contact_Answer.bind(this);
        this.hide = this.hide.bind(this);
    }

    funWork_contact_Answer(data, marks) {
        //console.log(data,marks,'kunal sinha')
        let fscode = this.props.question[0]
            ? this.props.question[0]["fscode"]
            : "";
        let k = {};
        k = this.state.AnswerJson;
        k[data["c_name"] + data["QuestionCode"] + data["QuestionGroupCode"]] = {
            QuestionCode: data["QuestionCode"],
            QuestionGroupCode: data["QuestionGroupCode"],
            marks: marks,
            fscode: fscode
        };
        this.setState({ AnswerJson: k });
    }
    hide() {
        const dcrno = this.props.dcrno;
        const dcr = { dcrno: dcrno, doc: this.props.doc };
        const data = {
            Index: "Work_contact_save",
            Data: this.state.AnswerJson,
            Header: dcr
        };
        postToServer("DCRAPI", data).then(result => {
          //  console.log(result);
        });
        this.props.onHide();
    }

    render() {
        return (
            <div>
                <Modal centered className="dcr-success" show={this.props.show}>
                    <div className="feebback-close">
                        <img
                            src="../public/assets/images/close2.png"
                            alt="close-btn"
                            onClick={this.hide}
                        />
                    </div>
                    <Modal.Body className="text-center">
                        <div>
                            <img
                                src="../public/assets/images/1nIdFiqOCpQ.png"
                                className="feedbackImg"
                            />
                        </div>
                        <div className="greenColor">
                            Rate to{" "}
                            {this.props.question[0]
                                ? this.props.question[0]["fscode"]
                                : ""}{" "}
                            Based on Below Question
                        </div>

                        <div className="feebback-qn-sec cal-scrollbar">
                            {this.props.question.map(q => (
                                <div>
                                    <div className="FeedbackTxt">
                                        Rate for her/his {q["question"]}
                                    </div>
                                    <div className="startpad">
                                        <StarComp
                                            updatefun={
                                                this.funWork_contact_Answer
                                            }
                                            data={q}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* <div className="FeedbackTxt" >
                                How much star you will give for dressing sense?
                            </div>
                            <div className="startpad">
                                <StarComp color="red"/>
                                <StarComp color="red"/>
                                <StarComp color="red"/>
                                <StarComp color="red"/>
                                <StarComp color="red"/>
                            </div>
                            <div className="FeedbackTxt" >
                                Rate for Presentation Skills
                            </div>
                            <div className="startpad">
                                <StarComp color="orange"/>
                                <StarComp color="orange"/>
                                <StarComp color="orange"/>
                                <StarComp color="orange"/>
                                <StarComp color="orange"/>
                            </div> */}
                        <button
                            className="done-btn doneMargin"
                            onClick={this.hide}
                        >
                            Done
                        </button>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}
export default FeedbackComp;
