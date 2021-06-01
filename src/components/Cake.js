import React from 'react'

class Cake extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            cake: this.props.cake,
        }
    }

    render() {
        return (
            <div className="col">
                <div className="card" style={{width: '100%', height: '400px' }}>
                    {this.state.cake.image && <img src={this.state.cake.image} className="card-img-top" alt="..." style={{ widht: '200px', height: '200px' }} />}
                    <div className="card-body">
                        <h5 className="card-title">{this.state.cake.name}</h5>
                        <p className="card-text">{this.state.cake.description}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Cake