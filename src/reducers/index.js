import { combineReducers } from 'redux'
import app from './app'
import login from './login'
import DCRList from './DCRList'
import DCR from './DCR'
import Calendar from './calendar'
import DOCTOR from './DoctorProfile'
import DCRJoint from './DCRJoint'
import MASTERList from './master'
import DCRPob from './DCRPob'
import OTHERACT from './OtherActivity'
import DCRSamples from './DCRSamples'
import DCRSEARCH from './DCRSearch'
import HEADER from './Header'
import MRDashboard from './MRDashboard';
import Request from './Request'
import ManagerDashboard from './ManagerDashboard'
import AdminDashboard from './AdminDashboard'
import Leave from './Leave';
import STP from './STP';
import MTP from './MTP';
import KAMDashboard from "././KAMreducers/kamDashboardReducers";
import ExpenseClaim from './expenseReducers';
import { LOGOUT } from '../actions/constants'
import RPS from "./RPS";
import Material from "./Material"

// console.log(HEADER,"combinereducer")

const rootReducer = combineReducers({
    app,
    login,
    DCRList,
    DCR,
    DCRPob,
    Calendar,
    DOCTOR,
    DCRJoint,
    MASTERList,
   // MASTERheader,
    OTHERACT,
    DCRSamples,
    DCRSEARCH,
    HEADER,
    MRDashboard,
    Request,
    ManagerDashboard,
    AdminDashboard,
    Leave,
    STP,
    KAMDashboard,
    ExpenseClaim,
    MTP,
    RPS,
    Material
    // Logout
    
})

const appReducer = (state, action) => {
    if (action.type == LOGOUT) {
      state = undefined
    }
  
    return rootReducer(state, action)
  }

export default appReducer