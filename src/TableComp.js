import React, { Component } from 'react'
import ReactTable from "react-table";
import "react-table/react-table.css";
import { makeData, Logo, Tips } from "../src/utils";
import axios from 'axios';
import { cloneDeep } from 'lodash';

export default class TableComp extends Component {

    constructor() {
      super();
      this.emptyAndAddToTable = this.emptyAndAddToTable.bind(this);
      this.addoneTotablerow = this.addoneTotablerow.bind(this);
      this.state = {
        // data: makeData(),
        otherData: [],
        loading: false,
        expanded: {}
      };
    }

    // static getDerivedStateFromError(error) {
    //   // Update state so the next render will show the fallback UI.
    //   return { hasError: true };
    // }
  
    // componentDidCatch(error, info) {
    //   // You can also log the error to an error reporting service
    //   console.log(error, info);
    // }

    emptyAndAddToTable() {
      let x = cloneDeep(this.state.otherData);
      console.log('xx', x);

      x = {};

      this.setState({
        otherData: []
      });
    }

    addoneTotablerow() {
      let x = cloneDeep(this.state.otherData);

      const otherData = [...x, {userId: 1, id: 1, title: "delectus aut autem", completed: false, open: false}];
      debugger
      this.setState({
        otherData
      });
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
        <button onClick={this.emptyAndAddToTable}>Empty</button>
        <button onClick={this.addoneTotablerow}>Add to Table</button>
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
              Header: "checked",
              accessor: "",
              id: 'checkbox',
              // accessor: d => `${d.completed} ${d.id}`
              Cell: (row, s) => {
                // debugger
                return (
                  <input
                    type="checkbox"
                    value="x"
                    onChange={(e) => {
                      const s = self;
                      let cd = cloneDeep(self.state.otherData);

                      // toggle the check box open
                      cd.map((item, i) => {
                        if (row.value.id === item.id) {
                          debugger
                          cd[i].open = !cd[i].open;
                          let ex = {};
                          ex[i] = cd[i].open
                          self.setState({
                            otherData: cd,
                            expanded: {...self.state.expanded, ...ex}
                          })
                            let s = 1;
                        }
                      });


                      


                      console.log('test')
                    } }
                    checked={row.value.open}/>)
                }
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
          // getTrProps={(state, rowInfo, column) => {
          //   if (rowInfo){
          //     debugger
          //     return {
          //       style: {
          //         background: rowInfo.row.id === 1 ? "red" : "blue"
          //       }
          //     };
          // } else {
          //   return {}
          // }
          // }}
          getTdProps={(state, rowInfo, column, instance) => {
            return {
              onClick: (e, handleOriginal) => {
                console.log("A Td Element was clicked!");
                console.log("it produced this event:", e);
                console.log("It was in this column:", column);
                console.log("It was in this row:", rowInfo);
                console.log("It was in this table instance:", instance);
        
                // IMPORTANT! React-Table uses onClick internally to trigger
                // events like expanding SubComponents and pivots.
                // By default a custom 'onClick' handler will override this functionality.
                // If you want to fire the original onClick handler, call the
                // 'handleOriginal' function.
                if (handleOriginal) {
                  handleOriginal();
                }
                rowInfo.show = false;
              }
            };
          }}
          onPageChange={(pageIndex) => {
              self.setState({ expanded: {} })
              console.log('lllllllllllllllllllllllllllllll' , pageIndex);
              // TODO on page change make sure that each ind is open tru
              console.log('state expanded', this.state.expanded)
          }}
          minRows={3}
        />  
      </div>
    )
  }
}
