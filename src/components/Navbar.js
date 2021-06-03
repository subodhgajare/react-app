import React from "react";
import { Link } from "react-router-dom";

class Navbar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      searchText: '',
      searchProcess: 'Please type to search'
    }
  }

  getSearchText = (event) => {
    this.setState({
      searchText: (event.target.value),
      searchProcess: 'Searching for'
    });
  }

  search = () => {
    this.setState({
      searchProcess: 'Search done for:'
    })
  }

  logout = () => {
    this.props.setUser(null);
    localStorage.removeItem('user')
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/home">{this.props.details.projectName}</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {this.props.user && <li className="nav-item active">
              <span className="nav-link">Welcome {this.props.user.name}</span>
            </li>}
            <li className="nav-item">
              <Link className="nav-link" to='/cakes'>Cakes</Link>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" onChange={this.getSearchText} placeholder="Search" aria-label="Search" />
            <small>{this.state.searchProcess} <strong className="text-info">{this.state.searchText}</strong></small>
            <button className="btn btn-outline-success my-2 my-sm-0" type="button" onClick={this.search}>Search</button>
          </form>
            {!this.props.user && <><Link className="btn btn-sm btn-primary ml-3" to='/sign-in'>Sign In</Link> / <Link className="btn btn-sm btn-primary" to='/sign-up'>Sign Up</Link></>}
            {this.props.user && <button className="btn btn-sm btn-danger ml-3" onClick={this.logout}>Logout</button>}
        </div>
      </nav>
    )
  }
}

export default Navbar;