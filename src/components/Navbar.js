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
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <span className="navbar-brand" href="#">{this.props.details.projectName}</span>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              Welcome {this.props.details.name}
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" onChange={this.getSearchText} placeholder="Search" aria-label="Search" />
            <small>{this.state.searchProcess} <strong className="text-info">{this.state.searchText}</strong></small>
            <button className="btn btn-outline-success my-2 my-sm-0" type="button" onClick={this.search}>Search</button>
          </form>
        </div>
      </nav>
    )
  }
}

export default Navbar;