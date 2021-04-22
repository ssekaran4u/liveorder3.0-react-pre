import React, { Component } from 'react';
import SfaDatatable from '../../BasicComponet/dataTable';
import RetrievalOption from './retrievalOption';
import Button from 'react-bootstrap/Button';

class DistributorMappingDatatable extends Component {
    // constructor(props){
    //     super(props)
    //     this.state = {
    //         checkedAll: false,
    //         checked: false
    //     }
    //     this.onCheckAll = this.onCheckAll.bind(this)
    //     this.onCheck = this.onCheck.bind(this)
    // }

    // onCheckAll(){
    //     if(this.state.checkedAll==true){
    //         this.setState({checkedAll: false, checked: false})
    //     }
    //     else{
    //         this.setState({checkedAll: true, checked: true})
    //     }
    // }
    // onCheck(event) {
    //     if(this.state.checked==true){
    //         this.setState({checkedAll: false, checked: false})
    //     }
    //     else{
    //         this.setState({checked: true})
    //     }
    // }
    render() {
        const header = [
            {
                prop: 'checkbox',
                title: <label className="header-checkbox-label">
                    <input
                        readOnly
                        type="checkbox"
                        className="header-customized-checkbox"
                        value="checkedAll"
                        onClick={this.props.onCheckAll}
                    // checked={this.state.checkedAll}
                    />
                    <span className="header-checkbox-custom"></span>
                </label>,
                filterable: true
            },
            { prop: 'distributorName', title: 'Distributor Name', filterable: true },
            { prop: 'area', title: 'Area', filterable: true },
            { prop: 'subArea', title: 'Sub Area', filterable: true },
            { prop: 'pincode', title: 'Pin Code', filterable: true }
        ];
        var body = []
        this.props.distributorList.map((list) => {
            body.push({
                checkbox: <label className="table-checkbox-label">
                    <input
                        readOnly
                        type="checkbox"
                        className="table-customized-checkbox"
                        // onChange={this.onShowUncheckAlert}
                        onClick={this.props.onCheck}
                        checked={list["isChecked"]}
                        value={list["value"]}
                    />
                    <span className="table-checkbox-custom"></span>
                </label>,
                distributorName: list["Distributor"].toLowerCase(),
                area: list["Area"] == "" ? "--" : list["Area"].toLowerCase(),
                subArea: list["Subarea"] == "" ? "--" : list["Subarea"].toLowerCase(),
                pincode: list["Pincode"] == "" ? "--" : list["Pincode"]
            })
        })
        const customLabels = {
            first: "<<",
            last: ">>",
            prev: "< Prev",
            next: "Next >",
            show: "Show",
            entries: "items/page",
            filterPlaceholder: "Search",
            noResults: "There is no data to be displayed"
        };

        var options = <div className="filter-options">
            <div className="distributor-mapping-button">
                <Button className="map-button" onClick={this.props.onDistributorMap}>
                    <div className="map-button-text">Map</div>
                </Button>
            </div>
            <RetrievalOption />
        </div>

        return (
            <div>
                <SfaDatatable
                    tableHeader={header}
                    tableBody={body}
                    keyName="userTable"
                    tableClass="striped hover table-responsive"
                    rowsPerPage={10}
                    rowsPerPageOption={[5, 10, 20, 50, 100, 200]}
                    initialSort={{ prop: "username", isAscending: true, }}
                    labels={customLabels}
                    pagination={true}
                    searchlist={true}
                    filterOptions={options}
                />
            </div>
        )
    }
}

export default DistributorMappingDatatable;