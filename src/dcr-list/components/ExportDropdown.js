import React, { Component } from 'react'

class ExportDropdown extends Component{
    render(){
        return(
            <div className="export-ops">
                <div className="text-center">
                    <img src="../public/assets/images/excel.svg" alt="excel"/>
                    <p>Excel</p>
                </div>
                <div className="line"></div>
                <div className="text-center">
                    <img src="../public/assets/images/pdf.svg" className="pdf" alt="excel"/>
                    <p>PDF</p>
                </div>
                <div className="line"></div>
                <div className="text-center">
                    <img src="../public/assets/images/print.svg" alt="excel"/>
                    <p>Print</p>
                </div>
            </div>
        )
    }
}

export default ExportDropdown
