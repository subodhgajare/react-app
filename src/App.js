import Navbar from './components/Navbar'
import Carousel from './components/Carousel'
import SignUp from "./components/SignUp";

function App() {
  let details = {
    projectName: 'React App',
    name: 'Subodh'
  }
  return (
    <div>
      <Navbar details={details}/>
      <Carousel />
      <SignUp />
    </div>
  );
}

export default App;
