import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeOrder, setOrder } from '../../Slice/orderSlice';
import { Link } from 'react-router-dom';
import Style from './newOrder.module.scss';

function NewOrder() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orderSlice.order);
  const inputRef = React.useRef();

  const [number, setNumber] = useState('');

  const onClickOrder = (index) => {
    dispatch(removeOrder(index));
  };

  const onChangeInput = (event) => {
    setNumber(Number(event.target.value));
  };

  // Воспроизводит любое аудио
  function playAudio(fileName) {
    // Промис использую для того, чтобы через "await" ждать завершения аудио
    // см. внизу в функцию "onclickSetOrder"
    return new Promise((resolve) => {
      // Создаем аудио по названию файла fileName
      const audio = new Audio(`/mp3/${fileName}.mp3`);
      // Сразу воспроизводим аудио
      audio.play();

      // Ставим обработчик события на завершение воспроизведения аудио.
      // Когда аудио завершится, то вызовется функция resolve
      // Проще говоря, это завершение выполнения промиса
      audio.addEventListener('ended', resolve);
    });
  }

  // Воспроизводим одно целое число или несколько чисел
  async function playNumbers(value) {
    // Получаемстаток от десятичного числа
    const restNumb = value % 10; // 46 % 10 = 6

    // Получаем десятичное число
    const bigNumb = value - restNumb; // 46 - 6 = 40

    // Теперь у нас есть "40" и "6" по отдельности.

    // Если число от 11 до 19, то воспроизводим отдельные аудио
    if (value >= 11 && value <= 19) {
      await playAudio(value);
      return;
    }

    // Иначе воспроизводим по кускам данное число
    await playAudio(bigNumb);
    await playAudio(restNumb);

    // Или можно сделать воспроизведение чуть быстрей
    // Я сделал ниже код без "await", чтобы чуть быстрей воспроизводил номер заказа (тут уже на усмотрение)
    // Ты можешь проверить разницу, закоментировав верхнее воспроизведение и оставив ниже код
    // playAudio(bigNumb);
    // setTimeout(() => playAudio(restNumb), 800);
  }

  const addOrderAndCleanForm = () => {
    dispatch(setOrder(number));
    setNumber('');
    inputRef.current.focus();
  };

  const onClickAddOrder = async () => {
    if (!number) {
      return alert('Укажите номер заказа!');
    }

    if (number > 50) {
      return alert('Слишком большой номер заказа!');
    }

    // Добавляем заказ в список и очищаем поле
    addOrderAndCleanForm();

    // Воспроизводим "Заказ номер" и ждём его завершения
    await playAudio('main');

    // Потом воспроизводим номер заказа
    await playNumbers(number);
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
                value={number}
                type={'number'}
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
