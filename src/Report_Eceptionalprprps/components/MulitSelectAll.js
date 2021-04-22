import React, { useState, useEffect } from "react";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes"

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
      stringvalue= "1";
      stringlabel= "January";
  }
  else if (currentMonth==2) {

    stringvalue=  "2";
    stringlabel= "February"
  }
  else if (currentMonth==3) {
 
    stringvalue=  "3";
    stringlabel= "March"
  }
  else if (currentMonth==4){

    stringvalue= "4";
    stringlabel= "April"
  }
  else if (currentMonth==5){
  
    stringvalue=  "5";
    stringlabel= "May"
  }else if (currentMonth==6){

    stringvalue=  "6";
    stringlabel= "June"
  }else if (currentMonth==7){
 
    stringvalue=  "7";
    stringlabel= "July"
  }else if (currentMonth==8){

    stringvalue=  "8";
    stringlabel= "August"
  }else if (currentMonth==9){
  
    stringvalue=  "9";
    stringlabel= "September"
  }else if (currentMonth==10){

    stringvalue=  "10";
    stringlabel= "October"
  }else if (currentMonth==11){
 
    stringvalue=  "11";
    stringlabel= "November"
  }else if (currentMonth==12){
 
    stringvalue=  "12";
    stringlabel= "December"
  }
    setSelectedOptions([{ label: stringlabel, value: stringvalue, id: currentMonth }]);
    // setSelectedOptions([{ label: "All", value: "*" }, ...options]);
  }, []);

  function getDropdownButtonLabel({ placeholderButtonLabel, value }) {
    if (value && value.some((o) => o.value === "All")) {
      return `${placeholderButtonLabel}: All`;
    } else {
      return `${placeholderButtonLabel}: ${value.length} selected`;
    }
  }

  function onChange(value, event) {
    if (event.action === "select-option" && event.option.value === "All") {
      this.setState(this.options);
    } else if (
      event.action === "deselect-option" &&
      event.option.value === "All"
    ) {
      this.setState([]);
    } else if (event.action === "deselect-option") {
      this.setState(value.filter((o) => o.value !== "All"));
    } else if (value.length === this.options.length - 1) {
      this.setState(this.options);
    } else {
      this.setState(value);
    }
    props.getData(value,event.option.label)
    // console.log(value,"sojan")
    //console.log(props.getData,"all props")
  }

  return (
    <ReactMultiSelectCheckboxes
      options={[{ label: "All", value: "All" }, ...options]}
      placeholderButtonLabel="Month"
    //   getDropdownButtonLabel={getDropdownButtonLabel}
      value={selectedOptions}
      onChange={onChange}
      setState={setSelectedOptions}
    />
  );
};

export default MultiSelectAll;
