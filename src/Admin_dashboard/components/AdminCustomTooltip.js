import React, { Component } from 'react'

class AdminCustomTooltip extends Component {
    render() {
      const { active } = this.props;
      if (active) {
        const { payload, label } = this.props;
         
          return (
            <div className="mr_tootltip">
                <p className="satYellow">{payload[0].payload.dayname}</p>
                <p className="totaldwrtext">Total DWR Submitted</p>
                <p className="tooltipNum">{payload[0].payload.uv}</p>
            </div>
          );
        }
        return null;
    }
}

export default AdminCustomTooltip