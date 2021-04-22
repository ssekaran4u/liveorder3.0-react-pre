import React, { Component } from "react";
// import DropdownMultiSelection from "./dropdownMS";
import ExpenseDropdown from "./dropdown";
import InputField from "./inputField";
import TextArea from "./textArea";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

class ExpenseDetailsTableBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.handleChange = this.handleChange.bind(this)
    }

    //on change method for editable fields in expense details
    handleChange(value, category, id) {
        this.props.onHandleChange(value, category, id)
    }

    render() {
        const details = this.props.expenseDetails;
        let constHeader = this.props.constHeader;
        let alterHeader = this.props.alterHeader;
        let entryType = this.props.entryType;
        let mainFlag = this.props.mainFlag;
        let detailedFlag = this.props.detailedFlag;
        return (
            <React.Fragment>
                {details.map(result =>
                    <React.Fragment key={result.dtt}>
                        <tr className={result.Sunday != "" ? "sunday-row" : result.Leave != "" ? "leave-row" : result.Holiday != "" ? "holiday-row" : ""}>
                            {constHeader.some(res => res.headerName == "dtt") == true ?
                                <td className="extra-padding">
                                    <div
                                        className={result.Sunday != ""
                                            ? "sunday-date body-content"
                                            : result.Leave != ""
                                                ? "leave-date body-content"
                                                : result.Holiday != ""
                                                    ? "holiday-date body-content"
                                                    : "body-content"}
                                    >
                                        <div>{result.dtt}</div>
                                    </div>
                                </td>
                                : null}
                            {constHeader.some(res => res.headerName == "doccnt") == true ?
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={
                                        <div className="expense-tooltip">
                                            {result.dtt}
                                        </div>
                                    }
                                >
                                    <td>
                                        {entryType.length && mainFlag.length ? entryType[0].approved == "approved" || mainFlag[0]["DrCount"] == 1 ?
                                            <div className="body-content">
                                                <div>{result.doccnt == "" ? "--" : result.doccnt}</div>
                                            </div>
                                            :
                                            <div className="body-content">
                                                <InputField
                                                    value={result.doccnt}
                                                    inputType="number"
                                                    onChange={this.handleChange}
                                                    id={result.dtt}
                                                    category="doccnt"
                                                    textLength="4"
                                                />
                                            </div>
                                            : null}
                                    </td>
                                </OverlayTrigger>
                                : null}
                            {constHeader.some(res => res.headerName == "stkcnt") == true ?
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={
                                        <div className="expense-tooltip">
                                            {result.dtt}
                                        </div>
                                    }
                                >
                                    <td>
                                        {entryType.length && mainFlag.length ? entryType[0].approved == "approved" || mainFlag[0]["StkCount"] == 1 ?
                                            <div className="body-content">
                                                <div>{result.stkcnt == "" ? "--" : result.stkcnt}</div>
                                            </div>
                                            :
                                            <div className="body-content">
                                                <InputField
                                                    value={result.stkcnt}
                                                    inputType="number"
                                                    onChange={this.handleChange}
                                                    id={result.dtt}
                                                    category="stkcnt"
                                                    textLength="4"
                                                />
                                            </div>
                                            : null}
                                    </td>
                                </OverlayTrigger>
                                : null}
                            {constHeader.some(res => res.headerName == "chemcnt") == true ?
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={
                                        <div className="expense-tooltip">
                                            {result.dtt}
                                        </div>
                                    }
                                >
                                    <td>
                                        {entryType.length && mainFlag.length ? entryType[0].approved == "approved" || mainFlag[0]["ChemCount"] == 1 ?
                                            <div className="body-content">
                                                <div>{result.chemcnt == "" ? "--" : result.chemcnt}</div>
                                            </div>
                                            :
                                            <div className="body-content">
                                                <InputField
                                                    value={result.chemcnt}
                                                    inputType="number"
                                                    onChange={this.handleChange}
                                                    id={result.dtt}
                                                    category="chemcnt"
                                                    textLength="4"
                                                />
                                            </div>
                                            : null}
                                    </td>
                                </OverlayTrigger>
                                : null}
                            {constHeader.some(res => res.headerName == "AreaVisited") == true ?
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={
                                        <div className="expense-tooltip">
                                            {result.dtt}
                                        </div>
                                    }
                                >
                                    <td>
                                        {entryType.length && mainFlag.length ? entryType[0].approved == "approved" || mainFlag[0]["AreaVisited"] == 1 ?
                                            <div className="body-content">
                                                {result.AreaVisited == "" ? "--" : result.AreaVisited}
                                            </div>
                                            :
                                            <div className="body-content">
                                                <InputField
                                                    value={result.AreaVisited}
                                                    inputType="text"
                                                    onChange={this.handleChange}
                                                    id={result.dtt}
                                                    category="AreaVisited"
                                                    textLength="201"
                                                />
                                            </div>
                                            : null}
                                    </td>
                                </OverlayTrigger>
                                : null}
                            {constHeader.some(res => res.headerName == "stayedat") == true ?
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={
                                        <div className="expense-tooltip">
                                            {result.dtt}
                                        </div>
                                    }
                                >
                                    <td>
                                        {entryType.length && mainFlag.length ? entryType[0].approved == "approved" || mainFlag[0]["StayedAt"] == 1 ?
                                            <div className="body-content">
                                                {result.stayedat == "" ? "--" : result.stayedat}
                                            </div>
                                            :
                                            <div className="body-content">
                                                <InputField
                                                    value={result.stayedat}
                                                    inputType="text"
                                                    onChange={this.handleChange}
                                                    id={result.dtt}
                                                    category="stayedat"
                                                    textLength="201"
                                                />
                                            </div>
                                            : null}
                                    </td>
                                </OverlayTrigger>
                                : null}
                            {constHeader.some(res => res.headerName == "VisitType") == true ?
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={
                                        <div className="expense-tooltip">
                                            {result.dtt}
                                        </div>
                                    }
                                >
                                    <td>
                                        {entryType.length && mainFlag.length ? entryType[0].approved == "approved" || mainFlag[0]["VisitType"] == 1 ?
                                            <div className="body-content">
                                                {result.VisitType == "" ? "--" : result.VisitType}
                                            </div>
                                            :
                                            <div className="body-content">
                                                <ExpenseDropdown
                                                    options={this.props.visitTypes}
                                                    selected={result.VisitType}
                                                    id={result.dtt}
                                                    category="VisitType"
                                                    onChange={this.handleChange}
                                                />
                                            </div>
                                            : null}
                                    </td>
                                </OverlayTrigger>
                                : null}
                            {constHeader.some(res => res.headerName == "STP KM") == true ?
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={
                                        <div className="expense-tooltip">
                                            {result.dtt}
                                        </div>
                                    }
                                >
                                    <td>
                                        {entryType.length && mainFlag.length ? entryType[0].approved == "approved" || mainFlag[0]["STPDistance"] == 1 ?
                                            <div className="body-content">
                                                {result["STP KM"] == "" ? "--" : result["STP KM"]}
                                            </div>
                                            :
                                            <div className="body-content">
                                                <InputField
                                                    value={result["STP KM"]}
                                                    inputType="number"
                                                    onChange={this.handleChange}
                                                    id={result.dtt}
                                                    category="STP KM"
                                                    step="0.01"
                                                    textLength="11"
                                                />
                                            </div>
                                            : null}
                                    </td>
                                </OverlayTrigger>
                                : null}
                            {constHeader.some(res => res.headerName == "distance") == true ?
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={
                                        <div className="expense-tooltip">
                                            {result.dtt}
                                        </div>
                                    }
                                >
                                    <td>
                                        {entryType.length && mainFlag.length ? entryType[0].approved == "approved" || mainFlag[0]["Distance"] == 1 ?
                                            <div className="body-content">
                                                {result.distance == "" ? "--" : result.distance}
                                            </div>
                                            :
                                            <div className="body-content">
                                                <InputField
                                                    value={result.distance}
                                                    inputType="number"
                                                    onChange={this.handleChange}
                                                    id={result.dtt}
                                                    category="distance"
                                                    step="0.01"
                                                    textLength="11"
                                                />
                                            </div>
                                            : null}
                                    </td>
                                </OverlayTrigger>
                                : null}
                            {constHeader.some(res => res.headerName == "ModeOfTravel") == true ?
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={
                                        <div className="expense-tooltip">
                                            {result.dtt}
                                        </div>
                                    }
                                >
                                    <td>
                                        {entryType.length ? entryType[0].approved == "approved" ?
                                            <div className="body-content">
                                                {result.ModeOfTravel == "" ? "--" : result.ModeOfTravel}
                                            </div>
                                            :
                                            <div className="body-content">
                                                <InputField
                                                    value={result.ModeOfTravel}
                                                    inputType="text"
                                                    onChange={this.handleChange}
                                                    id={result.dtt}
                                                    category="ModeOfTravel"
                                                    textLength="11"
                                                />
                                            </div>
                                            : null}
                                    </td>
                                </OverlayTrigger>
                                : null}
                            {constHeader.some(res => res.headerName == "workedWith") == true ?
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={
                                        <div className="expense-tooltip">
                                            {result.dtt}
                                        </div>
                                    }
                                >
                                    <td className="center-aligned">
                                        {entryType.length && mainFlag.length ? entryType[0].approved == "approved" || mainFlag[0]["WorkedWith"] == 1 ?
                                            <div className="body-content">
                                                {result.workedWith == "" ? "--" : result.workedWith}
                                            </div>
                                            :
                                            <div className="body-content">
                                                <InputField
                                                    value={result.workedWith}
                                                    inputType="text"
                                                    onChange={this.handleChange}
                                                    id={result.dtt}
                                                    category="workedWith"
                                                    textLength="201"
                                                />
                                            </div>
                                            : null}
                                    </td>
                                </OverlayTrigger>
                                : null}
                            {alterHeader.map(res =>
                                (res.headerName.includes("Remark") || res.headerName.includes("Note")) ?
                                    <OverlayTrigger
                                        placement="bottom"
                                        overlay={
                                            <div className="expense-tooltip">
                                                {result.dtt}
                                            </div>
                                        }
                                    >
                                        <td>
                                            {entryType.length ? entryType[0].approved == "approved" ?
                                                <div className="body-content">
                                                    <div>{result[res.headerName] == "" ? "--" : result[res.headerName]}</div>
                                                </div>
                                                :
                                                <div className="body-content">
                                                    <TextArea
                                                        value={result[res.headerName]}
                                                        onChange={this.handleChange}
                                                        id={result.dtt}
                                                        category={res.headerName}
                                                        textLength="201"
                                                    />
                                                </div>
                                                : null}
                                        </td>
                                    </OverlayTrigger>
                                    :
                                    <OverlayTrigger
                                        placement="bottom"
                                        overlay={
                                            <div className="expense-tooltip">
                                                {result.dtt}
                                            </div>
                                        }
                                    >
                                        <td>
                                            {entryType.length && detailedFlag.length ? entryType[0].approved == "approved" ?
                                                <div className="body-content">
                                                    <div>{result[res.headerName] == "" ? "--" : result[res.headerName]}</div>
                                                </div>
                                                :
                                                detailedFlag.map((list) =>
                                                    list.name.toLowerCase() == res.headerName.toLowerCase() ?
                                                        list.editable == "2" ?
                                                            <div className="body-content">
                                                                <InputField
                                                                    value={result[res.headerName]}
                                                                    inputType="number"
                                                                    onChange={this.handleChange}
                                                                    id={result.dtt}
                                                                    category={res.headerName}
                                                                    step="0.01"
                                                                    textLength="11"
                                                                />
                                                            </div> :
                                                            <div className="body-content">
                                                                <div>{result[res.headerName] == "" ? "--" : result[res.headerName]}</div>
                                                            </div>
                                                        : null)
                                                : null}
                                        </td>
                                    </OverlayTrigger>)}
                        </tr>
                    </React.Fragment>)}
            </React.Fragment>
        )
    }
}

export default ExpenseDetailsTableBody;