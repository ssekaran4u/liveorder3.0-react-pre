import React, { Component } from 'react';
import SfaDatatable from '../../BasicComponet/dataTable';

class UserHeirarchyDatatable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // userHeirarchyList: [],
        }
    }

    render() {
        const header = [
            { prop: 'userCode', title: 'User Code', filterable: true },
            { prop: 'userName', title: 'User Name', filterable: true },
            { prop: 'designation', title: 'Designation', filterable: true },
            { prop: 'area', title: 'Area', filterable: true },
            { prop: 'subArea', title: 'Sub Area', filterable: true },
            { prop: 'reporting', title: 'Reporting To', filterable: true }
        ];
        var body = []
        this.props.userHeirarchyList.map((list)=>{
            body.push({
                userCode: list["UserCode"],
                userName: list["UserName"].toLowerCase(),
                designation: list["Designation"],
                area: list["Area"]=="" ? "--" : list["Area"].toLowerCase(),
                subArea: list["SubArea"]=="" ? "--" : list["SubArea"].toLowerCase(),
                reporting: list["ReportingTo"].toLowerCase()
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

        return (
            <React.Fragment>
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
                />
            </React.Fragment>
        )
    }
}

export default UserHeirarchyDatatable;