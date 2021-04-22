import React, { Component } from 'react';
import Dashboard from '../components/Dashboard';
import AverageSales from '../components/AverageSales';
import DistributorCoverage from '../components/DistributorCoverage';
import InventoryManagment from '../components/InventoryManagment';
import Footer from '../../../landing-page/components/Footer';
import "../../../../public/assets/css/bootstrap.min.css";
import "../../../../public/assets/css/style.css";
import "../../../../public/assets/css/kamStyle.css"
import { connect } from 'react-redux';
import { 
    getOverAllSalesView, 
    getMonths, 
    getInventoryFilter, 
    getLastOrderDate, 
    getOngoingOrderStatus, 
    getPastOrderStatus, 
    getDistributorList,
    getFinancialYear,
    getLoginName,
    getTotalSales
} from "../../../actions/KAMactions/kamDashboardActions"

class KamDashboard extends Component {
    constructor(props) {
        super(props);
        this.overAllSales = this.overAllSales.bind(this);
        this.totalSalesValidation = this.totalSalesValidation.bind(this)
    }

    overAllSales(data) {
        this.props.displayOverAllSales(data)
    }

    componentDidMount() {
        if(this.props.months==undefined){
            var month = {
                "Index": "MonthView"
            }
            this.props.displayMonths(month);
        }
        if(this.props.inventoryFilter==undefined){
            var filter = {
                "Index": "InventoryFilter"
            }
            this.props.displayInventoryFilter(filter);
        }
        if(this.props.lastOrderDate==undefined){
            var LOD = {
                "Index": "LastOrderDate"
            }
            this.props.displayLastOrderDate(LOD);
        }
        if(this.props.ongoingOrderStatus==undefined){
            var OOStatus = {
                "Index":"OngoingOrders"
            }
            this.props.displayOngoingOrderStatus(OOStatus)
        }
        if(this.props.pastOrderStatus==undefined){
            var POStatus = {
                "Index":"PastOrders"
            }
            this.props.displayPastOrderStatus(POStatus)
        }
        if(this.props.distributorList==undefined){
            var list = {
                "Index": "DistributorsList"
            }
            this.props.displayDistributorList(list)
        }
        if(this.props.financialYear==undefined){
            var years = {
                "Index": "FinancialYear"
            }
            this.props.displayFinancialYear(years)
        }
        if(this.props.loginName==undefined){
            var name = {
                "Index":"Welcome"
            }
            this.props.displayLoginName(name)
        }
        this.totalSalesValidation()
        
    }
    totalSalesValidation(){
        var today = new Date()
        var year = today.getFullYear();
        var currentmonth = today.getMonth();
        var sales = {
            "Index":"TotalSales"
        }
        if(this.props.totalSales==undefined){
            this.props.displayTotalSales(sales)
        }
        else{
            if(this.props.totalSales[0].Year!=year && this.props.totalSales[0].month!=currentmonth){
                this.props.displayTotalSales(sales)
            }
        }
    }

    render() {
        return (
            <div className="dashboard-sec ">
                <div className="admindashboard">
                    <div className="content-spacing dashscroll">
                        <div className="min-height-100">
                            <Dashboard name={this.props.loginName} totalSales={this.props.totalSales}/>
                            <AverageSales overall_sales_view={this.props.overall_sales_view_graph} overAllSales={this.overAllSales} />
                            <DistributorCoverage />
                            <InventoryManagment />
                            <Footer />
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    overall_sales_view_graph: state.KAMDashboard.overall_sales_view_graph,
    months: state.KAMDashboard.months,
    inventoryFilter: state.KAMDashboard.inventory_filter,
    lastOrderDate: state.KAMDashboard.last_order_date,
    ongoingOrderStatus: state.KAMDashboard.ongoing_order_status,
    pastOrderStatus: state.KAMDashboard.past_order_status,
    distributorList: state.KAMDashboard.distributor_list,
    financialYear: state.KAMDashboard.financial_year,
    loginName: state.KAMDashboard.login_name,
    totalSales: state.KAMDashboard.total_sales,
})

const mapDispatchToProps = dispatch => ({
    displayOverAllSales: data => dispatch(getOverAllSalesView(data)),
    displayMonths: data => dispatch(getMonths(data)),
    displayInventoryFilter: data => dispatch(getInventoryFilter(data)),
    displayLastOrderDate: data => dispatch(getLastOrderDate(data)),
    displayOngoingOrderStatus: data => dispatch(getOngoingOrderStatus(data)),
    displayPastOrderStatus: data => dispatch(getPastOrderStatus(data)),
    displayDistributorList: data => dispatch(getDistributorList(data)),
    displayFinancialYear: data => dispatch(getFinancialYear(data)),
    displayLoginName: data => dispatch(getLoginName(data)),
    displayTotalSales: data => dispatch(getTotalSales(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(KamDashboard);