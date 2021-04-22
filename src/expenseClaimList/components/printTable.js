import React, { Component } from "react";
import Card from "react-bootstrap/Card";

class PrintTable extends Component{
    render(){
        return(
            <Card className="print-table-card">
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Name</th>
                        <th>Age</th>
                    </tr>
                    <tr>
                        <td>Kumar Madhu T M</td>
                        <td>16</td>
                        <td>Kumar Madhu T M</td>
                        <td>12</td>
                    </tr>
                    {/* <tr>
                        <td>Chaithra K</td>
                        <td>23</td>
                        <td>Chaithra K</td>
                        <td>23</td>
                    </tr> */}
                    <tr><div>kumar madhu</div></tr>
                </table>
            </Card>
        )
    }
}

export default PrintTable;