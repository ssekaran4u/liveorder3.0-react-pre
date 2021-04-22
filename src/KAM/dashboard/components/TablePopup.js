import React,{Component} from 'react'

class TablePopup extends Component{

    render(){
        return(
            <div className="showtable">
            <table className="trpad">
            <tr >
                <th className="tdpad">Pts(unit)</th>
                <th className="tdpad">Pts(unit)</th>
                <th className="tdpad">Mrp(unit)</th>
                <th className="tdpad">Discount Value</th>
                <th className="tdpad">Packing</th>
              
              </tr>
              <tr >
                <td className="tdpad">101</td>
                <td className="tdpad">Shampoo</td>
                <td className="tdpad">1*10</td>
                <td className="tdpad">abt001</td>
                <td className="tdpad">100+21</td>
                
              </tr>
            </table>
          </div>
        )
    }
}
export default TablePopup