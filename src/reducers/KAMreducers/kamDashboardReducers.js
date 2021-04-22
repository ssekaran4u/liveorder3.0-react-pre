import {
    OVERALL_SALES, 
    MONTHS, 
    INVENTORY_FILTER, 
    LAST_ORDER_DATE, 
    ONGOING_ORDER_STATUS, 
    PAST_ORDER_STATUS, 
    DISTRIBUTOR_LIST,
    FINANCIAL_YEAR,
    RETAILER_STATUS,
    WELCOME,
    TOTAL_SALES
} from "../../actions/KAMactions/kamConstants";

export default function KAMDashboard(state={}, action){
    switch(action.type){
        case OVERALL_SALES:
            return ({ ...state, overall_sales_view_graph: action.payload})
        case MONTHS:
            return ({...state, months: action.payload})
        case INVENTORY_FILTER:
            return ({...state, inventory_filter: action.payload})
        case LAST_ORDER_DATE:
            return ({...state, last_order_date: action.payload})
        case ONGOING_ORDER_STATUS:
            return ({...state, ongoing_order_status: action.payload})
        case PAST_ORDER_STATUS:
            return ({...state, past_order_status: action.payload})
        case DISTRIBUTOR_LIST:
            return ({...state, distributor_list: action.payload})
        case FINANCIAL_YEAR:
            return ({...state, financial_year: action.payload})
        case RETAILER_STATUS:
            return ({...state, retailer_status: action.payload})
        case WELCOME:
            return ({...state, login_name: action.payload})
        case TOTAL_SALES:
            return ({...state, total_sales: action.payload})
        default: 
            return state;
    }
}