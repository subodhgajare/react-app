import React from 'react';
import Navbar from './components/Navbar'
import Carousel from './components/Carousel'
import SignUp from "./components/SignUp";
import data from "./data";
import CakeList from './components/CakeList';

class App extends React.Component {
  details = {
    projectName: 'React Cake Shop',
    name: 'Subodh'
  }

  render() {
  return (
      <div>
        <Navbar details={this.details}/>
        <Carousel />
        <CakeList cakes={data} />
        <SignUp />
      </div>
    );
  }
}

export default App;
