import React, { Component } from 'react'
import { Row, Col, Form } from 'react-bootstrap'
import MenuCheckbox from '../components/MenuCheckbox'
import { postToServer } from '../../lib/comm-utils'
import SuccessSave from '../../dcr/popups/successSavePopup'
class Step1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedData: {},
      data: {},
      menuchecked: {},
      Selectcheck: {},
      sucessModal:false,
      closeModal:true,
      check:{},
      filterResult:[],
      filtermenu:[],
      SelectItem:{},
      defaultselectkey:{},
      allcheck:false,
      testdata:{},
      defaultselectkey1:{},

      clear:false

    }
    this.getData = this.getData.bind(this)
    this.Savemenu=this.Savemenu.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleCheck = this.handleCheck.bind(this)
    this.handleTotal =this.handleTotal.bind(this)
  }
  getData(id, name, checked, item) { 
    let k={} 
    k=this.state.filtermenu
   
    if(checked){
    k[id]=true
    
    }else{ 
      
      delete k[id]
    }
    this.setState({ filtermenu:k })
  }
  


  Savemenu(){
    if(this.props.fscode=="")
    {
      alert('Please Select FS Name and User Id')
    }
    else if(this.state.filtermenu=="")
    {
      alert('Please Select Menu for Save')
    }
    else{
     var data = {
     "index": "SaveMenu",
     "Data":  this.state.filtermenu ,
     "Header": { "fscode": this.props.fscodemain },
     "Token": ""
   }
     console.log(data,'save menu')
   postToServer("UserRight", data).then((result) => {
    // console.log(result)
    if(result.data.Status == 'Fail'){
     
    }else{
      this.setState({
        sucessModal:true,
        clear: !this.state.clear
      })
    }
   }).catch((Error) => {
     this.setState({ Error: true, Errormsg: Error })
     // console.log(result)
   })

   var data = {
    "index": "Fsmenu",
    "Data": { "fscode": '' },
    "Token": ""
  }
//  console.log(data,'go click')
  // postToServer("UserRight", data).then((result) => {

  //   if (result.data.Status.trim() == "success") {
  //     let locl = {}
  //     let name=''
      
  //     result.data["Data"].map((lp) =>{ locl[lp.old_url] = true,name=lp.C_Name})
  //     const k=locl
  //     var b = Object.assign({}, locl);
  //     this.setState({ 
  //       Selectcheck: locl,
  //       cname:name,
  //       filtermenu:k,
  //       defaultselectkey :k,
  //       defaultselectkey1:b
  //      })
  //     //  this.props.getItem(name)
  //   }
  // }).catch((Error) => {
  //   this.setState({ Error: true, Errormsg: Error })
  //   // console.log(result)
  // })
  this.props.getItem(name)
  // this.props.SaveOnClear(this.state.clear)
}
   
  }

  componentDidUpdate(oldprops, oldstate) { 
    console.log(oldprops.fscode+'old' ,this.props.fscode+'new')
    if (oldprops.fscode != this.props.fscode) {
// console.log(this.props.fscode,'pubg')
      var data = {
        "index": "Fsmenu",
        "Data": { "fscode": this.props.fscode },
        "Token": ""
      }
    //  console.log(data,'go click')
      postToServer("UserRight", data).then((result) => {

        if (result.data.Status.trim() == "success") {
          let locl = {}
          let name=''
          
          result.data["Data"].map((lp) =>{ locl[lp.old_url] = true,name=lp.C_Name})
          const k=locl
          var b = Object.assign({}, locl);
          this.setState({ 
            Selectcheck: locl,
            cname:name,
            filtermenu:k,
            defaultselectkey :k,
            defaultselectkey1:b
           })
           this.props.getItem(name)
        }

        // this.setState({
        //     selectedMenu:result.data.Data
        // })


      }).catch((Error) => {
        this.setState({ Error: true, Errormsg: Error })
        // console.log(result)
      })


    }

    
    if(oldprops.id != this.props.id){ 
     
      this.setState({
        serachval:'',
        filterResult:[],
        allcheck:false
      })
    }
    // else{
    //   this.setState({
    //     serachval:this.state.serachval,
    //     filterResult:this.state.filterResult,
    //     allcheck:!this.state.allcheck
    //   })
    // }
    
  }
  handleChange() {
    tempdata = []
    if (this.props.data) {
      this.props.data.map((item) => {
        if (item.n_id == this.props.id) {
          // console.log('raw data',item.n_id,item)
          tempdata.push(item.old_url)
        }
      })
    }
  }
  closeModal(){
    this.setState({ sucessModal: false });
    // window.location.reload(); 
  }
  handleSearch(){ 
    let filteredSuggestions
    let value = event.target.value
    this.setState({
      serachval:value
    })
    filteredSuggestions = this.props.iconval.filter(
      suggestion => suggestion.c_name.toLowerCase().indexOf(value.toLowerCase()) > -1
    );
    this.setState({
      filterResult:filteredSuggestions
    })

  }
  handleTotal(){
    this.setState({
      adata:this.state.filtermenu
    })
  }

  handleCheck( checked){
  //   let checkval = event.target.checked;
   
  //   if(checkval==true){
  //     //let itemval={}
  //       // let itemval=this.state.filtermenu
  //       let itemval=[]
  //    this.setState({
  //      allcheck:!this.state.allcheck
  //    })
  //   this.props.iconval.map((val) => { 
  //   //  console.log(this.props.id , val.n_menu_id)
     
      
  //  if(this.props.id == val.n_menu_id)
  //  {
     
  //       itemval[val.old_url] = true
  //  }else{
  //    if(this.state.Selectcheck[val.old_url]){
  //       itemval[val.old_url] = true
  //    }
  //    else{
  //     itemval[val.old_url] = true
  //    }
  //  }
       
       
      
  //     //}
      
  //   })
   
  //   this.setState({
  //     filtermenu:itemval
  //   })
  // }


  //   if(checkval==false){ 
  //   // let itemval=this.state.filtermenu
  //   let itemval=[]
  //     this.setState({
  //       allcheck:!this.state.allcheck
  //     })

     
  //     this.props.iconval.map((val) => { 
  //      if(this.props.id == val.n_menu_id)
  //      {
         
  //      if(!this.state.defaultselectkey1[val.old_url]){ 
  //          delete itemval[val.old_url] 
  //       }
         
  //      }
  //      this.setState({
  //        filtermenu:itemval
  //      }) 
  //       })
       
  //   }
   
  let checkval = event.target.checked;
   
  if(checkval==true){
    //let itemval={}
      let itemval=this.state.filtermenu
   this.setState({
     allcheck:!this.state.allcheck
   })
  this.props.iconval.map((val) => { 
  //  console.log(this.props.id , val.n_menu_id)
   
    
 if(this.props.id == val.n_menu_id)
 {
   
      itemval[val.old_url] = true
 }else{
   if(this.state.Selectcheck[val.old_url]){
      itemval[val.old_url] = true
   }
 }
     
     
    
    //}
    
  })
 
  this.setState({
    filtermenu:itemval
  })
}


  if(checkval==false){ 
  let itemval=this.state.filtermenu
    this.setState({
      allcheck:!this.state.allcheck
    })

   
    this.props.iconval.map((val) => { 
     if(this.props.id == val.n_menu_id)
     {
       
     if(!this.state.defaultselectkey1[val.old_url]){ 
    //   alert('kunal sinha')
         delete itemval[val.old_url] 
      }
      else{
        delete itemval[val.old_url] 
      }
       
     }
     this.setState({
       filtermenu:itemval
     }) 
      })
     
  }
  }
  render() { 
    if (!this.props.iconval || !this.state.filtermenu)
      return null

      let sub_menus = []
      if(this.state.filterResult != ""){
        this.state.filterResult.map((item) => {
          if (item.n_menu_id == this.props.id) {
            sub_menus.push({
              uid: item.old_url,
              id: item.n_menu_id,
              name: item.c_name
            })
    
          }
    
        })
      }else{
      this.props.iconval.map((item) => {
        if (item.n_menu_id == this.props.id) {
          sub_menus.push({
            uid: item.old_url,
            id: item.n_menu_id,
            name: item.c_name
          })
  
        }
  
      })
    }
 


  
    const items = sub_menus.reduce((prev, item, index) => {
    const id = item.uid+'$'+this.state.cname
    
    //  const selection = selectedData[id] ? selectedData[id] : false
      //  const selection = this.props.Selectcheck[this.props.id] ?this.props.Selectcheck[this.props.id] : false

      prev.push(
        <Col lg={3} md={3} sm={6} xs={12} key={index}>
          <div className="user-checkbox" >
            <MenuCheckbox
              Selectcheck={this.state.filtermenu}
              key={index + this.state.cname}
              getData={this.getData.bind(this)}
              clear={this.state.clear}
            //  selection={selection}
              id={id }
              item={item}
              uid={item.uid}
            />
          </div>
        </Col>
      )
      return prev
    }, [])
    return (

      <div className="mainBoxDiv">
        <div className="bBorder flex-row">
          <div className="mainMenu">{this.props.mainmenu}</div>
          <div className="flexDisplay">
            <div className="selectall flexDisplay">
              <div>
                <Form.Check 
                  custom
                  inline
                  type="checkbox"
                  id={this.props.code + this.props.id}
                  label="Select All"
                  checked={this.state.allcheck}
                  className="selectaltext"
                  onChange={this.handleCheck}
                />
              </div>
             
            </div>
            <div>
              <input 
                className="searchuser"
                placeholder="Search"  
                onChange={this.handleSearch}
                value={this.state.serachval} 
              />
            </div>
          </div>
        </div>
        <div className="flex-row pd-bt2">
          <div className="pd-25">
            <Row>

              {items}

            </Row>
          </div>

        </div>
        {this.props.lastitem == this.props.mainmenu ?
          <div onClick={this.Savemenu} className="saveMultipleBtn">Save</div> : ''}
          <SuccessSave show={this.state.sucessModal} Msg="hello" closeModal={this.closeModal} />
      </div>
    );

  }
}


export default Step1;