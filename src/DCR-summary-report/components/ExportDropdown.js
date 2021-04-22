import React,{Component} from 'react'
import {Dropdown} from 'react-bootstrap'

class ExportDropdown extends Component{
    
    render(){
        return(
                <div>
                    <Dropdown className="exportBtn">
                        <Dropdown.Toggle id="dropdown-basic">
                            <img src="../public/assets/images/export_white.svg" alt="export_img" className="exportImgPad"/>
                            <span className="exportAllText">Export All</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="export-dropdown">
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
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                );
    }
}
export default ExportDropdown

