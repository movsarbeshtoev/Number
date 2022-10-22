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
  const inputRef = React.useRef();

  const mass = number.split("");
  console.log(num);

  const remove = (index) => {
    dispatch(removeOrder(index));
    setNum(...num, mass);
  };

  const addOrder = (event) => {
    setNumber(event.target.value);
    console.log(event);
  };

  const onclickSetOrder = async () => {
    if (!number == "") {
      dispatch(setOrder(number));
      setNumber("");
      inputRef.current.focus();
      const main = new Audio(`/mp3/main.mp3`);
      main.play();
    } else {
      alert("добавьте заказ");
    }

    setTimeout(() => {
      if (+number > 24) {
        const firstNumber = Number(`${+mass[0]}0`);
        const lastNumber = +mass[1];

        const audioFirst = new Audio(`/mp3/${firstNumber}.mp3`);
        audioFirst.play();
        console.log(Audio);
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
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className={Style.newOrder}>
      <Link to="/">
        <button>ShowOrder</button>
      </Link>
      <div className={Style.mainBlock}>
        <div className={Style.centralBlock}>
          <div className={Style.logo}>
            <form onSubmit={handleSubmit} className={Style.blockInput}>
              <input
                ref={inputRef}
                onChange={(event) => addOrder(event)}
                value={number}
                type={"number"}
                min="1"
                max="100"
              />
              <button type="submit" onClick={() => onclickSetOrder()}>
                Готов
              </button>
            </form>
          </div>

          <div className={Style.Order}>
            <ul>
              {orders.map((obj, index) => {
                return (
                  <div className={Style.blockLi} key={index}>
                    <li onClick={() => remove(index)}>{obj}</li>
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
export default NewOrder;
