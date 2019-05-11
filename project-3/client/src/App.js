// import React, { Fragment } from "react";
import axios from "axios";
import React, { Component } from 'react';
import { Route } from "react-router-dom";
import UserPage from './Pages/UserPage';
// import Reports from './Pages/Reports';
//import NoMatch from "./Pages/NoMatch";
import Signup from "./Components/Sign-up"
import LoginForm from './Components/Form'

// function App() {
//   return (
//     <Router>
//       <Fragment>
//         <Switch>
//           <Route exact path="/" component={Login} />
//           <Route exact path="/user" component={UserPage} />

//           {/* <Route exact path="/reports" component={Reports} /> */}
//           <Route component={NoMatch} />
//         </Switch>
//       </Fragment>
//     </Router>
//   );
// }


// export default App;

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      email: null
    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount() {
    this.getUser()
  }

  updateUser(userObject) {
    this.setState(userObject)
  }

  getUser() {
    axios.get('/user').then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          username: response.data.user.email
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          email: null
        })
      }
    })
  }

  render() {
    return (
      <div className="App">

        {/* <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} /> */}
        {/* greet user if logged in: */}
        {this.state.loggedIn &&
          <p>Join the party, {this.state.email}!</p>
        }
        {/* Routes to different components */}
        <Route
          exact path="/"
          component={UserPage} />
           <Route
          exact path="/user"
          component={UserPage} />
        <Route
          path="/login"
          render={() =>
            <LoginForm
              updateUser={this.updateUser}
            />}
        />
        <Route
          path="/signup"
          render={() =>
            <Signup />}
        />


      </div>
    );
  }
}

export default App;


