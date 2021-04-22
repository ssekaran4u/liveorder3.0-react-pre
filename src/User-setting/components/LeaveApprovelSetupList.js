import React,{useEffect,useState} from 'react'
import CustomTable from './CustomTable'
import DCRUnlockFormPopup from '../popup/DCRUnlockFormPopup'
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import {postToServer} from '../../lib/comm-utils'

const LeaveApprovelSetupList=(props)=>{
    const [header, setHeader] = useState([])
    const [body, setBody] = useState([])
    const [dcrUnlockForm,setDcrUnlockForm] = useState(false)

    const handleAction=(id)=>{
      //  console.log(id.target.id,'taget')
       alert(id.target.id)
       let body =[]
        let test2=[];
       var data = {"Index":"DeleteSetupID","Token":"", "Data": {"Id":id.target.id}}
        
            postToServer("LeaveApprovelSetup", data).then( (result)=> { 
                if(result){ 
                    var    travelModes={ "Index": "SetupList",  data:{}}
                    postToServer("LeaveApprovelSetup", travelModes).then((Result) => {
                        // console.log(Result)
                        // console.log(Result.data.Status,'status')
                        // console.log(Result.data.data,'data')
                        if (Result.data.Status == 'Success') {  
                            Result.data.data.map((item2,index) => {
            
                                test2.push({
                                    "action" : '1',
                                    "delete" : '2',
                                    "SetupId" : item2['SetUpId'],
                                    "Designation" : item2['Designation'],
                                    "Fieldstaffname" : <div className="note-text">{item2['FsName']}</div>,
                                    "lockdays" : item2['LockDays'],
                                    action:
                        <div>
                        {
                          
                            <div>
                              <Link
                                to={{
                                  pathname: "/LeaveApprovelSetupSave",
                                  EditViewData: {
                                      id:item2['SetUpId'],
                                      design:item2['Designation'],
                                      mode:'Edit'
                                  }
                                
                                }}>
                                <img
                                  className="img action-img"
                                  src="../public/assets/images/edit_icon.svg"
                                  
                                />
                              </Link>
                              
                            </div>
                           
                        }
                      </div>,
                      delete:
                      <div>
                      {
                        
                          <div>
                           
                            <img src="../public/assets/images/delete.png" id={item2['SetUpId']} className="hcursur" onClick={handleAction}/>
                            
                            
                          </div>
                         
                      }
                    </div>
                                })
                            })
                            setBody(test2)
                        }
                    })
                }
    
            }).catch((Error)=> {
                this.setState({ Error: true, Errormsg: Error })
            }  )

    }

    useEffect(()=>{
        let header=[]

        let body =[]
        let test2=[];
        header.push({ prop: "action", title: ""})
        header.push({ prop: "delete", title: "", filterable: false, sortable: false })
        header.push({ prop: "SetupId", title: "Setup Id", filterable: true, sortable: true })
        header.push({ prop: "Designation", title: "Designation", filterable: true, sortable: false })
        header.push({ prop: "Fieldstaffname", title: "Field Staff Name/s", filterable: true, sortable: false })
        header.push({ prop: "lockdays", title: "Lock Days", filterable: true, sortable: false })
        setHeader(header)
        var    travelModes={ "Index": "SetupList",  data:{}}
        postToServer("LeaveApprovelSetup", travelModes).then((Result) => {
            // console.log(Result)
            // console.log(Result.data.Status,'status')
            // console.log(Result.data.data,'data')
            if (Result.data.Status == 'Success') {  
                Result.data.data.map((item2,index) => {

                    test2.push({
                        "action" : '1',
                        "delete" : '2',
                        "SetupId" : item2['SetUpId'],
                        "Designation" : item2['Designation'],
                        "Fieldstaffname" : <div className="note-text">{item2['FsName']}</div>,
                        "lockdays" : item2['LockDays'],
                        action:
            <div>
            {
              
                <div>
                  <Link
                    to={{
                      pathname: "/LeaveApprovelSetupSave",
                      EditViewData: {
                          id:item2['SetUpId'],
                          design:item2['Designation'],
                          mode:'Edit'
                      }
                    
                    }}>
                    <img
                      className="img action-img"
                      src="../public/assets/images/edit_icon.svg"
                      
                    />
                  </Link>
                  
                </div>
               
            }
          </div>,
          delete:
          <div>
          {
            
              <div>
               
                <img src="../public/assets/images/delete.png" id={item2['SetUpId']} className="hcursur" onClick={handleAction}/>
                
                
              </div>
             
          }
        </div>
                    })
                })
                setBody(test2)
            }
        })
        // this.setState({ body: test2 })
        // body=[
        //     {"action":"action","delete":"action","SetupId":"1","Designation":"Srinivas","Fieldstaffname":"11-AUG-21","lockdays":"2"},
        //     {"action":"action","delete":"action","SetupId":"2","Designation":"Srinivas","Fieldstaffname":"12-AUG-21","lockdays":"3"},
        //     {"action":"action","delete":"action","SetupId":"3","Designation":"Srinivas","Fieldstaffname":"13-AUG-21","lockdays":"2"},
        //     {"action":"action","delete":"action","SetupId":"4","Designation":"Srinivas","Fieldstaffname":"14-AUG-21","lockdays":"4"},
        //     {"action":"action","delete":"action","SetupId":"5","Designation":"Srinivas","Fieldstaffname":"15-AUG-21","lockdays":"6"},
        //     {"action":"action","delete":"action","SetupId":"6","Designation":"Srinivas","Fieldstaffname":"16-AUG-21","lockdays":"1"},
        // ]
        // body.map((item)=>{
        //     item.action =
        //     <div>
        //     {
              
        //         <div>
        //           <Link
        //             to={{
        //               pathname: "/LeaveApprovelSetupSave",
        //               EditViewData: {
        //                   id:'2',
        //                   mode:'Edit'
        //               }
                    
        //             }}>
        //             <img
        //               className="img action-img"
        //               src="../public/assets/images/edit_icon.svg"
                      
        //             />
        //           </Link>
                  
        //         </div>
               
        //     }
        //   </div>
        
        // })
        // body.map((item)=>{
        //     item.delete = <img src="../public/assets/images/delete.png" id='22' className="hcursur" onClick={handleAction}/>
        // })
        setBody(body)
    },[])

    const customLabels = {
        first: "<<",
        last: ">>",
        prev: "< Prev",
        next: "Next >",
        show: "Show",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
        entries: "items/page",
        filterPlaceholder: "Search",
        noResults: "There is no data to be displayed"
    };
    const closeModal=()=>{
        setDcrUnlockForm(false)
    }

    return(
        <div>
            <CustomTable
                // tempdata={this.state.data}
                tableHeader={header}
                tableBody={body}
                keyName="userTable"
                tableClass="striped hover table-responsive"
                rowsPerPage={10}
                rowsPerPageOption={[10, 20, 50, 100, 200]}
                initialSort={{ prop: "username", isAscending: true, }}
                labels={customLabels}
                type="leave"
                   
            />
            <DCRUnlockFormPopup 
                show={dcrUnlockForm} 
               
                onHide={()=>closeModal()}
            />
        </div>
    )
}

export default LeaveApprovelSetupList