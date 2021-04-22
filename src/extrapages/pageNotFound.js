import React, {Component} from 'react';
import '../../public/assets/css/bootstrap.min.css'
import '../../public/assets/css/style.css'
import '../../public/assets/css/responsive.css'


class pageNotFound extends Component{
    render(){
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="mobile404">
                        <div className="cycle">
                            <div className="col-xl-12 col-md-12 col-sm-12 col-xs-12 text-center">
                                <img className="img-fluid" src="../../public/assets/images/404f.png"/>
                            </div>
                        </div>
                    </div>
                    
                    {/* <div className="col-xl-12 col-md-12 col-sm-12 col-xs-12 pagetitle">
                        <p className="error404">Page Not Found</p>
                    </div> */}
                </div>
            </div>
        )
    }
}
export default pageNotFound