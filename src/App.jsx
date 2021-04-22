import React, { Component } from "react";

import { Router, Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { IntlProvider, addLocaleData } from "react-intl";
import locale_en from "react-intl/locale-data/en";
import locale_ar from "react-intl/locale-data/ar";
import locale_fr from "react-intl/locale-data/fr";
import locale_ru from "react-intl/locale-data/ru";
import locale_hi from "react-intl/locale-data/hi";
import localeData from "../build/locales/data.json";
import { withRouter } from "react-router";
// layout
import Header from "./landing-page/components/Header";
import Sidebar from "./landing-page/components/Sidebar";

//control
import Controls from "./design-controls/containers/Controls";

//pages
import Login from "./login/containers/index";
import DCRList from "./dcr-list/containers/DCRLIst";
import Dashboard from "./dashboard/containers/Dashboard";
import Profile from "./doctor_profile/containers/Profile";

import MainMasterkey from "./Masters/container/index";
import ChemistMaster from "./chemist-master/containers/ChemistMaster";
import DoctorMissedReport from "./HQ-missed-report/containers/DoctorMissedReport";
import DcrSummaryReport from "./DCR-summary-report/containers/DcrSummaryReport";
import Help from "./help/components/Help";
import Report from "./Report/containers/Report";
import CreateNewDCR from "./dcr/containers/CreateNewDCR";
import VisitPreparation from "./visit-prep/containers/VistPrep";

import { getCommToken } from "./lib/comm-utils";
import { addToken } from "./actions/login";
import CommonDCR from "./dcr/containers/CommonDCR";
import UserProfile from "./userProfile/container/userProfile";
import notfound from "./extrapages/pageNotFound";
import pageNotFound from "./extrapages/pageNotFound";
import MasterList from "./landing-page/components/MasterList";
import ChemistProfile from "./chemist_profile/containers/ChemistProfile";
import Mdashboard from "./manager_dashboard/containers/ManagerDashboard";
import StockiestProfile from "./stockiest_profile/containers/StockiestProfile";
import AllNotifications from "./landing-page/components/AllNotifications";
import IFrame from "./Iframe/IFrame"
import IFrameurl from "./Iframe/frameurl"
// import  Test from './Admin_dashboard/components/test'

//import RequestApproval from './request_approvals/containers/RequestApprovalList'
import ManagerApprovalList from './request_approvals/containers/ManagerApprovalList'
import MrApprovalList from './request_approvals/containers/MrApprovalList'
import AdminDashboard from './Admin_dashboard/containers/AdminDashboard'
import UserRights from './user-rights/containers/UserRights'


import KamDashboard from './KAM/dashboard/containers/KamDashboard'
import OrderAnalysisDetail from './KAM/dashboard/components/OrderAnalysisDetail'
import DistributorOrderDetail from './KAM/dashboard/components/DistributorOrderDetail'
import OrderDetail from './KAM/dashboard/components/OrderDetail'
import LeaveDashboard from './Leave/dashboard/container/LeaveDashboard'
import TptContainer from './TPT/containers/TptContainer'
import DayWise from './TPT/components/DayWise';
import Productsale from './KAM/dashboard/components/Productsaleview'
// import ProductwiseTable from './KAM/dashboard/components/productwisetable'
import Cartsummary from './KAM/dashboard/components/cartsummary'
import Orderdet from './KAM/dashboard/components/orderinvoicedetpage'


import KamStockiestProfile from './KAM/stokiest_profile/container/kamStokiest_profile'
import OrderHistory from "./KAM/orderHistory/orderHistoryContainer.js";
import OrderDetails from "./KAM/orderDetails/orderDetailsContainer.js";
import MRModule from "./MTP/mr_module/components/tourplanContainer";
import ManagerMtp from "./MTP/manager_module/container/ManagerMtp";
//import TpdList from "./MTP/manager_module/components/TpdList";
import TpdActionList from "./MTP/manager_module/components/TpdActionList";
//import DaywiseManager from './MTP/manager_module/components/DaywiseManager';
import DayWiseTp from "./MTP/mr_module/components/dayWiseTpTemplateContainer.js";
import NewTpHeading from './MTP/manager_module/components/NewTpHeading';
//import EditTourPlan from './MTP/manager_module/components/EditTourPlan';
import DownlineHeading from './MTP/manager_module/components/DownlineHeading';
import DetailAction from './MTP/manager_module/components/DetailAction';
// import TpdView from './MTP/manager_module/components/TpdView';
import UserDetailsList from './MTP/manager_module/components/UserDetailsList'

import Standardfarechart from './SFC/containers/sfcmrcontainer'
import Sfcdetail from './SFC/components/SfcMr/sfcdetail'
import Sfclistedit from './SFC/components/SfcMr/sfclistedit'
import Managerapprvreject from './SFC/components/SfcMr/manageraprvrject'
import Sfclistadmin from './SFC/components/SfcMr/sfclistadmin'
import Sfcadminapprvreject from './SFC/components/SfcMr/sfcadminapprvrejec'
import DetailedInformationTable from "./MTP/mr_module/components/detailedInformationTable.js";
import NewSfcEdit from './SFC/components/SfcMr/NewSfcEdit'
import UserHeirarchyMapping from "./KAM/userHeirarchyMapping/userHeirarchyMappingContainer.js";
import DistributorMapping from "./KAM/distributorMapping/distributorMappingContainer.js";
import { postToServer } from './lib/comm-utils';
import ClaimListContainer from "./expenseClaimList/expenseContainer/claimListContainer.js";
import ECETemplate from "./expenseClaimList/components/ECETemplate.js";
import PrintExpenseDetails from "./expenseClaimList/components/printExpenseDetail.js";

import Primarycontainer from './Transaction_module/primarysales/containers/primarycontainer';
import Secondarycontainer from './Transaction_module/primarysales/containers/secondarycontainer'
import Pmastercontainer from './Transaction_module/primarymaster/container/pmastercontainer';
import Smasterdropdown from './Transaction_module/primarymaster/container/smastercontainer';
import SSalesApprovalList from './Transaction_module/primarymaster/approval/containers/sSalesApprovalListContainer'
import SSalesApproval from './Transaction_module/primarymaster/approval/containers/SSalesApprovalContainer'

//AuthenticatedRoute checks whether authentication has been completed

import Material_request from "./material_request/Container/Material_request"
import NewMaterialEntry from "./material_request/components/NewMaterialEntry"
import Invoice from './material_request/components/Invoice'
import Manager_material from './material_request/Container/Manager_material'
import UploadInvoice from './material_request/components/UploadInvoice'

//import { Makelogin } from "./actions/login";


import RPSListContainer from "./RPS/container/RPSListContainer";
import RPSEntryContainer from "./RPS/container/RPSEntryContainer";
import RPSApprovalListContainer from "./RPS/container/RPSApprovalListContainer";
import RPSApprovalDetailsContainer from "./RPS/container/RPSApprovalDetailsContainer";

import MarketingDashboard from './OtherDashbord/MarketingDashboard'

//campaign
import campaignRequestList from './campaign_request/containers/campaignRequestList'
import campaignRequestEntry from './campaign_request/components/campaignRequestEntry'
import ManagerCampaign from './campaign_request/manager_module/containers/ManagerCampaign'
import AdminCampaign from './campaign_request/admin_module/containers/AdminCampaign'

//rps desk head admin
import RPSDeskHead from './RPS/RPS_desk/containers/RPSDeskHead'
import ExpenseEntry from './RPS/RPS_desk/containers/ExpenseEntry'
import RPSView from './RPS/RPS_desk/components/RPSView'
import AddBeneficiary from './RPS/RPS_desk/popup/AddBeneficiary'
import RPSDeskStaff from './RPS/RPS_desk/containers/RPSDeskStaff'
import RPSDeskHeadReqView from './RPS/RPS_desk/components/RPSDeskHeadReqView'
// PRP
import prplistcontainer from  "./PRP/container/prplistcontaner"
import PRPApprovalListContainer from  "./PRP/container/PrpApprovalListContainer"
import prpRequestDetailsViewContainer from "./PRP/container/PrpRequestDetailsViewContainer"
import Newentrycontainer from "./PRP/container/newentrycontainer";
import PrpExpenseViewcontainer from "./PRP/container/prpexpenseviewcontainer";
import PrpDetailViewcontainer from "./PRP/container/prpdetailviewcontainer";
import prpExpenseDetailsViewContainer from "./PRP/container/PrpExpenseDetailsViewContainer";
import ReqDetails from "./PRP/container/AdminReqDetails";
import ConfirmationListContainer from "./PRP/container/ConfirmationListContainer";
import PrpOtherExpenseViewcontainer from "./PRP/container/prpotherexpensentry";
import AdminExpenseDetails from "./PRP/container/AdminExpenseDetails"

// Static Reports
// import DrBrandCompetitorProducts from './views/report/DrBrandCompetitorProducts'
import DoctorBrandWiseCompetitorReport from './Report/containers/DoctorBrandWiseCompetitorReport'
import DoctorChemistBrandWiseCompetitorReport from './Report/containers/DoctorChemistBrandWiseCompetitorReport'
// import RPSConsolidatedReport from './Report/containers/RPSConsolidatedReport'
// import PRPDetailsReport from './Report/containers/PRPDetailsReport'

// import RPS_BrandWise_Rpt from './Report/containers/RPS_BrandWise_Rpt'

import RCPAList from "./RCPANew/containers/DCRLIst";
import CreateRCPA from "./RCPANew/containers/CreateRCPA";

import CircularView from "./circular_ui/containers/CircularView"
import ExpenseDcrList from "./expenseClaimList/components/expenseDcrList.js";
import ExpenseMcrList from "./expenseClaimList/components/expenseMcrList.js";

import ReportCon from './Report_module/containers/ReportCon'
import ReportPrpConPRP from './Report_PRPBrandwise/containers/ReportPrpConPRP'
import ReportConAct from './Report_rpsactivity/containers/ReportConAct'
import ReportConPRPCONSOL from "./Report_PRPCONSOLIDATED/containers/ReportConPRPCONSOL";
import ReportConEC from "./Report_Eceptionalprprps/containers/ReportConEC";
import ReportPrpConRPSDocWiseInvDet from "./Report_RPSDocWiseInvDet/containers/ReportPrpConRPSDocWiseInvDet";
import ReportPrpConRPSINVEST from "./Report_RPSINVEST/containers/ReportPrpConRPSINVEST";
import ReportPrpConPRPACTIVITY from "./Report_PRPACTIVITY/containers/ReportPrpConPRPACTIVITY";
import ReportPRPDetails from "./Report_PRPDetail/containers/ReportPRPDetails";
import ReportRpsConsole from "./Report_RPSConsole/containers/ReportRpsConsole";


import Stckst_Value_sec_saleCon from "./Stockist_wise_Value_wise_sec_sales/containers/Stckst_Value_sec_saleCon";
//import Product_Wise_Reg_HQ_Wise_primary_SecondaryCon from "./Product Wise RegionHQ Wise  primary Secondary Sales Report/containers/Product_Wise_Reg_HQ_Wise_primary_SecondaryCon";
// import Fs_wise_Stkst_Wise_Prdct_wise_salesCon from "./Fs wise Stockist Wise Product wise sales data Report/containers/Fs_wise_Stkst_Wise_Prdct_wise_salesCon";

//dcr reports
import Digitly_Cnctd_Chmst_StkstCon from "./DigitallyConnectedChemistStockistReport/containers/Digitly_Cnctd_Chmst_StkstCon";
import DistanceCallCon from "./DistanceCallReport/containers/DistanceCallCon";


import MeWisePhyandDigitalCon from "./Me_Wise_Phy_and_Digital_Report/containers/MeWisePhyandDigitalCon";
import RegWiseSmaryphyDigiCon from "./Region_Wise_Summary_phy_and_Digi_Report/containers/RegWiseSmaryphyDigiCon";

import ReportDistDetailsummary from "./RegionWiseDistDetailSummaryRpt/containers/ReportDistDetailsummary";

import DCRmaster from './MasterSample/containers/ChemistMaster'
import DCRoption from './MasterSample/containers/Distanceoption'

 import DaywiseTourplanContainer from "./MTP/manager_module/container/daywisetoutplanContainer"
 import Detailinfotable from "./MTP/manager_module/components/detailinfotable2"
import TPMrNameTabs from "./MTP/manager_module/components/mrnametab"
 import MRPatchesDetail from "./MTP/manager_module/components/mrpatchesdetail"
// Doctor Request
// import Updatedoclist from './DoctorRequest/containers/updatedoclistcontainer'
// import Doctorprofileedit from './DoctorRequest/containers/doctorprofileedit'
// import Doctorprofileview from './DoctorRequest/containers/doctorprofileview'
// import Newdoctotform from './DoctorRequest/containers/newdoctorform'
// import Managerdoctorlist from './DoctorRequest/containers/managerdoctorlistcontainer'
// import Admindoctorlist from './DoctorRequest/containers/admindoctorlist'
//user setting
import SetUpContainer from './User-setting/container/SetUpContainer'
import DCRActivationComp from './User-setting/components/DCRActivationComp'
import DCRMCRLockRelease from './User-setting/components/DCRMCRLockRelease'
import CompetitorProSetup from './User-setting/components/CompetitorProSetup'
import LeaveapprovelSetup from './User-setting/components/LeaveApprovelSetup'
import LeaveApprovelSetupSave from './User-setting/components/LeaveApprovelSetupSave'
import EscalationMatrix from './User-setting/components/EscalationMatrix'
import TransactionLogSetting from './User-setting/components/TransactionLogSetting'

import PRPSetUpList from "./User-setting/components/PRPSetuplist"
 import PRPAdd from "./User-setting/components/PRPAdd"
 import RPSSetupList from './User-setting/components/RPSSetupList'
import RPSAdd from './User-setting/components/RPSAdd'
import RPSEdit from './User-setting/components/RPSEdit'
import ControlPanelSetting from './User-setting/components/ControlPanelSetting'
import ControlSettingSecPage from './User-setting/components/ControlSettingSecPage'
 import RCPAEntry from './User-setting/components/RCPAEntry'

// TODO: src/RCPA need to be deleted once used src/RCPANew in place.
// TODO: src/views need to be deleted.

const _AuthenticatedRoute = ({ page: Page, changeLocale, ...rest }) => {
    const { isAuthenticated } = rest;


   
    // let url = rest.location.pathname.substring(1);
    // if (rest.userRights.length > 0) {
    //     if (rest.path.includes("IFrameurl")) {
    //         if (rest.userRights.some(res => res.URL.toLowerCase() == url.toLowerCase())) {
    //             return(<Route
    //                 {...rest}
    //                 render={props =>
    //                     isAuthenticated === true ? (
    //                         <React.Fragment>
    //                             <Sidebar />
    //                             <div className="main">
    //                                 <Header changeLocale={changeLocale} />
    //                                 <React.Fragment>
    //                                     <Page {...props} />
    //                                 </React.Fragment>
    //                             </div>
    //                         </React.Fragment>
    //                     ) : (
    //                             <Redirect to={{ pathname: "/" }} />
    //                         )
    //                 }
    //             />)
    //         }
    //         else{
    //            return <Route
    //            render={() => (
    //                <Redirect to={{ pathname: "/404" }} />
    //            )}
    //        />
    //         }
    //     }
    //     else {
            return (
                <Route  
                    {...rest}
                    render={props =>
                        isAuthenticated === true ? (
                            <React.Fragment     >
                                <Sidebar />
                                <div className="main">
                                    <Header changeLocale={changeLocale} />
                                    <React.Fragment>
                                        <Page {...props} />
                                    </React.Fragment>
                                </div>
                            </React.Fragment>
                        ) : (
                                <Redirect to={{ pathname: "/" }} />
                            )
                    }
                />
            );
    //     }
    // }
    // else {
    //     return null;
    // }
};

const AuthenticatedRoute = connect(state => ({
    isAuthenticated: !!state.login.token
}))(_AuthenticatedRoute);

/*const language =
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    navigator.userLanguage;

// Split locales with a region code
const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];

// Try full locale, try locale without region code, fallback to 'en'
const messages = localeData[languageWithoutRegionCode] || localeData[language] || localeData.en;*/

class App extends Component {
    constructor(props) {
        super(props);
        let language = "en";
        this.state = {
            locale: language,
            messages: localeData[language],
            // userRights: []
        };
        this.waittoset=this.waittoset.bind(this)
    }


 




    componentWillMount() {

       
        addLocaleData([
            ...locale_en,
            ...locale_ar,
            ...locale_fr,
            ...locale_ru,
            ...locale_hi
        ]);
    }



    waittoset(token,type){
        localStorage.setItem("SFA_TOKEN",token)
        sessionStorage.setItem("SFA_TOKEN",token)
        localStorage.setItem("type","1")
        //this.props.Makelogin(token);
    }
    // componen{tDidMount() {
    //     var data = { "index": "USERroute" }
    //     postToServer("UserRight", data).then((Result) => {
    //         if (Result.data.Status == 'Success') {
    //             this.setState({ userRights: Result.data.data })
    //         }
    //     }).catch((Error) => {
    //         console.log("Error at user Right Api")
    //     })
    // }
    componentDidMount() {

       
        if(this.props.location.pathname){


            const url=this.props.location.pathname.split('/')

       


            if(url[1]=="token"){
                if(url[2]){
                    if(url[3]){
                        // console.log(url[1],'kunal')
                        // console.log(url[2],'kunal')
                        // console.log(url[3],'kunal')
                        localStorage.setItem("Com","s360demo")
                        localStorage.setItem("KM","0")
                        localStorage.setItem("mob","0395")
                       this.waittoset(url[3],"1")

                    //   alert('ddd')
                          //  return <Redirect to="/IFrameurl/38" />;
                       


                       
                     
                     
                       
                        this.props.history.push("/IFrameurl/"+url[2]);
                    }
                }
            }
            //console.log(this.props.location.pathname,'kunal')
         }
    }

    //  componentDidUpdate(olstate,olsprops){
    //      alert('klkl')
    //  }


    componentDidUpdate(olsstate,newProps) {
     
       

         if(this.props.location.pathname){


            const url=this.props.location.pathname.split('/')

           


            if(url[1]=="token"){
                if(url[2]){
                    if(url[3]){
                        localStorage.setItem("SFA_TOKEN",url[1])
                        localStorage.setItem("type","1")
                        localStorage.setItem("Com","s360demo")
                        localStorage.setItem("KM","0")
                        localStorage.setItem("mob","0395")
                       //this.props.history.push("/dashboard");
                    }
                }
            }
          //  console.log(this.props.location.pathname,'kunal')
         }
       
      }

    changeLocale(language) {
        let locale, messages;
        switch (language) {
            case "en":
            case "ar":
                locale: language;
                messages: localeData[language];
                break; Sfceditpage
            default:
                locale: "ar";
                messages: localeData["ar"];
                break;
        }
        this.setState({ locale: language, messages: localeData[language] });
    }

    authenticate(path, page) {

       // alert('klkl')
        return (
            <AuthenticatedRoute
                path={path}
                changeLocale={this.changeLocale.bind(this)}
                page={page}
                // userRights={this.state.userRights}
            />
        );
    }

    render() {
        let { token, dispatch } = this.props;
        if (!token) {
            token = getCommToken();
            if (token) dispatch(addToken(token));
        }
        let { locale, messages } = this.state;
        return (
            <React.Fragment      >
                <IntlProvider locale={locale} messages={messages}>
                    <Switch>
                        <Route     path={"/"} exact component={Login} />
                        {this.authenticate("/MainMasterkey/:id", MainMasterkey)}
                        {this.authenticate("/CallMaster", DCRmaster)}
                        {this.authenticate("/Calloption", DCRoption)}
                        
                        {this.authenticate("/token/:url/:token", Dashboard)}
                        {this.authenticate("/IFrameurl/:id", IFrameurl)}
                        {this.authenticate("/IFrame", IFrame)}
                        {this.authenticate("/controls", Controls)}
                        {this.authenticate("/dcr-list", DCRList)}
                        {this.authenticate("/dashboard", Dashboard)}
                        {this.authenticate("/profile/:id", Profile)}
                        {this.authenticate("/chemist_master", ChemistMaster)}
                        {/* {this.authenticate('/Test',Test)} */}
                        {this.authenticate(
                            "/HQ-missed-report",
                            DoctorMissedReport
                        )}
                        {this.authenticate(
                            "/DCR-Summary-report",
                            DcrSummaryReport
                        )}
                        {this.authenticate("/help", Help)}
                        {this.authenticate("/Report/:id", Report)}
                        {this.authenticate("/dcr", CreateNewDCR)}
                        {this.authenticate("/MainMasterkey/:id", MainMasterkey)}
                        {this.authenticate("/dcr-common/:id", CommonDCR)}
                        {this.authenticate("/dcr-common", CommonDCR)}
                        {this.authenticate(
                            "/visit-preparation/:id",
                            VisitPreparation
                        )}
                        {this.authenticate("/userprofile", UserProfile)}
                        {/* {this.authenticate('/notfound', notfound)} */}
                        {this.authenticate("/MasterList", MasterList)}
                        {this.authenticate(
                            "/ChemistProfile/:id",
                            ChemistProfile
                        )}
                        {this.authenticate("/Mdashboard", Mdashboard)}
                        {this.authenticate(
                            "/StockiestProfile/:id",
                            StockiestProfile
                        )}
                        {this.authenticate(
                            "/all_notifications",
                            AllNotifications
                        )}
                        {/* {this.authenticate('/request_approval', RequestApproval)} */}
                        {this.authenticate('/manager_request_approval', ManagerApprovalList)}
                        {this.authenticate('/mr_request_approval',
                            MrApprovalList
                        )}
                        {this.authenticate('/Adashboard', AdminDashboard)}
                        {this.authenticate('/user-rights', UserRights)}


                        {this.authenticate('/kdashboard', KamDashboard)}
                        {this.authenticate('/userhierarchymapping', UserHeirarchyMapping)}
                        {this.authenticate('/distributormapping', DistributorMapping)}
                        {this.authenticate('/order_analysis', OrderAnalysisDetail)}
                        {this.authenticate('/distributor_order_details', DistributorOrderDetail)}
                        {this.authenticate('/Order_details', OrderDetail)}
                        {this.authenticate('/tpt', TptContainer)}
                        {this.authenticate('/daywise', DayWise)}
                        {/*D*/}
                        {this.authenticate('/leave', LeaveDashboard)}

                        {this.authenticate('/productsale', Productsale)}
                        {/* {this.authenticate('/productwisetable', ProductwiseTable)} */}
                        {this.authenticate('/cartsummary', Cartsummary)}
                        {this.authenticate('/orderdetailpage', Orderdet)}
                        {this.authenticate('/kamstokiest_profile', KamStockiestProfile)}
                        {this.authenticate('/orderhistory', OrderHistory)}
                        {this.authenticate('/orderdetails', OrderDetails)}
                        {this.authenticate('/mrtp', MRModule)}
                        {this.authenticate('/manager-mtp', ManagerMtp)}
                        
                        {this.authenticate('/downlineview/:code/:fscode/:MONTH/:YEAR', DownlineHeading)}
                        {this.authenticate('/UserDetailsList/:code/:fscode/:MONTH/:YEAR', UserDetailsList)}
                       

                        {/* {this.authenticate('/tour-plan', TpdList)} */}
                        {this.authenticate('/tourPlan', TpdActionList)}
                        {this.authenticate('/newTourPlan', NewTpHeading)}
                        {/* {this.authenticate('/editTourPlan', EditTourPlan)} */}
                        {/* {this.authenticate('/dayWisetppp', DaywiseManager)} */}
                        {this.authenticate('/mr-tp-details', DetailAction)}
                        {/* {this.authenticate('/tp-view', TpdView)} */}

                        {this.authenticate('/day-wise-tp-template', DayWiseTp)}

                        {this.authenticate('/sfcmr', Standardfarechart)}
                        {this.authenticate('/sfcdetail', Sfcdetail)}
                        {this.authenticate('/sfclistedit/:id', Sfclistedit)}
                        {this.authenticate('/managerapprvreject/:id', Managerapprvreject)}
                        {this.authenticate('/sfclistadmin', Sfclistadmin)}
                        {this.authenticate('/sfcadminapprvrejct/:id', Sfcadminapprvreject)}
                        {this.authenticate('/SfcEdit/:id', NewSfcEdit)}

                        {this.authenticate('/expenseclaimlist',ClaimListContainer)}
                        {this.authenticate('/expensedcrlist/:reportNo/:entryType/:date',ExpenseDcrList)}
                        {this.authenticate('/expensemcr/:fscode/:entryType/:date/:name',ExpenseMcrList)}
                        {this.authenticate('/expenseclaimentry/:code/:entryType/:id', ECETemplate)}
                        {this.authenticate('/expensedetails',PrintExpenseDetails)}

                        {this.authenticate('/primarysalestarget', Primarycontainer)}
                        {this.authenticate('/secondarysalestarget', Secondarycontainer)}
                        {this.authenticate('/primarysale', Pmastercontainer)}
                        {this.authenticate('/secondarysale', Smasterdropdown)}
                        {this.authenticate('/SSalesApproval',SSalesApprovalList)}
                        {this.authenticate('/secondarysaleEdit/:id',SSalesApproval)}

                        {this.authenticate('/material_request',Material_request)}
                        {this.authenticate('/add_material/:id',NewMaterialEntry)}
                        {this.authenticate('/invoice/:id',Invoice)}
                        {this.authenticate('/manager_material',Manager_material)}
                        {this.authenticate('/upload_invoice',UploadInvoice)}
                       
                        {this.authenticate('/rps', RPSListContainer)}
                        {this.authenticate('/rps-entry/:id', RPSEntryContainer)}
                        {this.authenticate('/rps-manager', RPSApprovalListContainer)}
                        {this.authenticate('/rps-approval', RPSApprovalDetailsContainer)}

                        {this.authenticate('/DefaultDashboard', MarketingDashboard)}

                        {this.authenticate('/campaignRequestList',campaignRequestList)}
                       
                        {this.authenticate('/campaignRequestEntry/:id', campaignRequestEntry)}
                       
                        {this.authenticate('/managerCampaign',ManagerCampaign)}
                        {this.authenticate('/adminConfirmationList',AdminCampaign)}
                        {this.authenticate('/rps-deskHeadadmin',RPSDeskHead)}
                        {this.authenticate('/rps-expenseEntry',ExpenseEntry)}
                        {this.authenticate('/rps-view',RPSView)}
                        {this.authenticate('/add-beneficiary',AddBeneficiary)}
                        {this.authenticate('/rpsdesk-staff',RPSDeskStaff)}
                         {this.authenticate('/rps-deskHeadView/:id',RPSDeskHeadReqView)}

                        {this.authenticate('/mrprplist' , prplistcontainer)}
                        {this.authenticate('/mrnewentry/:id/:type', Newentrycontainer)}
                        {this.authenticate('/mrprpexpenseview/:id/:type/:status' , PrpExpenseViewcontainer)}
                        {this.authenticate('/mrprpdetailview/:id/:type', PrpDetailViewcontainer)}
                        {/* {this.authenticate('/prplist' , prplistcontainer)} */}
                        {this.authenticate('/PrpApprovalList', PRPApprovalListContainer)}
                        {this.authenticate('/PrpReqDetails/:id', prpRequestDetailsViewContainer)}
                        {/* {this.authenticate('/newentry', Newentrycontainer)} */}
                        {this.authenticate('/ExpenseDeatils/:id', prpExpenseDetailsViewContainer)}
                        {this.authenticate('/ReqDetails/:id', ReqDetails)}
                        {this.authenticate('/ConfirmationList', ConfirmationListContainer)}
                        {this.authenticate('/prpotherexpense' , PrpOtherExpenseViewcontainer)}
                        {this.authenticate('/AdminExpDetail/:id', AdminExpenseDetails)}

                        {/* {this.authenticate('/DrBrandCompetitorProducts', DrBrandCompetitorProducts)} */}
                        {this.authenticate('/DoctorBrandWiseCompetitorReport', DoctorBrandWiseCompetitorReport)}
                        {this.authenticate('/DoctorChemistBrandWiseCompetitorReport', DoctorChemistBrandWiseCompetitorReport)}
                        {this.authenticate('/RPSConsolidatedReport', ReportRpsConsole)}
                        {this.authenticate('/PRPDetailsReport', ReportPRPDetails)}

                        {/* {this.authenticate('/RPS_BrandWise_Rpt', RPS_BrandWise_Rpt)} */}

                        {this.authenticate('/RCPAList', RCPAList)}
                        {this.authenticate('/CreateRCPA/:id', CreateRCPA)}
                        {this.authenticate('/CreateRCPA', CreateRCPA)}

                        {this.authenticate("/CircularView", CircularView)}
                        {this.authenticate("/RPS_BrandWise_Rpt", ReportCon)}
                        {this.authenticate("/prpbrandReport", ReportPrpConPRP)}
                        {this.authenticate("/rpsactivityReport", ReportConAct)}
                        {this.authenticate("/prpconsolidatedreport", ReportConPRPCONSOL)}
                        {this.authenticate("/prprpsexceptionalrpt", ReportConEC)}
                         {this.authenticate("/Rpt_RPSDocWiseInvstmntDetailsReport", ReportPrpConRPSDocWiseInvDet)}
                        {this.authenticate("/RPSINVESTReport", ReportPrpConRPSINVEST)}
                        {this.authenticate("/PRP_Activity_Rpt", ReportPrpConPRPACTIVITY)}


                        {this.authenticate("/Stockist_wise_Value_wise_secondary_sales", Stckst_Value_sec_saleCon)}
                        {/* {this.authenticate("/Product_Wise_Reg_HQ_Wise_primary_Secondary_sales", Product_Wise_Reg_HQ_Wise_primary_SecondaryCon)} */}
                        {/* {this.authenticate("/Fs_wise_Stkst_Wise_Prdct_wise_sales", Fs_wise_Stkst_Wise_Prdct_wise_salesCon)} */}

                        {this.authenticate("/Digitly_Cnctd_Chmst_Stkst", Digitly_Cnctd_Chmst_StkstCon)}
                        {this.authenticate("/DistanceCallReport", DistanceCallCon)}


                        {this.authenticate("/MeWisePhyandDigital", MeWisePhyandDigitalCon)}
                        {this.authenticate("/RegWiseSmaryphyDigital", RegWiseSmaryphyDigiCon)}
                        {this.authenticate("/RegionWiseDistDetailSummary", ReportDistDetailsummary)}
                        {this.authenticate("/user-setting", SetUpContainer)}
                        {this.authenticate("/dcr-activation", DCRActivationComp)}
                        {this.authenticate("/dcr-release", DCRMCRLockRelease)}
                        {this.authenticate("/rcpa-setting", CompetitorProSetup)}
                        {this.authenticate("/leaveapprovelsetup", LeaveapprovelSetup)}
                        {this.authenticate("/LeaveApprovelSetupSave", LeaveApprovelSetupSave)}
                        {this.authenticate("/EscalationMatrix", EscalationMatrix)}
                        {this.authenticate("/TransactionLogSetting", TransactionLogSetting)}
                        
                        

                        
                        {/* {this.authenticate("/prp-setting" , PRPSetUpList)} */}
                        {/* {this.authenticate("/prp-add/:id" , PRPAdd)} */}
                        {/* {this.authenticate("/rps-setting", RPSSetupList)} */}
                        {this.authenticate("/rps-add", RPSAdd)}
                        {this.authenticate("/edit-rps-setting", RPSEdit)}
                        {this.authenticate("/control-panel-setting", ControlPanelSetting)}
                        {this.authenticate("/control-setting", ControlSettingSecPage)}
                        {this.authenticate("/rcpa-setup-entry", RCPAEntry)}
                        
                        
                        
                        {/* {this.authenticate("/daywisetp" , DaywiseTourplanContainer)} */}
                        {this.authenticate('/dd', DetailedInformationTable)}
                        {/* {this.authenticate("/d2" , Detailinfotable)} */}
                        {this.authenticate("/tpmrname", TPMrNameTabs)}
                        {this.authenticate("/MRPatchesDetail", MRPatchesDetail)}
                        
                        
                        {/* {this.authenticate("/Updatedoclist", Updatedoclist)}
                        {this.authenticate("/Doctorprofileedit", Doctorprofileedit)}
                        {this.authenticate("/Doctorprofileview", Doctorprofileview)}
                        {this.authenticate("/Newdoctorform", Newdoctotform)}
                        {this.authenticate("/Managerdoctorlist", Managerdoctorlist)}
                        {this.authenticate("/Admindoctorlist", Admindoctorlist)} */}
                        {/* {this.authenticate("/PRP_Details_Rpt", ReportPRPDetails)} */}
                        <Route path={"/404"} exact component={pageNotFound} />

                        {/* <AuthenticatedRoute path={"/master"} page={MainMaster} /> */}
                        <Route
                            render={() => (
                                <Redirect to={{ pathname: "/404" }} />
                            )}
                        />
                    </Switch>
                </IntlProvider>
            </React.Fragment>
        );
    }
} 

const mapStateToProps = state => ({
    token: state.login.token
   
});

// const mapDispatchToProps = dispatch => ({
//     Makelogin: data => dispatch(Makelogin(data)),
   
// });

export default connect(mapStateToProps)(withRouter(App));
