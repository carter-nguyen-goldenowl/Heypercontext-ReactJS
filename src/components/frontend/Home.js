import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

export default class Home extends React.Component {
  render() {
    return (
      <>
        <Navbar />
        <div className='py-6 md:py-12'>
          <h1 className='ml-10'> wellcome the home page</h1>
        </div>
      </>
    );
  }
}
