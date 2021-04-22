import React,{Component} from 'react'
import TableColumn from '../components/TableColumn'

class TableRow extends Component{
    constructor(props){
        super(props)
        this.state={
            showSubdiv:false,
            expandedRows:[],
        }
        this.showRow = this.showRow.bind(this)
        this.renderItem = this.renderItem.bind(this)
    }
    
    showRow(rowId,showstate){
        this.setState({
          showSubdiv:showstate
        })
        const currentExpandedRows = this.state.expandedRows;
        const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);
        const newExpandedRows = isRowCurrentlyExpanded ? 
          currentExpandedRows.filter(id => id !== rowId) : 
          currentExpandedRows.concat(rowId);
          this.setState({expandedRows : newExpandedRows});
      }

    renderItem(item) {
        //  const clickCallback = () => this.showRow(item.id);
          const itemRows = [
        <tr  key={"row-data-" + item.id}>
            <td><div className="flexDisplay"><div className="kwhitecircle mt15"></div><img src="../public/assets/images/product.png" className="proimg" /></div></td>
            <td>{item.date}</td>
            <td>{item.realname}</td>
            <td>{item.realnameuppercase}</td>	
            <td>{item.batch}</td>
            <td>{item.scheme}</td>
            <td>{item.expdate}</td>
            <td>{item.Qty}</td>
            <TableColumn price={item.price} id={item.id} showRow={this.showRow}/>
        </tr>
          ];
          
          if(this.state.expandedRows.includes(item.id)) {
              itemRows.push(
                  <tr key={"row-expanded-" + item.id} style={{backgroundColor:"#f2f2f2"}}>
                    <td></td>
                      <td>
                        <div>pts(unit)</div>
                        <div className="grayColor">{item.pts}</div>
                      </td>
                      <td>
                       
                        <div>ptr(unit)</div>
                        <div className="grayColor"> {item.points}</div>
                      </td>
                      <td>
                        <div>MRP(unit)</div>
                        <div className="grayColor">{item.percent}</div>
                      </td>
                      <td>
                        <div>Discount Value</div>
                        <div className="grayColor">{item.percent}</div>
                      </td>
                      <td>
                        <div>packing</div>
                        <div className="grayColor">{item.packing}</div>
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                  </tr>
              );                                                
          }                                                                             
          
          return itemRows;                                                  
        }
    
    render(){ 
      // console.log("sweta",this.props.data)
    let allItemRows = [];
    this.props.data.forEach(item => {
        const perItemRows = this.renderItem(item);
        allItemRows = allItemRows.concat(perItemRows);
    });                                                                   
              
        return(
         <tbody>
              {allItemRows}
        </tbody>
        )
    }
}
export default TableRow