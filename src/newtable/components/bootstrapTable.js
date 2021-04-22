import React from 'react'
import { Table } from 'react-bootstrap'
import {postToServer} from '../../lib/comm-utils'
import Loder from  '../../lib/Loader'


class BootstrapTable extends React.Component{

    // render(){
    //     return(
    //         <div>
    //             <div className="row">
    //                 <div className="col-md-8 offset-md-2">
    //                     <br /><br />
    //                     <h3>Bootstrap Table Example</h3><br />

    //                     <Table striped bordered hover responsive="md">
    //                         <thead>
    //                             <tr>
    //                                 <th>No.</th>
    //                                 <th>Product</th>
    //                                 <th colSpan="2">Quantity</th>
    //                                 <th>Price</th>
    //                             </tr>
    //                             <tr>
    //                                 <th></th>
    //                                 <th></th>
    //                                 <th >Quantity1</th>
    //                                 <th >Quantity2</th>
    //                                 <th></th>
    //                             </tr>
    //                         </thead>
                          
    //                         <tbody>
    //                             <tr>
    //                                 <td>1</td>
    //                                 <td>Shirt</td>
    //                                 <td>2</td>
    //                                 <td>$200</td>
    //                             </tr>
    //                             <tr>
    //                                 <td>2</td>
    //                                 <td>T-shirt</td>
    //                                 <td>1</td>
    //                                 <td>$100</td>
    //                             </tr>
    //                             <tr>
    //                                 <td>2</td>
    //                                 <td>Pant</td>
    //                                 <td>1</td>
    //                                 <td>$300</td>
    //                             </tr>
    //                             <tr>
    //                                 <td colSpan="3">Total Price</td>
    //                                 <td>$600</td>
    //                             </tr>
    //                         </tbody>
    //                     </Table> 
    //                 </div>
    //             </div>
    //         </div>
    //     )
    
    }

export default BootstrapTable;