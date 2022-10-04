import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeOrder, setOrder } from "../../Slice/orderSlice";
import { Link } from "react-router-dom";
import Style from "./newOrder.module.scss";

function NewOrder() {
  const [number, setNumber] = useState("");
  const orders = useSelector((state) => state.orderSlice.order);
  const dispatch = useDispatch();
  const [num, setNum] = useState([]);

  const remove = (index) => {
    dispatch(removeOrder(index));
  };

  const onclickSetOrder = async () => {
    dispatch(setOrder(number));
    setNumber("");
    const main = new Audio(`/mp3/main.mp3`);
    await main.play();

    setTimeout(() => {
      if (+number > 20) {
        const firstNumber = Number(`${Math.floor(+number / 10)}0`);
        const lastNumber = +number % 10;

        const audioFirst = new Audio(`/mp3/${firstNumber}.mp3`);
        audioFirst.play();

        if (lastNumber > 0) {
          setTimeout(() => {
            const audioSecond = new Audio(`/mp3/${lastNumber}.mp3`);
            audioSecond.play();
          }, 1000);
        }
      } else {
        const audio = new Audio(`/mp3/${number}.mp3`);
        audio.play();
      }
    }, 2000);
  };

  return (
    <div className={Style.newOrder}>
      <Link to="/">
        <button>ShowOrder</button>
      </Link>
      <div className={Style.centralBlock}>
        <div className={Style.blockImput}>
          <input
            onChange={(event) => setNumber(event.target.value)}
            value={number}
            type={"number"}
          />
          <button onClick={() => onclickSetOrder()}>Добавить</button>
        </div>
        <div className={Style.Order}>
          <ul>
            {orders.map((obj, index) => {
              return (
                <div className={Style.blockLi} key={index}>
                  <li>{obj}</li>
                  <button onClick={() => remove(index)}>Выполнен</button>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default NewOrder;
