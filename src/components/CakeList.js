import React from 'react'
import Cake from './Cake'

class CakeList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            cakes: this.props.cakes,
        }
    }

    render() {
        return (
            <section className="mt-3">
                <div className="card card-info">
                    <div className="card-header">
                        <h3 className="card-title text-center">Cakes</h3>
                    </div>
                    <div className="card-body">
                        <div className="row row-cols-5">
                            {this.state.cakes.map((cake, index) => <Cake cake={cake} key={index} />)}
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default CakeList