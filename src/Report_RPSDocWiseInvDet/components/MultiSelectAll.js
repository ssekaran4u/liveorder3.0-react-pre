import React, { useState, useEffect } from "react";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";

import options from "./data";

const MultiSelectAll = (props) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  
  useEffect(() => {
    let date1 = new Date();
    let currentMonth = date1.getMonth();
    currentMonth=currentMonth+1;
    // alert(currentMonth);
    let stringvalue="";
    let stringlabel="";
    if(currentMonth==1)
    {
      stringvalue= "9ce42304-b732-4791-9731-6f299b6df8c7";
      stringlabel= "January";
  }
  else if (currentMonth==2) {

    stringvalue=  "90419f06-7d07-45c8-bcec-d675096fe27f";
    stringlabel= "February"
  }
  else if (currentMonth==3) {
 
    stringvalue=  "a23521da-0a48-4ef6-baa2-d727704f65c2";
    stringlabel= "March"
  }
  else if (currentMonth==4){

    stringvalue= "34b2b58a-0123-49e2-b2de-1eef0922139b";
    stringlabel= "April"
  }
  else if (currentMonth==5){
  
    stringvalue=  "0fceaec7-fb46-4aef-994b-863a97130168";
    stringlabel= "May"
  }else if (currentMonth==6){

    stringvalue=  "b68c6b76-bbe0-49a6-8a90-209b8d88d353";
    stringlabel= "June"
  }else if (currentMonth==7){
 
    stringvalue=  "e2829c11-0960-490c-b19b-5c5bb26a18ce";
    stringlabel= "July"
  }else if (currentMonth==8){

    stringvalue=  "841e6f9f-1e19-4501-8b75-cd153282ed21";
    stringlabel= "August"
  }else if (currentMonth==9){
  
    stringvalue=  "9346ba4b-8b3e-4c06-b930-cb3d98c58890";
    stringlabel= "September"
  }else if (currentMonth==10){

    stringvalue=  "7294d507-d6c5-47bf-8ef3-c291c273b647";
    stringlabel= "October"
  }else if (currentMonth==11){
 
    stringvalue=  "451d4254-a882-4d53-a4ca-c7cb4707d1a5";
    stringlabel= "November"
  }else if (currentMonth==12){
 
    stringvalue=  "2378fade-f686-4f0d-bf00-4e5213032c9b";
    stringlabel= "December"
  }
    setSelectedOptions([{ label: stringlabel, value: stringvalue, id: currentMonth }]);
  }, []);

  function getDropdownButtonLabel({ placeholderButtonLabel, value }) {
    if (value && value.some((o) => o.value === "*")) {
      return `${placeholderButtonLabel}: All`;
    } else {
      return `${placeholderButtonLabel}: ${value.length} selected`;
    }
  }

  function onChange(value, event) {
    if (event.action === "select-option" && event.option.value === "*") {
      this.setState(this.options);
    } else if (
      event.action === "deselect-option" &&
      event.option.value === "*"
    ) {
      this.setState([]);
    } else if (event.action === "deselect-option") {
      this.setState(value.filter((o) => o.value !== "*"));
    } else if (value.length === this.options.length - 1) {
      this.setState(this.options);
    } else {
      this.setState(value);
    }
    props.getData(value,event.option.label)
    // console.log(value,"sojan")
    console.log(props.getData,"all props")
  }

  return (
    <ReactMultiSelectCheckboxes
      options={[{ label: "All", value: "*" }, ...options]}
      placeholderButtonLabel="Month"
    //   getDropdownButtonLabel={getDropdownButtonLabel}
      value={selectedOptions}
      onChange={onChange}
      setState={setSelectedOptions}
    />
  );
};

export default MultiSelectAll;
