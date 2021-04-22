import React, { Component } from "react";
import {Table} from 'react-bootstrap';

const TableHead = (props) => {
    const { name } = props

}


const TableComp = (props) => {
    const { displayedColumns, data, setSortColumn, sortColumn, sortDown } = props
    let headerRow = displayedColumns.map((name) => {
        name = name.charAt(0).toUpperCase() + name.slice(1)
        let sortClassName = 'fa-sort'
        if (name == sortColumn) {
            sortClassName = sortDown ? 'fa-sort-desc' : 'fa-sort-asc'
        }
        return (
            <th key={name} onClick={() => setSortColumn(name)}>{ name }<span className="ml-2"><i className={`fa ${sortClassName} fa-fw`}></i></span></th>
        )
    })
    let dataRows = data.map((d, i) => {
        let dataColumns = displayedColumns.map((v) => {
            return <td key={v}>{d[v]}</td>
        })
        return (
            <tr key={i} onDoubleClick={() => props.editRow(d)}>
                {dataColumns}
            </tr>
        )
    })
    if (displayedColumns.length == 0)
        return null
    return(
        <div className="datatable">
            <Table responsive >
                <thead>
                    <tr>
                        {headerRow}
                    </tr>
                </thead>
                <tbody>
                {dataRows}
                </tbody>
            </Table>
        </div>
    )
}

export default TableComp;