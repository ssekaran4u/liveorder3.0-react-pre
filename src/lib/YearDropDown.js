import React,{Component} from 'react'
import {Dropdown, DropdownItem } from 'react-bootstrap'

class YearDropDown extends Component{
    constructor(props){
        super(props)
        this.state={
            selectedYear:'',
        }
        this.handleYear = this.handleYear.bind(this)
    }

    handleYear(year){
        this.setState({
            selectedYear:year
        })
        this.props.getYearlyData(year)
    }

    render(){
        let list =[]
        let years
        let currentYear = new Date().getFullYear();
            // years = currentYear-1
        let mon = new Date().getMonth()
            if(mon < 3){
                years = currentYear-1
            }else{
                years = currentYear
            }
            for (var i= currentYear ; i > years-2 ;i--) {
            list.push(i);
        }
       
        return(
            <div className="manager_callaverage_filter mrYearDrop">
                <Dropdown>
                    <Dropdown.Toggle className="dcr-options" id="dropdown-basic">
                        <span className="">{this.props.yearDropVal != undefined ? this.props.yearDropVal : this.state.selectedYear ? this.state.selectedYear : years}</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="manager_sales_filter_column-dropdown">
                        <div className="month-padding columns-height cal-scrollbar ">
                        
                            {list.map((item) => (
                                <Dropdown.Item className="manager_sales_filter_month" onClick={() => this.handleYear(item)}>{item}</Dropdown.Item>
                            ))}
                        </div>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        )
    }
}
export default YearDropDown