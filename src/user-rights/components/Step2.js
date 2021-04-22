import React, { Component } from 'react'

import { Row, Col, Form } from 'react-bootstrap'

import MenuCheckbox from '../components/MenuCheckbox'

import { postToServer } from '../../lib/comm-utils'

import SuccessSave from '../../dcr/popups/successSavePopup'

class Step2 extends Component {

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

      allcheck:false

    }

    this.getData = this.getData.bind(this)

    this.Savemenu=this.Savemenu.bind(this)

    this.closeModal = this.closeModal.bind(this)

    this.handleSearch = this.handleSearch.bind(this)

    this.handleCheck = this.handleCheck.bind(this)

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

  



//Designation={this.state.Designation} Division={this.state.Division}  Region={this.state.Region}

  Savemenu(){
// alert('333');
    //  let list ={}

    //  console.log(this.state.Selectcheck,this.props.fscode)

    //  Object.keys(this.state.Selectcheck).reduce((p,item,index) => { console.log("key",item)

    //   let a = item.split("$")

    //   console.log("it",a[0])

    //   list[a[0]]=true

     

      

    //  })

    // let testa 

    // if(this.state.filtermenu != ""){

    //   testa = this.state.filtermenu

    // }

    // else{

    //   testa = this.state.Selectcheck

    // }

   // console.log("test",testa);

   //Designation={this.state.Designation} Division={this.state.Division}  Region={this.state.Region}

     var data = {

     "index": "DegSaveMenu",

     "Data":  this.state.filtermenu ,

    //  "Header": { "fscode": this.props.fscode,"Des":this.props.Designation,"Div":this.props.Division,"Reg":this.props.Region },
     "Header": {"Des":this.props.Designation,"Div":this.props.Division,"Reg":this.props.Region },

     "Token": ""

   }
   console.log(data,'for save data');

   postToServer("UserRight", data).then((result) => {

    // console.log(result)

    if(result.data.Status == 'Fail'){

    //  alert('fail');

    }else{
// alert('true');
      this.setState({
        sucessModal:true
      })

    }

   }).catch((Error) => {
// alert('catch')
     this.setState({ Error: true, Errormsg: Error })
     // console.log(result)

   })

  }



  componentDidUpdate(oldprops, oldstate) { 

    if (oldprops.Region != this.props.Region  || oldprops.Designation != this.props.Designation  || oldprops.Division != this.props.Division  ) {


      var data = {

        "index": "GetSelectedMenu",

        "Data": { "Region": this.props.Region,"Desc":this.props.Designation  ,"Division": this.props.Division }

      }

      postToServer("UserRight", data).then((result) => {



        if (result.data.Status.trim() == "success") {

          var locl = {}                                                                                                                                                                                                                                                                     

          let name

          result.data["Data"].map((lp) =>{ locl[lp.c_itemid] = true,name=lp.C_Name})
          const k=locl
          var b = Object.assign({}, locl);
          this.setState({                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                                
            Selectcheck: locl,

            cname:name,

            filtermenu:locl,

            defaultselectkey :k,
            
            defaultselectkey1:b
           })

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



  handleCheck( checked){

 

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

      // this.setState({

      //   allcheck:!this.state.allcheck

      // })

      

      //   this.setState({

      //     filtermenu:this.state.defaultselectkey

      //   })

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
         
       }
       this.setState({
         filtermenu:itemval
       }) 
        })

        //console.log("filter",this.state.defaultselect,this.state.filtermenu)

        // let itemvals={}

        // itemvals=allSelectCheck

        // delete itemvals[val.old_url]      

        // console.log("ll",this.state.Selectcheck)  

        

        // this.setState({

        //   filtermenu:this.state.Selectcheck

        // })

        // console.log("false",this.state.Selectcheck)

        //  itemval[val.old_url] = false

        // this.setState({

        //   filtermenu:{}

        // })

         

        

      

    }

   

  }

  render() { 

   

 //const { selectedData } = this.state

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

  //   let filterItems ={}

  // if(this.state.filtermenu != ""){

  //   filterItems = this.state.filtermenu

  // }else{

  //   filterItems = this.state.Selectcheck

  // }

  // if( Object.keys(filterItems).length==0){



  //   

  // }





  

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

                  id={ this.props.code + this.props.id}

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





export default Step2;

