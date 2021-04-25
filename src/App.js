
import './App.css';
import { Provider } from "react-redux";
import store from "./redux/Store";
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import SignUp from './forms/signUp'
import Login from './forms/login';
import NavBar from './components/navBar';
import ThePicture from './components/thePicture';
import MyPictures from './components/allPictures'

function App() {
  return (
   <Provider store={store}>
     <NavBar/>
        <Switch>
              <Route path='/login' component={Login}/>
              <Route path='/signUp' component={SignUp}/>
              <Route path='/thePicture' component={ThePicture}/>
              <Route path='/myPictures' component={MyPictures}/>

        </Switch>
        <Redirect to="/login"></Redirect>
   </Provider>
  );
}

export default App;
