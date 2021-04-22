import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import { InputGroup, FormControl, Button, Table } from 'react-bootstrap';
import CalenderTable from "./CalenderTable";
import moment from 'moment';
import TourPlan from '../../mr_module/components/tourPlan'

function NewTpCalander(props){
    return (
            <div className="mr-calender">
                
               <TourPlan  mtpType="manager" mdate={localStorage.getItem("mtpdate")}/>
            </div>
        )
  
}

export default NewTpCalander;