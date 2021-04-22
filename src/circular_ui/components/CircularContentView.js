import React from "react";
import { postToServer } from '../../lib/comm-utils'
import Loader from '../../lib/Loader'
class CircularContentView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            imaggedata:'',
            video:'',
            pdf:'',
            loader:false
        };
    }

    componentDidUpdate(prevProps, prevState) {
         if(this.props.filename!= prevProps.filename){
           



            const _this=this


             if(_this.state.loader==false){
            _this.setState({loader:true })
             var data = {"Index":"getImageString" ,data:{"c_filename":_this.props.filename } }
        
        postToServer("Circular", data)
            .then(function (result) {
            //this.setState({imaggedata:result})
            sessionStorage.setItem("Circular","false")

            var l =[]

            l=result.data.split('|')
            if(l.length > 1){



               
                var datatype= l[1].split('.')
                if  (datatype[1]){


                    if  (datatype[1]=="jpg" || datatype[1]=="png"   ){
                        _this.setState({imaggedata:l[0],imageshow:true,pdf:'',video:''  ,loader:false })
                    }

                    if  (datatype[1]=="pdf"  ){
                       
                        const dataval=l[0]

                        _this.setState({pdf:dataval ,video:'',imaggedata:'',loader:false })
                       
                      


                        }
                        if  (datatype[1]=="mp4"  ){
                           

                             const dataval=l[0]

                             _this.setState({video:dataval,pdf:'',imaggedata:'',loader:false })
                           
                        }
                        //mp4

                        //alert(datatype[1])
                }


               
                
            }
           
            })

         }
        }
    }

    render() {

       console.log( this.state.pdf)
        return (
            <div>
                 <Loader show={this.state.loader} ></Loader>
                {this.state.imaggedata.length ?  <div>
          
                   
                     <img  src={`data:image/jpeg;base64,${this.state.imaggedata}`} style={{"width":"100%"}}/>
                   
              
        </div> :null}


       {this.state.video.length > 1?   <div>
        <video   autoplay controls width="100%" height="100%"  src={"data:video/mp4;base64,"+this.state.video }> Your browser does not support HTML5 video </video> 
                            
        </div>:null}


    {
        this.state.pdf.length>1 ?
      
       <object width="100%" height="500px"      data= {"data:application/pdf;base64,"+this.state.pdf}
       
        type="application/pdf" class="internal">
        <embed  width="100%" height="500px"  src= {"data:application/pdf;base64"+this.state.pdf } type="application/pdf"></embed>
        </object> :null 
    }




            </div>
        );
    }
}
export default CircularContentView;
