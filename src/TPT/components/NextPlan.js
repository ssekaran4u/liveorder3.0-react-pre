import React, { Component } from 'react';
import "../../../public/assets/css/tptStyle.css";
import WeekComponent from '../components/WeekComponent'
import DayComponent from '../components/DayComponent'

class NextPlan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPlan: false,
            showActiveWeek: false,
            showActiveDay: {},
            selectedWeek: '',
            selectedData: '',
            SelectedW: 0
        }

        this.showNextPlan = this.showNextPlan.bind(this);
        this.hideNextPlan = this.hideNextPlan.bind(this);
        // this.handleWeek = this.handleWeek.bind(this)
        this.handleDay = this.handleDay.bind(this)
        this.getDay = this.getDay.bind(this)
        this.getWeek = this.getWeek.bind(this)
        this.ChangeWeek = this.ChangeWeek.bind(this)
    }


    Changedate(selectedWeek, weekday) {

        let showActiveDay={}
        showActiveDay=this.state.showActiveDay
        if(showActiveDay[selectedWeek][weekday]){
            delete showActiveDay[selectedWeek][weekday]
        }else{
            showActiveDay[selectedWeek][weekday]=this.props.Doc

        }


        this.setState({  showActiveDay:showActiveDay, SelectedW: selectedWeek })
        this.props.nextplandata(showActiveDay,this.props.Doc)
    }
    ChangeWeek(selectedWeek) {

        let showActiveDay={}
        showActiveDay=this.state.showActiveDay
        if(showActiveDay[selectedWeek])
        {
           // showActiveDay[selectedWeek]={}
        }
        else{
            showActiveDay[selectedWeek]={}
        }

        this.setState({  showActiveDay:showActiveDay, SelectedW: selectedWeek })
    }

    showNextPlan() {
        this.setState({
            showPlan: true
        })
    }
    hideNextPlan() {
        this.setState({
            showPlan: false
        })
    }

    handleDay() {
        this.setState({
            showActiveDay: !this.state.showActiveDay
        })
    }
    getDay(day) {
        this.setState({
            selectedData: day
        })
    }
    getWeek(week) {
        this.setState({
            selectedWeek: week
        })
    }
    render() {
        return (
            <React.Fragment>


                <span className="partiallyActiveTextYellow10" onClick={this.showNextPlan}>Next Plan <img src="../public/assets/images/selectPopupImage1.svg" /></span>
                {/* <img src="../public/assets/images/overflow.svg"  className="handCurser" onClick={this.showApprovalDropdown} /> */}
                {this.state.showPlan ?
                    <div className="nextPlanModal" onMouseLeave={this.hideNextPlan}>

                        <div className="addto">Add To</div>
                        <div>
                            <div className=" weekspan">
                                <div className="flexDisplay borderspan">
                                    <div>
                                        <div onClick={() => this.ChangeWeek(1)} className={this.state.SelectedW ==1 ? "firtDay activeWeek weekpad" : "firtDay weekpad"}  >w1</div>
                                    </div>

                                    <div>
                                        <div onClick={() => this.ChangeWeek(2)} className={this.state.SelectedW ==2 ? "firtDay activeWeek weekpad" : "firtDay weekpad"}  >w2</div>
                                    </div>



                                    <div>
                                        <div onClick={() => this.ChangeWeek(3)} className={this.state.SelectedW ==3 ? "firtDay activeWeek weekpad" : "firtDay weekpad"}  >w3</div>
                                    </div>


                                    <div>
                                        <div onClick={() => this.ChangeWeek(4)} className={this.state.SelectedW ==4 ? "firtDay activeWeek weekpad" : "firtDay weekpad"}  >w4</div>
                                    </div>

                                    <div>
                                        <div onClick={() => this.ChangeWeek(5)} className={this.state.SelectedW ==5 ?  "firtDay activeWeek weekpad" : "firtDay weekpad"}  >w5</div>
                                    </div>


                                </div>


                                {this.state.SelectedW == 1 ?
                                    <div className="flexDisplay padtop8">

                                       
                                        <div>
                                            <div onClick={() => this.Changedate(1, 1)} className={this.state.showActiveDay[1][1]? "firtDay activeWeek weekpad" : "firtDay weekpad"}  >Mo</div>
                                        </div>
                                        <div>
                                            <div onClick={() => this.Changedate(1, 2)} className={this.state.showActiveDay[1][2] ? "firtDay activeWeek weekpad" : "firtDay weekpad"}  >Tu</div>
                                        </div>
                                        <div>
                                            <div onClick={() => this.Changedate(1, 3)} className={this.state.showActiveDay[1][3] ? "firtDay activeWeek weekpad" : "firtDay weekpad"}  >We</div>
                                        </div>
                                        <div>
                                            <div onClick={() => this.Changedate(1, 4)} className={this.state.showActiveDay[1][4] ? "firtDay activeWeek weekpad" : "firtDay weekpad"}  >Th</div>
                                        </div>

                                        <div>
                                            <div onClick={() => this.Changedate(1, 5)} className={this.state.showActiveDay[1][5] ? "firtDay activeWeek weekpad" : "firtDay weekpad"}  >Fr</div>
                                        </div>

                                        <div>
                                            <div onClick={() => this.Changedate(1, 6)} className={this.state.showActiveDay[1][6] ? "firtDay activeWeek weekpad" : "firtDay weekpad"}  >Sa</div>
                                        </div>
                                        <div>
                                            <div onClick={() => this.Changedate(1, 7)} className={this.state.showActiveDay[1][7] ? "firtDay activeWeek weekpad" : "firtDay weekpad"}  >Su</div>
                                        </div>

                                    </div>
                                    : null}


                                {this.state.SelectedW == 2 ?
                                    <div className="flexDisplay padtop8">
                                      
                                        <div>
                                            <div onClick={() => this.Changedate(2, 1)} className={this.state.showActiveDay[2][1] ? "firtDay activeWeek weekpad" : "firtDay weekpad"}  >Mo</div>
                                        </div>
                                        <div>
                                            <div onClick={() => this.Changedate(2, 2)} className={this.state.showActiveDay[2][2] ? "firtDay activeWeek weekpad" : "firtDay weekpad"}  >Tu</div>
                                        </div>
                                        <div>
                                            <div onClick={() => this.Changedate(2, 3)} className={this.state.showActiveDay[2][3] ? "firtDay activeWeek weekpad" : "firtDay weekpad"}  >We</div>
                                        </div>
                                        <div>
                                            <div onClick={() => this.Changedate(2, 4)} className={this.state.showActiveDay[2][4] ? "firtDay activeWeek weekpad" : "firtDay weekpad"}  >Th</div>
                                        </div>

                                        <div>
                                            <div onClick={() => this.Changedate(2, 5)} className={this.state.showActiveDay[2][5] ? "firtDay activeWeek weekpad" : "firtDay weekpad"}  >Fr</div>
                                        </div>

                                        <div>
                                            <div onClick={() => this.Changedate(2, 6)} className={this.state.showActiveDay[2][6] ? "firtDay activeWeek weekpad" : "firtDay weekpad"}  >Sa</div>
                                        </div>
                                        <div>
                                            <div onClick={() => this.Changedate(2, 7)} className={this.state.showActiveDay[2][7] ? "firtDay activeWeek weekpad" : "firtDay weekpad"}  >Su</div>
                                        </div>
                                    </div>
                                    : null}



                                {this.state.SelectedW == 3 ?
                                    <div className="flexDisplay padtop8">
                                        
                                        <div>
                                            <div onClick={() => this.Changedate(3, 1)} className={this.state.showActiveDay[3][1] ? "firtDay activeWeek weekpad" : "firtDay weekpad"}  >Mo</div>
                                        </div>
                                        <div>
                                            <div onClick={() => this.Changedate(3, 2)} className={this.state.showActiveDay[3][2] ? "firtDay activeWeek weekpad" : "firtDay weekpad"}  >Tu</div>
                                        </div>
                                        <div>
                                            <div onClick={() => this.Changedate(3, 3)} className={this.state.showActiveDay[3][3] ? "firtDay activeWeek weekpad" : "firtDay weekpad"}  >We</div>
                                        </div>
                                        <div>
                                            <div onClick={() => this.Changedate(3, 4)} className={this.state.showActiveDay[3][4] ? "firtDay activeWeek weekpad" : "firtDay weekpad"}  >Th</div>
                                        </div>

                                        <div>
                                            <div onClick={() => this.Changedate(3, 5)} className={this.state.showActiveDay[3][5] ? "firtDay activeWeek weekpad" : "firtDay weekpad"}  >Fr</div>
                                        </div>

                                        <div>
                                            <div onClick={() => this.Changedate(3, 6)} className={this.state.showActiveDay[3][6] ? "firtDay activeWeek weekpad" : "firtDay weekpad"}  >Sa</div>
                                        </div>
                                        <div>
                                            <div onClick={() => this.Changedate(3, 7)} className={this.state.showActiveDay[3][7] ? "firtDay activeWeek weekpad" : "firtDay weekpad"}  >Su</div>
                                        </div>
                                    </div>
                                    : null}


                                {this.state.SelectedW == 4 ?
                                    <div className="flexDisplay padtop8">
                                        
                                        <div>
                                            <div onClick={() => this.Changedate(4, 1)} className={this.state.showActiveDay[4][1] ? "firtDay activeWeek weekpad" : "firtDay weekpad"}  >Mo</div>
                                        </div>
                                        <div>
                                            <div onClick={() => this.Changedate(4, 2)} className={this.state.showActiveDay[4][2] ? "firtDay activeWeek weekpad" : "firtDay weekpad"}  >Tu</div>
                                        </div>
                                        <div>
                                            <div onClick={() => this.Changedate(4, 3)} className={this.state.showActiveDay[4][3] ? "firtDay activeWeek weekpad" : "firtDay weekpad"}  >We</div>
                                        </div>
                                        <div>
                                            <div onClick={() => this.Changedate(4, 4)} className={this.state.showActiveDay[4][4] ? "firtDay activeWeek weekpad" : "firtDay weekpad"}  >Th</div>
                                        </div>

                                        <div>
                                            <div onClick={() => this.Changedate(4, 5)} className={this.state.showActiveDay[4][5] ? "firtDay activeWeek weekpad" : "firtDay weekpad"}  >Fr</div>
                                        </div>

                                        <div>
                                            <div onClick={() => this.Changedate(4, 6)} className={this.state.showActiveDay[4][6] ? "firtDay activeWeek weekpad" : "firtDay weekpad"}  >Sa</div>
                                        </div>
                                        <div>
                                            <div onClick={() => this.Changedate(4, 7)} className={this.state.showActiveDay[4][7] ? "firtDay activeWeek weekpad" : "firtDay weekpad"}  >Su</div>
                                        </div>
                                    </div>
                                    : null}


                                {this.state.SelectedW == 5 ?
                                    <div className="flexDisplay padtop8">
                                        
                                        <div>
                                            <div onClick={() => this.Changedate(5, 1)} className={this.state.showActiveDay[5][1] ? "firtDay activeWeek weekpad" : "firtDay weekpad"}  >Mo</div>
                                        </div>
                                        <div>
                                            <div onClick={() => this.Changedate(5, 2)} className={this.state.showActiveDay[5][2] ? "firtDay activeWeek weekpad" : "firtDay weekpad"}  >Tu</div>
                                        </div>
                                        <div>
                                            <div onClick={() => this.Changedate(5, 3)} className={this.state.showActiveDay[5][3] ? "firtDay activeWeek weekpad" : "firtDay weekpad"}  >We</div>
                                        </div>
                                        <div>
                                            <div onClick={() => this.Changedate(5, 4)} className={this.state.showActiveDay[5][4] ? "firtDay activeWeek weekpad" : "firtDay weekpad"}  >Th</div>
                                        </div>

                                        <div>
                                            <div onClick={() => this.Changedate(5, 5)} className={this.state.showActiveDay[5][5] ? "firtDay activeWeek weekpad" : "firtDay weekpad"}  >Fr</div>
                                        </div>

                                        <div>
                                            <div onClick={() => this.Changedate(5, 6)} className={this.state.showActiveDay[5][6] ? "firtDay activeWeek weekpad" : "firtDay weekpad"}  >Sa</div>
                                        </div>
                                        <div>
                                            <div onClick={() => this.Changedate(5, 7)} className={this.state.showActiveDay[5][7] ? "firtDay activeWeek weekpad" : "firtDay weekpad"}  >Su</div>
                                        </div>
                                    </div>
                                    : null}




                            </div>
                        </div>
                    </div>
                    : ''}
            </React.Fragment>
        );
    }
}

export default NextPlan;