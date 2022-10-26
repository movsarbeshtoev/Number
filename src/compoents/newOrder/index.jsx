import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeOrder, setOrder } from "../../Slice/orderSlice";
import { Link } from "react-router-dom";
import Style from "./newOrder.module.scss";

function NewOrder() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orderSlice.order);
  const inputRef = React.useRef();

  const [getNumber, setGetNumber] = useState("");

  const [audioMass, setAudioMass] = useState([2, 3, 4, 5, 6, 7]);
  const [startAudio, setStartAudio] = useState(false);
  console.log(audioMass);
  const onClickOrder = (index) => {
    dispatch(removeOrder(index));
  };

  const onChangeInput = (event) => {
    setGetNumber(Number(event.target.value));
  };
  const onClickAddOrder = async () => {
    if (!getNumber) {
      return alert("Укажите номер заказа!");
    }

    if (getNumber > 50) {
      return alert("Слишком большой номер заказа!");
    }

    // Добавляем заказ в список и очищаем поле
    addOrderAndCleanForm();
    appendAudio(getNumber);

    // Воспроизводим "Заказ номер" и ждём его завершения
    // await playAudio("main");

    // Потом воспроизводим номер заказа
    // await playNumbers(number);
  };

  const addOrderAndCleanForm = () => {
    dispatch(setOrder(getNumber));
    setGetNumber("");
    inputRef.current.focus();
  };

  function appendAudio(number) {
    setAudioMass([...audioMass, number]);
    console.log(audioMass);
    test(audioMass[0]);
  }

  const test = (number) => {
    if (startAudio) return false;
    const audio = new Audio(`/mp3/main.mp3`);
    audio.play();
    setStartAudio(true);
    audio.addEventListener("ended", function () {
      if (number >= 1 && number <= 19) {
        const audioNumber = new Audio(`/mp3/${number}.mp3`);
        audioNumber.play();
        audioNumber.addEventListener("ended", function () {
          console.log("Срабатывает позднее");
        });
      } else {
        const bigNumber = new Audio(`/mp3/${number - (number % 10)}.mp3`);
        bigNumber.play();
        bigNumber.addEventListener("ended", function () {
          const minNumber = new Audio(`/mp3/${number % 10}.mp3`);
          minNumber.play();
          minNumber.addEventListener("ended", function () {});
        });
      }
      setStartAudio(false);
      const Arr = audioMass.shift();
      console.log(Arr);
      setAudioMass(audioMass.filter((item) => item !== Arr));
      if (audioMass.length > 0) {
        // console.log(audioMass);

        test(audioMass[0]);
      }
    });

    console.log(audioMass);

    // return new Promise((resolve) => {
    //   const audio = new Audio(`/mp3/main.mp3`);
    //   audio.play();
    //   audio.addEventListener("ended", function () {
    //     if (number >= 1 && number <= 19) {
    //       const audioNumber = new Audio(`/mp3/${number}.mp3`);
    //       audioNumber.play();
    //       console.log(1);
    //       audioNumber.addEventListener("ended", resolve);
    //     } else {
    //       const bigNumber = new Audio(`/mp3/${number - (number % 10)}.mp3`);
    //       bigNumber.play();
    //       bigNumber.addEventListener("ended", function () {
    //         const minNumber = new Audio(`/mp3/${number % 10}.mp3`);
    //         minNumber.play();
    //         console.log(1);
    //         minNumber.addEventListener("ended", resolve);
    //       });
    //     }
    //   });
    //   console.log(2);
    // });
  };

  return (
    <div className={Style.newOrder}>
      <Link to="/">
        <button>ShowOrder</button>
      </Link>
      <div className={Style.mainBlock}>
        <div className={Style.centralBlock}>
          <div className={Style.logo}>
            <div className={Style.blockInput}>
              <input
                ref={inputRef}
                onChange={(event) => onChangeInput(event)}
                value={getNumber}
                type={"number"}
                min="1"
                max="50"
              />
              <button type="submit" onClick={() => onClickAddOrder()}>
                Готов
              </button>
            </div>
          </div>

          <div className={Style.Order}>
            <ul>
              {orders.map((obj, index) => {
                return (
                  <div className={Style.blockLi} key={index}>
                    <li onClick={() => onClickOrder(index)}>{obj}</li>
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
