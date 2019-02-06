import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class Princi extends Component {
    constructor(){
        super();
      this.state = {
          data:[],
      };
    }
    componentDidMount() {
        axios.get("http://localhost:9002")
            .then(response => {
                const data = response.data;
                this.setState({ data });
                console.log(this.state.data);
            })
            .catch(error => {
                console.log(error);
            })
    }
  render() {
        let datax =this.state.data;

      return (
      <div>
          { datax.map((value,index)=>
              <span key={index}>{value}</span>)
          }
      </div>
    );
  }
}

export default Princi;
