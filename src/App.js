import React, { Component } from 'react';
// import logo from './logo.svg';
import Appcss from './App.module.css';
import AppDragDropDemo from './dragdrop/AppDragDropDemo';
import TableComp from './TableComp';

class App extends Component {
  render() {
    return (
      <div className={Appcss.App}>
        <TableComp />
        <AppDragDropDemo />
      </div>
    );
  }
}

export default App;
