import React, { Component } from 'react';
import './LetsStartSection.css'

class LetsStartSection extends Component {
  render() {
    return (
      <div className="LetsStartSection">
        <div className="LetsStartSectionCard position-relative text-center">
          <h3 className="h3 text-white mb-4">Let’s Start Live Order</h3>
          <p className="body-copy mb-5 text-white">Live Order & you, the dynamic duo.</p>
          <button type="submit" className="btn demo-card-btn">Schedule A Demo</button>
          <div className="purple-blob2"></div>
          <div className="green-circle"></div>
          <div className="orange-circle"></div>
        </div>
      </div>
    );
  }
}

export default LetsStartSection;