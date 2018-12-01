import React, { Component } from 'react'
import ReactTable from "react-table";
import "react-table/react-table.css";
import { makeData, Logo, Tips } from "../src/utils";
import axios from 'axios';

export default class TableComp extends Component {

    constructor() {
        super();
        this.state = {
          // data: makeData(),
          otherData: [],
          loading: false,
          expanded: {}
        };
      }

  componentDidMount() {
    this.setState({ loading: true });
    axios.get(`https://jsonplaceholder.typicode.com/todos`)
      .then(res => {

        let s = res.data;
        // Add open close var
        let t = s.map((v) => {
          v.open = false;
          return v;
        });






        this.setState({ otherData: res.data });
        this.setState({ loading: false });
      })
  }

  render() {

    let self = this;

    return (
      <div>
        <button onClick={() => this.setState({ expanded: {2: true, 4: true, 6: true} })}>open 246</button>
        <button onClick={() => this.setState({ expanded: {} })}>


          colse all
        </button>
        <ReactTable
          data={this.state.otherData}
          SubComponent={
            row => {
              console.log('row', row);
              return (<div>test <button onClick={() => this.setState({ expanded: {} })}>close all></button></div>)
            }
          }
          expanded={this.state.expanded}
          onExpandedChange={(newExpanded, index, event) => {
						console.log('789000000', [newExpanded, index, event])
						this.setState({
							expanded: newExpanded
						})
					}}
          columns={[
            {
              Header: "completed",
              id: "completed",
              accessor: d => `${d.completed} ${d.id}`
            },
            {
              Header: "id",
              accessor: "id",
            },
            {
              Header: "title",
              accessor: "title"
            },
            {
              Header: "title",
              accessor: "title"
            },
            {
              Header: "open",
              accessor: "open"
            },
            {
              Header: ">>>>>",
              accessor: "id",
              Cell: row => {
                const i = row.viewIndex;
                let obj = {};
                obj[i] = true;
                return  <button
                          onClick={
                            (d) => {
                              console.log('row', [row, this]);
                              debugger;
                              self.setState(
                                {
                                  expanded: obj
                                }
                              );
                            }
                          }
                        >{row.value}</button>
              }
            },
            {
              Header: () => <strong>More</strong>,
              width: 65,
              Footer: () => <span>&hearts;</span>,
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
          loadingText= 'Loading...'
          loading={this.state.loading}
        />  
      </div>
    )
  }
}
