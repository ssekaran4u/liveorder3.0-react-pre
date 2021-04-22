import React,{Component} from "react";

class DoctorInfo extends Component{
    constructor(props){
        super(props)
        this.state = {
           
        }
       // this.showLocation = this.showLocation.bind(this)
    }
    showLocation(areaname){
        window.open('https://www.google.com/maps/place/' + areaname, '_blank');
      }

    render(){
    const { DocterDetails } = this.props;

  
    if (DocterDetails.length == 0) return null;
   
    return (
        <div className="visit-container">
            <div className="">
                <div className="display-inline">
                    <div className="imageanddetail">
                        <div className="imagedotcon">
                            <div className="greendot" />
                            {DocterDetails[0].DSCType == 'Doctor' ? 
                            <img
                                            className="innerframe"
                                            src="../public/assets/images/Doctormale@3x.png"
                                        />:
                                        <img
                                        className="innerframe"
                                        src="../public/assets/images/Chemist@3x.png"
                                    />}
                            <img
                                className="frame"
                                src="../public/assets/images/dr_frame.png"
                            />
                            <img
                                className="diamond"
                                src="../public/assets/images/diamond.png"
                            />
                        </div>
                    </div>
                    <div className="imagenamebox1 pb-0">
                        <div className="nopad0 dr_name">
                            {DocterDetails[0].DSCType == 'Doctor' ? "Dr." : null} {DocterDetails[0].DSCName}
                        </div>
                        <div className="nopad0 inline-blk">
                            <div className="drrectac">
                                {DocterDetails[0].DSCcode}
                            </div>
                        </div>
                        <div className="nopad0 docdetail">
                            {DocterDetails[0].Category}
                        </div>
                        <div className="nopad0 docdetail">
                            {DocterDetails[0].DSCQualification}
                        </div>
                        <div className="nopad0 markerdetail" >
                            <i
                                className="fa fa-map-marker"
                                aria-hidden="true"
                            />{" "}
                            <span onClick={()=>this.showLocation(DocterDetails[0].AreaName)}>{DocterDetails[0].AreaName}(
                            {DocterDetails[0].SubareName})</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    }
}

export default DoctorInfo;
