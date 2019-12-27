import React, { Component } from "react";
import ReactDOM from "react-dom";
import App from './Component/App';


const MyIndex = () => (
  <div>Hello React!</div>
);
// var Index = React.createClass({
//   render: function () {
//     return (
//       <div>Hello React@</div>
//     );
//   }
// });

// ReactDOM.render(
//   <App />,
//   document.getElementById("container")
// );
if (window.location.pathname === '/') {
  ReactDOM.render(
      <App />,
      document.getElementById('container')
  );
} else if (window.location.pathname === '/staff') {
  ReactDOM.render(
      <AddNewStaff />,
      document.getElementById('staff_container')
  );
}

// document.addEventListener('DOMContentLoaded', () => {
//   ReactDOM.render(
//     <MyIndex />,
//     document.getElementById('container')
//   )
// })