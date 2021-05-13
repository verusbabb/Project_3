import React from "react";
// import moment from "moment";

// This file exports the Input, TextArea, and FormBtn components

export function Input(props) {
  return (
    <div className="form-group">
      <input className="form-control" {...props} />
    </div>
  );
}

export function TextArea(props) {
  return (
    <div className="form-group">
      <textarea className="form-control" rows="30" {...props} />
    </div>
  );
}

export function FormBtn(props) {
  return (
    <button
      {...props}
      style={{ float: "right", marginBottom: 10 }}
      className="btn btn-success"
    >
      {props.children}
    </button>
  );
}

// export function DatePicker(props) {

//   $(document).ready(function(){
//     $('.datepicker').datepicker();
//   });

//   return (
//   <div className="form-group">
//     <i className="material-icons prefix">date_range</i>
//     <input className="datepicker dateset" {...props} />
//   </div>
//   );
// }
