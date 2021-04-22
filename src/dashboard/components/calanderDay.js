import React, { Component } from "react";
import { connect } from "react-redux";
import "./calendar.css";
import { getCompletedTask } from "../../actions/calendar";

class Day extends Component {
    constructor(props) {
        super(props);
        this.state = {
            completedTask:'',
            hdate:'',
            
        };
        this.selectDate = this.selectDate.bind(this);
       ///this.getCompletedList = this.getCompletedList.bind(this)
        this.getDcrFilled = this.getDcrFilled.bind(this)
        this.getDate = this.getDate.bind(this)
       /// this.gePrevtDate = this.gePrevtDate.bind(this)
    }
    componentDidMount() {
     //   this.getCompletedList();
        //this.getDcrFilled()
        this.gePrevtDate()
    }
    // getCompletedList() {
    //     var data = {
    //         index: "DCRDetails",
    //         Result: "0",
           
    //         ColumnName: ""
           
    //     };
    //     this.props.getCompletedTask(data);
    // }
    // static getDerivedStateFromProps(nextProps, prevState) {
    //     if (prevState.completedTask !== nextProps.completedTask) {
    //          //console.log("props",nextProps.completedTask);
    //         return { ...prevState, completedTask: nextProps.completedTask };
    //     }
       
    //     return null;
    // }

    selectDate() {
        this.props.getSelectedDate(event.target.id);
    }
    getDcrFilled(){
      //  console.log("task",this.state.completedTask)
    }
    getDate(redate){ 
        let testdate = new Date(redate)
        var date = testdate;
       
        var monthd = ''
        let daynotmiss = ''
        if((testdate.getMonth()+1) < 10){
            monthd = '0'+(testdate.getMonth()+1)
        }else{
            monthd=testdate.getMonth()+1
        }
        if(testdate.getDate() < 10){
            daynotmiss = '0'+testdate.getDate()
        }else{
            daynotmiss = testdate.getDate()
        }
        var newdate = monthd + '/' + daynotmiss + '/' + testdate.getFullYear();
      //  var newdate = datearray[1] + '/' + datearray[0] + '/' + datearray[2];
        //console.log("pp",testdate.getDate())
        return newdate
    }
    
    gePrevtDate(redate){ 
        let pk =[]
        var d = new Date();
        var n = d.getDate();
        var m = d.getMonth()+1
        var y = d.getFullYear()
       var mon = d.getMonth()
    var sundays = [];

    for (var i = 0; i <= new Date(y, mon, 0).getDate(); i++) 
    {    
        var date = new Date(y, mon, i);
        
    
        if (date.getDay() == 0)
        {
            let hday = new Date(date)
    
            
    var monthvar = ''
    var dayvar = ''

    if((hday.getMonth()+1)<10){
            monthvar = '0'+(hday.getMonth()+1)
    }else{
        monthvar = hday.getMonth()+1
    }

    
    if(hday.getDate()<10){
        dayvar = '0'+hday.getDate()
    }else{
        dayvar = hday.getDate()
    }
    
            var hdaynewdate = monthvar + '/' + dayvar + '/' + hday.getFullYear();
            sundays.push({
                holidayDate:hdaynewdate
            });    
        }
    };

        for(let i=1;i<n;i++){
        
        let holiday= d.getDay();
        let month=''
        let day=''

            if(m < 10){
                month='0'+m
            }else{
                month=m
            }
            

            if(i < 10){

                day='0'+i
            }else{

                day=i
            }
             let cDate =  month +"/"+ day +"/"+y
            //console.log( "aa",cDate)
            
             pk.push({
                 cdate:cDate})  
    
        }
                   
        this.setState({
                  mdate:pk,
                  hdate:sundays
             })
       
    }
    render() { 

        const {
            day: { date, isCurrentMonth, isToday, selectedDate, number }
        } = this.props;
        if(!this.props.completedTask || !this.state.mdate || !this.state.hdate){
            return null
        }

          let ck={}
        

          this.state.mdate.map((t) =>{
            ck[t.cdate] = "missed";
          
          })
          this.props.completedTask.map((k)=>{
          
          ck[this.getDate(k.ReportedDate)]="not missed"
        
          })
          this.state.hdate.map((p) =>{
            ck[p.holidayDate] = "holiday";
          
          })
        //  console.log("cl",ck)
        
        return (
            <div
                className={
                    "cal-day " +
                    (isToday ? "today " : "") +
                    (selectedDate == number ? "selected" : "") +
                    (isCurrentMonth ? "" : "different-month")
                }
            >
                <button
                    className="cal-date"
                    disabled={isCurrentMonth ? false : true}
                    onClick={this.selectDate}
                    id={number}
                >
                    {number}
                </button>
                <div className="event">
                    
                {Object.keys(ck).map((event, index) => 
                    ck[event]=="not missed" ? 
                        <div
                            key={index}
                            className={date.isSame(event) ? "dcr-filled" : null}
                        />
          
                    : ck[event]=="holiday"   ?
                        <div
                        key={index}
                        className={date.isSame(event) ? "holiday" : null}
                        />
                    : ck[event]=="missed" || ck[event]!="holiday" ?
                        <div
                            key={index}
                            className={date.isSame(event) ? "dcr-missed" : null}
                        /> :'null'
                    ) 
                }
                   
                </div>
            </div>
        );
    }
}
// const mapStateToProps = state => ({
//     completedTask: state.Calendar.completedTask,
    
// });

// const mapDispatchToProps = dispatch => ({
//     getCompletedTask: data => dispatch(getCompletedTask(data))
    
// });

export default Day