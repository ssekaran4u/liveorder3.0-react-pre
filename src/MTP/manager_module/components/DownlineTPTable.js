import React, { Component } from "react";

class DownlineTPTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="calender-container">
                <table cellSpacing="0" cellPadding="0">
                <thead className="desktopView">
                        <tr>
                            {this.props.weekdays}
                        </tr>
                    </thead>
                    <thead className="showShortName">
                        <tr>
                            {this.props.short_weekdays}
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.dateElements}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default DownlineTPTable;