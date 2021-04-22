import React, { useEffect, useState, Component } from 'react'
import DownloadDocumentListTable from './DownloadDocumentListTable'
import { postToServer } from '../../../lib/comm-utils'
import { URL_BASE } from '../../../lib/constants'
import axios from 'axios'
import { months } from 'moment'


class DownloadDocumentList extends Component {

  constructor(props) {
    super(props)

    this.state = {

    }
    this.downloadFile = this.downloadFile.bind(this)
  }

  downloadFile(srno, filename) {
    let path = URL_BASE + 'SecondarySalesDownload'
    var data = {
      "index": "SecondarySalesDownload", "Data": { "srno": srno, "filename": srno + "_" + filename },
      "Token": ""
    }
    return axios.post(path, data, { responseType: 'arraybuffer' }).then((response) => {
      let image = btoa(
        new Uint8Array(response.data)
          .reduce((data, byte) => data + String.fromCharCode(byte), '')
      );

      let a = document.createElement('a');
      a.href = `data:${response.headers['content-type'].toLowerCase()};base64,${image}`;
      a.download = filename;
      a.click();
    })
  }

  render() {
    const header = [
      { prop: 'SrNo', title: 'Sr No', filterable: true },
      { prop: 'FileName', title: 'File Name', filterable: true },
      { prop: 'Download', title: 'Download', filterable: true },

    ];
    let body = []
    this.props.documentList.length > 0 ? this.props.documentList.map((res, i) => {
      //
      //  let filename = res.c_filename.substring(5)
      const Download = <div className="srcDetails" key={i} onClick={(e) => this.downloadFile(res.n_srno, res.c_filename)}>Download</div>
      body.push({
        SrNo: i + 1,
        FileName: res.c_filename,
        Download: Download,
        Delete: <img className="img action-img" src="../public/assets/images/delete.svg" alt="delete" onClick={(e) => { this.deletepopup(res.n_srno, res.c_filename) }} />
      })
    })

      : <div>No Records Found</div>



    return (
      <div>
        <div>
          <DownloadDocumentListTable
            tableHeader={header}
            tableBody={body}
            keyName="userTable"
            tableClass="striped hover table-responsive"
            rowsPerPage={10}
            rowsPerPageOption={[10, 20, 50, 100, 200]}
            initialSort={{ prop: "username", isAscending: true, }}

          />
        </div>
        <div className="error-msg">{this.state.deleteSuccessMsg}</div>

      </div>
    )
  }
}
export default DownloadDocumentList