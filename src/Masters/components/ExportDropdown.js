import React, { Component } from 'react'

import CsvDownload   from  'react-json-to-csv'


class ExportDropdown extends Component{

    constructor(props) {
        super(props)
        this.state = {}
     
    }

   

    

    render(){
        return(
            <div className="export-ops">
                <div   className="text-center">
                    <img src="../public/assets/images/excel.svg" alt="excel"/>
                    <p><CsvDownload  data={  this.props.data } /></p>
                </div>
                {/* <div className="line"></div>
                <div  className="text-center">
                    <img src="../public/assets/images/pdf.svg" className="pdf" alt="excel"/>
                    <p>PDF</p>
                </div>
                <div className="line"></div>
                <div className="text-center">
                    <img src="../public/assets/images/print.svg" alt="excel"/>
                    <p>Print</p>
                </div> */}
            </div>
        )
    }
}

export default ExportDropdown
