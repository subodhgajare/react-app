import React from "react";

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

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#navbar">{this.props.details.projectName}</a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                Welcome {this.props.details.name}
              </li>
            </ul>
            <form className="d-flex">
              <div className=" me-2">
                <input className="form-control" onChange={this.getSearchText} type="search" placeholder="Search" aria-label="Search" />
                <small>{this.state.searchProcess} <strong className="text-info">{this.state.searchText}</strong></small>
              </div>
              <button className="btn btn-outline-success" type="button" onClick={this.search}>Search</button>
            </form>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar;