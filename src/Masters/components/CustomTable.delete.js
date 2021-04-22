import React from 'react'
import { Row, Col, Table, Dropdown, Collapse, Form } from 'react-bootstrap';
import Datatable from 'react-bs-datatable';
import { sortData, filterData, paginateData } from 'react-bs-datatable/lib/utils/ClassHelpers';
import Pagination from 'react-bs-datatable/lib/Pagination';
import PaginationOpts from 'react-bs-datatable/lib/PaginationOpts';
import TableHeader from 'react-bs-datatable/lib/TableHeader';
import TableBody from 'react-bs-datatable/lib/TableBody';
import Filter from 'react-bs-datatable/lib/Filter';
import ExportDropdown from './ExportDropdown'

class CustomTable extends Datatable {
    constructor(props) {
        super(props);
        this.state = {
            ...this.state,
            displayedColumns:[]
        }
    }

    changeDisplayedColumns(e) {
        const { name, checked } = e.target
        let { displayedColumns } = this.state
        if (checked)
            displayedColumns.push(name)
        else
            displayedColumns = displayedColumns.filter((n) => n !== name )
        this.setState({displayedColumns})
    }

    componentDidMount() {
        const { tableHeader } = this.props
        let displayedColumns = tableHeader.map(v => v.title)
        this.setState({displayedColumns})
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.urlid !== prevProps.urlid) {
            const { tableHeader } = this.props
            let displayedColumns = tableHeader.map(v => v.title)
            this.setState({displayedColumns})
        }
    }

    render() {
        const { sortedProp, filterText, rowsPerPage, currentPage, displayedColumns } = this.state;
        const { tableBody, keyName, labels, rowsPerPageOption, showHeader } = this.props;
        let { tableHeader } = this.props
         
        //use only the selected columns
        //starts with all columns displayed
        tableHeader = tableHeader.filter((v) => {
              return displayedColumns.find(n => n==v.title)
        })

        const filteredData = filterData(tableHeader, filterText, null,tableBody);
        const sortedData = sortData(sortedProp, null, filteredData);
        const paginatedData = paginateData(rowsPerPage, currentPage, sortedData);

        const checkBoxes = Object.keys(tableBody[0]).map((n) => {
            n = n.charAt(0).toUpperCase() + n.slice(1)
            let checked = displayedColumns.find(v => v == n)
            return(
                <Form.Check
                    key={ n }
                    name={ n }
                    type="checkbox"
                    label={ n }
                    checked = { !!checked }
                    className="column-label"
                    onChange={ this.changeDisplayedColumns.bind(this)  }
                />
            )
        })

        return (
            <div>
                { showHeader &&
                <Collapse in={true}>
                    <div className="dcr-table-options">
                        <div className="pagination-opts">
                            <PaginationOpts
                                labels={labels}
                                onRowsPerPageChange={this.onRowsPerPageChange}
                                rowsPerPage={rowsPerPage}
                                rowsPerPageOption={rowsPerPageOption}
                                keyName={keyName}
                            />
                        </div>
                        <div className="other-ops">
                            <Dropdown.Toggle  onClick={this.Downloadfile} className="dcr-options" id="dropdown-basic">
                                <img src="../public/assets/images/download.svg" alt="export_img" />
                                <span>Download Template</span>
                            </Dropdown.Toggle>
                            {/* <Dropdown.Toggle className="dcr-options" id="dropdown-basic">
                                <img src="../public/assets/images/import.svg" alt="export_img" />
                                <span>Import

                            

                                </span>
                            </Dropdown.Toggle> */}


                              <Form.Group
                                onChange={this.uploadfile } 
                              controlId="files">
                            <Col lg={12} md={12} xl={12} xs={12} className="buttonfile" >
                            <Form.Label className="labelbox">
                                <div className="buttonbox">
                                    <img src="../public/assets/images/attachment.svg">
                                    </img><Form.Label className="filelabel"> 
                                    Upload File</Form.Label>
                                </div>
                            </Form.Label>
                                <p className="filename">{this.state.fileName}</p>
                                <Form.Control 
                                    id="files" 
                                    type="file" 
                                   
                                    className="filehide" 
                                    accept="application/pdf,image/png, image/jpeg,.doc,.docx,application/msword" />
                            </Col>
                        </Form.Group>
                            <Dropdown>
                                <Dropdown.Toggle className="dcr-options" id="dropdown-basic">
                                    <img src="../public/assets/images/columns.svg" alt="export_img" />
                                    <span>Column option</span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="column-dropdown">
                                    <h5 className="drop-head">Columns to be shown</h5>
                                    <Form>
                                        { checkBoxes }
                                    </Form>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Dropdown>
                                <Dropdown.Toggle className="dcr-options" id="dropdown-basic">
                                    <img src="../public/assets/images/export.svg" alt="export_img" />
                                    <span>Export</span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="export-dropdown">
                                    <ExportDropdown  head={tableHeader}   data={ tableBody } />
                                </Dropdown.Menu>
                            </Dropdown>
                            {/* <Dropdown>
                                <Dropdown.Toggle className="dcr-options" id="dropdown-basic">
                                    <img src="../public/assets/images/filter.svg" alt="filter_img" />
                                    <span>Retrival Option</span>
                                </Dropdown.Toggle> 
                                <Dropdown.Menu className="others-dropdown">
                                    <RetrivalOption />
                                </Dropdown.Menu>
                            </Dropdown> */}
                            <Filter
                                tableHeader={tableHeader}
                                onChangeFilter={this.onChangeFilter}
                                filterText={filterText}
                                keyName={keyName}
                                placeholder={labels.filterPlaceholder}
                            />
                        </div>
                    </div>
                </Collapse>
                }
                <Row>
                    <Col xs={12} className="datatable">
                        <div className="table-responsive">
                            <Table
                                onDoubleClick={this.props.clickrow}
                            >
                                <TableHeader
                                    tableHeader={tableHeader}
                                    keyName={keyName}
                                    sortedProp={sortedProp}
                                    onSortChange={this.onSortChange}
                                />
                                <TableBody
                                  //onClick={this.clickrow}
                                tableHeader={tableHeader}
                                keyName={keyName}
                                labels={labels}
                                paginatedData={paginatedData}
                                />
                            </Table>
                        </div>
                    </Col>
                </Row>
                <div className="pagination-sec">
                    <div className="current-entries">
                        Showing {(currentPage - 1) * rowsPerPage + 1} to{" "} {(currentPage - 1) * rowsPerPage + paginatedData.length} of {filteredData.length} entries
                    </div>
                    <Pagination
                        
                        data={sortedData}
                        rowsPerPage={rowsPerPage}
                        keyName={keyName}
                        
                        currentPage={currentPage}
                        onPageNavigate={this.onPageNavigate}
                        labels={labels}
                    />
                </div>
            </div>
        );
    }
}

export default CustomTable;


export function getCommToken(daata) {
   

  //  alert('kunal')
   
}