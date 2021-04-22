import React, {Component} from 'react';
import { Row, Col, Table, Dropdown, Collapse, Form } from 'react-bootstrap';
import ExportDropdown from './ExportDropdown'
import { getdownload } from '../../lib/comm-utils'

class FilterOptions extends Component{

    constructor(props) {
        super(props)
        this.state = {  

        }

         this.Downloadfile= this.Downloadfile.bind(this)
    }


    Downloadfile(){

      
        
        getdownload("FileDownload",this.props.urlid)
   }

    updateRowsPerPage(event) {
        const rows = event.target.value
        this.props.updateRowsPerPage(rows)
    }

    Downloadfile(){

        // alert(this.props.urlid)
        
         getdownload("FileDownload",this.props.urlid)
    }

    changeDisplayedColumns(e) {
        const { name, checked } = e.target
        let { displayedColumns } = this.props
        if (checked)
            displayedColumns.push(name)
        else
            displayedColumns = displayedColumns.filter((n) => n !== name)
        this.props.changeDisplayedColumns(displayedColumns)
    }

    render(){
        const { header, rowsPerPage, rowsPerPageOption, displayedColumns } = this.props
        let rowOptions = rowsPerPageOption.map((v, i) => {
            return <option value={v} key={i}>{v}</option>
        })

        const checkBoxes = header.map((n) => {
            let nCase = n.charAt(0).toUpperCase() + n.slice(1)
            let checked = displayedColumns.find(v => v == n)
            return(
                <Form.Check
                    custom
                    id={ "checkbox" + n }
                    key={ n }
                    id={ 'check'+ n }
                    name={ n }
                    type="checkbox"
                    label={ nCase }
                    checked = { !!checked }
                    className="column-label"
                    onChange={ this.changeDisplayedColumns.bind(this)  }
                />
            )
        })

        return(
            <div>
                <div className="dcr-table-options">
                    <div className="pagination-opts">
                        <div className="show-items">
                            <div>Show</div>
                            <Form.Group className="mb-0">
                                <Form.Control
                                    as="select"
                                    onChange={this.updateRowsPerPage.bind(this)}
                                    value={rowsPerPage}
                                >
                                    {rowOptions}
                                </Form.Control>
                            </Form.Group> 
                            <div>items/page</div>
                        </div>
                    </div>
                    <div className="other-ops">
                        <Dropdown.Toggle   onClick={this.Downloadfile} className="dcr-options" id="dropdown-basic">
                            <img src="../public/assets/images/download.svg" alt="export_img" />
                            <span>Download Template </span>
                        </Dropdown.Toggle>
                        {/* <Dropdown.Toggle className="dcr-options" id="dropdown-basic">
                            <img src="../public/assets/images/import.svg" alt="export_img" />
                            <span>Import</span>
                        </Dropdown.Toggle> */}
                        <Dropdown>
                            <Dropdown.Toggle className="dcr-options" id="dropdown-basic">
                                <img src="../public/assets/images/columns.svg" alt="export_img" />
                                <span>Column option</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="column-dropdown">
                                <div className=" topPad topPad">
                                    <h5 className="drop-head">Columns to be shown</h5>
                                    <Form className="pad10 repoCol">
                                        {checkBoxes}
                                    </Form>
                                </div>
                            </Dropdown.Menu>
                            
                        </Dropdown>
                        <Dropdown>
                            <Dropdown.Toggle className="dcr-options" id="dropdown-basic">
                                <img src="../public/assets/images/export.svg" alt="export_img" />
                                <span>Export</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="export-dropdown">
                                <ExportDropdown   data={ this.props.data} />
                            </Dropdown.Menu>
                        </Dropdown>
                        <div>
                            <Form onSubmit={this.props.onSearch}>
                                <Form.Group>
                                    <Form.Control
                                        onChange={this.props.setSearchString}
                                        value={this.props.searchString}
                                        type="text"
                                        placeholder="search"
                                        className="filter"
                                    />
                                </Form.Group>
                            </Form>
                        </div>
                        {/* <Dropdown>
                            <Dropdown.Toggle className="dcr-options" id="dropdown-basic">
                                <img src="../public/assets/images/filter.svg" alt="filter_img" />
                                <span>Retrival Option</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="others-dropdown">
                                <RetrivalOption />
                            </Dropdown.Menu>
                        </Dropdown> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default FilterOptions;