import React, { useEffect, useState } from 'react';
import { getAllCakes, getCakesBySearch } from '../apis/Api';
import { Link } from "react-router-dom";
import Cake from './Cake';
import Loader from './Loader';

function CakeList(props) {
  var [cakes, setCakes] = useState();

  useEffect(() => {
    if (props.search) {
      getCakesBySearch(props.search).then(res => {
        setCakes(res.data);
      })
    } else {
      getAllCakes().then(res => {
        setCakes(res.data);
      });
    }
  }, [props.search]);

  return (
    <section>
      <div className="container">
        <div className="breadcrumbs">
          <ol className="breadcrumb">
            <li><Link to="/">Home</Link></li>
            <li className="active">Shop</li>
          </ol>
        </div>
        {!cakes && <Loader text="Please wait loading cakes..." />}
        {
          cakes &&
          <div className="row">
            <div className="col-sm-12 padding-right">
              <div className="features_items">
                <h2 className="title text-center">Cakes</h2>
                {cakes.length > 0 && cakes.map((cake, index) => <Cake cake={cake} key={index} />)}
                {cakes.length === 0 && <h2 className="text-center m-5">No cakes found.</h2>}
              </div>
            </div>
          </div>
        }
      </div>
    </section>
  )
}

export default CakeList