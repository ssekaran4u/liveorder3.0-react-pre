import React, { Component } from 'react';
import TpdActionTable from './TpdActionTable';
import { Breadcrumb,Button,Row,Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class TpdActionList extends Component {
    render() {
        const header = [
            { prop: 'slno', title: 'Sl. No.',filterable: true,sortable:true },
            { prop: 'date', title: 'Date',filterable: true, sortable:true },
            { prop: 'dayweek', title: 'Day/Week',filterable: true, sortable:true },
            { prop: 'subarea', title: 'Sub Area',filterable: true },
            { prop: 'appointment', title: 'Appointments',filterable: true },
            { prop: 'worktype', title: 'Work Type',filterable: true },
            { prop: 'workingwith', title: 'Working With',filterable: true },
            { prop: 'action', title: 'Action'}
              
        ];

        var actionButtons = <div><img src="../public/assets/images/deletetpd.svg" /><img src="../public/assets/images/editRow.svg"  style={{ paddingLeft : "25px"}} /></div>
        
        const body = [
            { slno : 1, date : '12-03-2020', dayweek : 'Monday-Week 1', subarea : 'Airoli (HQ)', appointment : 5, worktype : 'Field Work', workingwith : 'MR1', action : 'action' },
            { slno : 2, date : '12-03-2020', dayweek : 'Monday-Week 1', subarea : 'Airoli (HQ)', appointment : 3, worktype : 'Field Work', workingwith : 'MR1', action : 'action' },
            { slno : 3, date : '12-03-2020', dayweek : 'Monday-Week 1', subarea : 'Airoli (HQ)', appointment : 2, worktype : 'Field Work', workingwith : 'MR1', action : 'action' },
            { slno : 4, date : '12-03-2020', dayweek : 'Monday-Week 1', subarea : 'Airoli (HQ)', appointment : 3, worktype : 'Field Work', workingwith : 'MR1', action : 'action' },
            { slno : 5, date : '12-03-2020', dayweek : 'Monday-Week 1', subarea : 'Airoli (HQ)', appointment : 3, worktype : 'Field Work', workingwith : 'MR1', action : 'action' },
            { slno : 6, date : '12-03-2020', dayweek : 'Monday-Week 1', subarea : 'Airoli (HQ)', appointment : 5, worktype : 'Meeting', workingwith : 'MR1', action : 'action' },
            { slno : 7, date : '12-03-2020', dayweek : 'Monday-Week 1', subarea : 'Airoli (HQ)', appointment : 5, worktype : 'Meeting', workingwith : 'MR1', action : 'action' },
            { slno : 8, date : '12-03-2020', dayweek : 'Monday-Week 1', subarea : 'Airoli (HQ)', appointment : 3, worktype : 'Meeting', workingwith : 'MR1', action : 'action' },
            { slno : 9, date : '12-03-2020', dayweek : 'Monday-Week 1', subarea : 'Airoli (HQ)', appointment : 1, worktype : 'Meeting', workingwith : 'MR1', action : 'action' },
            { slno : 10, date : '12-03-2020', dayweek : 'Monday-Week 1', subarea : 'Airoli (HQ)', appointment : 3, worktype : 'Meeting', workingwith : 'MR1', action : 'action' },
            { slno : 11, date : '12-03-2020', dayweek : 'Monday-Week 1', subarea : 'Airoli (HQ)', appointment : 1, worktype : 'Meeting', workingwith : 'MR1', action : 'action' },
            { slno : 12, date : '12-03-2020', dayweek : 'Monday-Week 1', subarea : 'Airoli (HQ)', appointment : 5, worktype : 'Meeting', workingwith : 'MR1', action : 'action' },
            { slno : 13, date : '12-03-2020', dayweek : 'Monday-Week 1', subarea : 'Airoli (HQ)', appointment : 5, worktype : 'Meeting', workingwith : 'MR1', action : 'action' },
            { slno : 14, date : '12-03-2020', dayweek : 'Monday-Week 1', subarea : 'Airoli (HQ)', appointment : 5, worktype : 'Meeting', workingwith : 'MR1', action : 'action' },
            { slno : 15, date : '12-03-2020', dayweek : 'Monday-Week 1', subarea : 'Airoli (HQ)', appointment : 3, worktype : 'Meeting', workingwith : 'MR1', action : 'action' },
            { slno : 16, date : '12-03-2020', dayweek : 'Monday-Week 1', subarea : 'Airoli (HQ)', appointment : 1, worktype : 'Meeting', workingwith : 'MR1', action : 'action' },
            { slno : 17, date : '12-03-2020', dayweek : 'Monday-Week 1', subarea : 'Airoli (HQ)', appointment : 1, worktype : 'Meeting', workingwith : 'MR1', action : 'action' }
        ];

        body.map((item) => {
            if(item.action == "action"){
                item.action = actionButtons
            }
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
                <div className="content-spacing body-scroll">
                    <div className="min-height-100">
                        <div className="dcr-head">
                            <div>
                                <h4 className="daily-call-report">Tour Plan Details</h4>
                            </div>
                            <div>
                                <Breadcrumb className="dcr-breadcrumb">
                                    <Breadcrumb.Item href="#">
                                        <Link to='#'>Dashboard</Link>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item>
                                    <Link to='/manager-mtp'>TP Submission List</Link>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item active>
                                        Tour Plan Details
                                    </Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                        </div>
                        <div className="mtpList">
                            <TpdActionTable
                                tableHeader={header}
                                tableBody={body}
                                keyName="userTable"
                                tableClass="striped hover table-responsive"
                                rowsPerPage={10}
                                rowsPerPageOption={[5,10, 20, 50, 100, 200]}
                                initialSort={{ prop: "username", isAscending: true }}
                                labels={customLabels}
                            />
                        </div>
                        <div className="actionButtons">
                            <Button
                                variant="secondary"
                                onClick={this.closeModal}
                                className="cancelBtn"
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="primary"
                                className="planBtn"
                                id="saveBtn"
                                onClick={this.handleSubmit}
                            >
                                Save
                            </Button>         
                        </div>
                    </div>
                </div>
                

            
        );
    }
}

export default TpdActionList;