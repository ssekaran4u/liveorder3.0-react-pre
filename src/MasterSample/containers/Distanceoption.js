import React, { Component } from "react";
import { Tabs, Tab, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import AddNewChemist from "../components/AddCalloption";
import ChemistMasterTable from "../components/DCRoptionTable";
import Footer from "../../landing-page/components/Footer";
import { postToServer } from '../../lib/comm-utils'
import DeletePopup from '../../campaign_request/popup/DeletePopup'
import StatusPopup from '../../lib/StatusPopup'
import { connect } from "react-redux";
import { toggleDcrHeader, goFullView } from "../../actions/DCRList";



class Distanceoptionjs extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            toggleHeader: "",
            isFull: "",
            deletePopup: false,
            nSrNo: '',
            showLoad:false,
            key: "ChemistList",
            header: [{ title: 'Action', prop: 'Action', filterable: true },
            //  { title: 'SL NO', prop: 'index' },
            { title: 'Code', prop: 'n_srno', filterable: true },
            { title: 'Name', prop: 'c_name', filterable: true },
            { title: 'Short Name', prop: 'c_sort_name', filterable: true },
            { title: 'Creation Date', prop: 'd_date', filterable: true },

            { title: 'Digital Type', prop: 'distance_type', filterable: true },

            { title: 'Status', prop: 'n_active', filterable: true }],
            body: [],
            maxcode: '0',
            editdata: {}

        };

        this.loadfun = this.loadfun.bind(this)
        this.Editload = this.Editload.bind(this)
        this.delete = this.delete.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.hide = this.hide.bind(this)
        this.handleChange = this.handleChange.bind(this);
        this.handleViewChange = this.handleViewChange.bind(this);
    }
    //dcr_delete_distance_calloption
    handleChange() {
        this.props.toggleDcrHeader();
    }

    handleViewChange() {
        this.props.goFullView();
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.toggleHeader !== nextProps.toggleHeader)
            return { toggleHeader: nextProps.toggleHeader };
        if (prevState.isFull !== nextProps.isFull)
            return { isFull: nextProps.isFull };
        return null;
    }
    hide() {
        this.setState({
            show: false
        })
    }
    closeModal() {

        this.setState({
            deletePopup: false,
        })
    }
    handleDelete() {
        this.setState({ showLoad: true,deletePopup:false })

        var data = {
            "index": "dcr_delete_option", "Data": {
                "n_srno": this.state.nSrNo,
            }
        }



        postToServer("DCRAPI", data).then((Result) => {
            this.setState({
                msg: 'Deleted Successfully',
                show: true,
                showLoad: false,
                success: true

            })
            this.loadfun();
        })
    }
    delete(id) {
        this.setState({
            deletePopup: true,
            nSrNo: id
        })

    }


    Editload(data) {
        this.setState({ editdata: data })
    }

    loadfun() {
        var data = { "index": "Distnaceoptionview", "Data": { "doc": "" } }
        postToServer("DCRAPI", data).then((Result) => {
            let body = []
            let maxcode = '0'


            if (Result.data["max"]) {

                if (Result.data["max"][0]) {
                    if (Result.data["max"][0]["max"]) {

                        if (Result.data["max"][0]["max"] == '') {
                            maxcode = '0'
                            this.setState({ maxcode: maxcode })
                        } else {
                            maxcode = Result.data["max"][0]["max"]
                            this.setState({ maxcode: maxcode })

                        }
                    }

                }

            }


            Result.data["Data"].map((a, index) => {





                let month1 = new Date(a.d_date).getMonth() + 1
                let date1 = new Date(a.d_date).getDate() + "/" + month1 + "/" + new Date(a.d_date).getFullYear()

                var actionButtons = <div><img onClick={() => { this.Editload(a) }} src="../public/assets/images/editRow.svg" /><img onClick={() => { this.delete(a.n_srno) }} src="../public/assets/images/deletetpd.svg" style={{ paddingLeft: "25px" }} /></div>
                body.push({ distance_type: a.distance_type, n_active: a.n_active == '' || a.n_active == '0' ? 'Active' : 'InActive', d_date: date1, Action: actionButtons, c_sort_name: a.c_sort_name, c_name: a.c_name, n_srno: a.n_srno })

                // if (maxcode < a.n_srno) {


                //     maxcode = a.n_srno
                //     this.setState({ maxcode: maxcode })
                // }
            })
            this.setState({ body: body })

        }).catch((Error) => {
        })

    }

    componentDidMount() {

        var data = { "index": "Distnaceoptionview", "Data": { "doc": "" } }
        postToServer("DCRAPI", data).then((Result) => {
            let body = []
            let maxcode = '0'



            if (Result.data["max"]) {

                if (Result.data["max"][0]) {
                    if (Result.data["max"][0]["max"]) {

                        if (Result.data["max"][0]["max"] == '') {
                            maxcode = '0'
                            this.setState({ maxcode: maxcode })
                        } else {
                            maxcode = Result.data["max"][0]["max"]
                            this.setState({ maxcode: maxcode })

                        }
                    }

                }

            }
            Result.data["Data"].map((a, index) => {
                let month1 = new Date(a.d_date).getMonth() + 1
                let date1 = new Date(a.d_date).getDate() + "/" + month1 + "/" + new Date(a.d_date).getFullYear()

                var actionButtons = <div><img onClick={() => { this.Editload(a) }} src="../public/assets/images/editRow.svg" /><img onClick={() => { this.delete(a.n_srno) }} src="../public/assets/images/deletetpd.svg" style={{ paddingLeft: "25px" }} /></div>
                body.push({ distance_type: a.distance_type, n_active: a.n_active == '' || a.n_active == '0' ? 'Active' : 'InActive', d_date: date1, Action: actionButtons, c_sort_name: a.c_sort_name, index: index + 1, c_name: a.c_name, n_srno: a.n_srno })

                // if (maxcode < a.n_srno) {


                //     maxcode = a.n_srno
                //     this.setState({ maxcode: maxcode })
                // }
            })
            this.setState({ body: body })

        }).catch((Error) => {
        })

    }
    render() {
        const customLabels = {
            first: "<<",
            last: ">>",
            prev: "< Prev",
            next: "Next >",
            show: "Show",
            entries: "entries",
            filterPlaceholder: "Search",
            noResults: "There is no data to be displayed"
        };
        return (
            <div className="content-spacing body-scroll">
                <div className="min-height-100">

                    <div className="dcr-head">
                        <div>
                            <h4 className="daily-call-report">
                            Digital Type Details Master
                    </h4>
                        </div>
                        <div>
                            <Breadcrumb className="dcr-breadcrumb">
                                <Breadcrumb.Item>
                                    <Link to="/dashboard">Dashboard </Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>
                                Master
                        </Breadcrumb.Item>
                                <Breadcrumb.Item active>
                                Digital Type Details Master
                        </Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>

                    <div className="dcr-list-sec">
                        <div className={this.state.isFull ? "fullscreenView" : ""}>
                            <div className="dcr-head">
                                <div>
                                    <h5 className="dcr-list-sec-head">
                                    {/* Digital Type Details Master */}
                                    </h5>
                                </div>
                                <div className="dcr-head-options">
                                    {this.state.isFull ? (
                                        <img
                                            src="../public/assets/images/collapse-grey.svg"
                                            className="fullscreen_img"
                                            alt="fullscreen_img"
                                            onClick={this.handleViewChange}
                                        />
                                    ) : (
                                            <img
                                                src="../public/assets/images/fullscreen.svg"
                                                className="fullscreen_img"
                                                alt="fullscreen_img"
                                                onClick={this.handleViewChange}
                                            />
                                        )}

                                </div>
                            </div>
                            <ChemistMasterTable
                                editdata={this.state.editdata}
                                loadfun={this.loadfun}
                                maxcode={this.state.maxcode}
                                tableHeader={this.state.header}
                                tableBody={this.state.body}
                                keyName="userTable"
                                tableClass="striped hover table-responsive"
                                rowsPerPage={10}
                                rowsPerPageOption={[10, 15, 20]}
                                initialSort={{
                                    prop: "username",
                                    isAscending: true
                                }}
                                labels={customLabels}
                                showLoad ={this.state.showLoad}

                            />

                        </div>
                    </div>
                    <Footer />
                </div>


                {this.state.deletePopup ? <DeletePopup show={this.state.deletePopup} onHide={this.closeModal} handleSubmit={this.handleDelete} /> : ""}

                <StatusPopup
                    message={this.state.msg}
                    show={this.state.show}
                    onClose={this.hide}
                    success={this.state.success}
                />
            </div>
        );
    }
}
const mapStateToProps = state => ({
    toggleHeader: state.DCRList.toggleHeader,
    isFull: state.DCRList.isFull
});

const mapDispatchToProps = dispatch => ({
    toggleDcrHeader: () => dispatch(toggleDcrHeader()),
    goFullView: () => dispatch(goFullView())
});
export default connect(
    mapStateToProps,
    mapDispatchToProps)(Distanceoptionjs)


//     render() {


//         const customLabels = {
//             first: "<<",
//             last: ">>",
//             prev: "< Prev",
//             next: "Next >",
//             show: "Show",
//             entries: "entries",
//             filterPlaceholder: "Search",
//             noResults: "There is no data to be displayed"
//           };


//         return (
//             <div className="content-spacing body-scroll">
//                  <StatusPopup
//                     message={this.state.msg}
//                     show={this.state.show}
//                     onClose={this.hide}
//                     success={this.state.success}
//                 />
//                 <div className="min-height-100">
//                     <div className="dcr-head">
//                         <div>
//                             <h4 className="daily-call-report">
//                                Digital Type Detail Master
//                             </h4>
//                         </div>
//                         <div>
//                             <Breadcrumb className="dcr-breadcrumb">
//                                 <Breadcrumb.Item>
//                                     <Link to="/dashboard">Dashboard</Link>
//                                 </Breadcrumb.Item>
//                                 <Breadcrumb.Item href="#">
//                                     Master
//                                 </Breadcrumb.Item>
//                                 <Breadcrumb.Item active>
//                                    Digital Type Details Master
//                                 </Breadcrumb.Item>
//                             </Breadcrumb>
//                         </div>
//                     </div>
//                     <div className="dcr-list-sec chemistTab">

//                         <div className="marginTop">
//                             <ChemistMasterTable
//                                 editdata={this.state.editdata}
//                                 loadfun={this.loadfun}
//                                 maxcode={this.state.maxcode}
//                                 tableHeader={this.state.header}
//                                 tableBody={this.state.body}
//                                 keyName="userTable"
//                                 tableClass="striped hover table-responsive"
//                                 rowsPerPage={10}
//                                 rowsPerPageOption={[10, 15, 20]}
//                                 initialSort={{
//                                     prop: "username",
//                                     isAscending: true
//                                 }}
//                                 labels={customLabels}
//                             />
//                         </div>
//                         {/* <Tabs
//                             id="controlled-tab-example"
//                             activeKey={this.state.key}
//                             onSelect={key => this.setState({ key })}
//                         >


// <Tab eventKey="add new" title="Create New Master">
//                                 <AddNewChemist />
//                             </Tab>
//                             <Tab
//                                 eventKey="ChemistList"
//                                 title="Chemist Master List"
//                             >

//                             </Tab>

//                         </Tabs> */}
//                     </div>
//                     <Footer />
//                 </div>
//                 {this.state.deletePopup ? <DeletePopup show={this.state.deletePopup} onHide={this.closeModal} handleSubmit={this.handleDelete} /> : ""}

//             </div>
//         );
//     }