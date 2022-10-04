import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import Style from "./showOrder.module.scss";

function ShowOrder(obj) {
  const orders = useSelector((state) => state.orderSlice.order);

  return (
    <div className={Style.order}>
      <div className={Style.orderLogo}>
        <img className={Style.logo} src="img/ingvine-logo.jpeg" alt="logo" />
      </div>

      <div>
        <ul>
          {orders.map((obj, index) => {
            return <li key={index}>{obj}</li>;
          })}
        </ul>
        <div>
          <Link to="/admin">
            <button>admin</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ShowOrder;
