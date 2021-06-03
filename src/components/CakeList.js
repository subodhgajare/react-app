import React, {useEffect, useState} from 'react'
import Cake from './Cake'
import axios from "axios";

function CakeList() {
    var [cakes, setCakes] = useState([]);

    useEffect(() => {
        axios({
            method: 'GET',
            url: 'https://apibyashu.herokuapp.com/api/allcakes',
        }).then(res => {
            setCakes(res.data.data);
        });
    }, []);

    return (
        <section className="mt-3">
            <div className="card card-info">
                <div className="card-header">
                    <h3 className="card-title text-center">Cakes</h3>
                </div>
                <div className="card-body">
                    <div className="row row-cols-5">
                        {cakes.map((cake, index) => <Cake cake={cake} key={index} />)}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CakeList