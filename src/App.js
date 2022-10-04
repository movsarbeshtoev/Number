import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeOrder, setOrder } from "./Slice/orderSlice";
import { Routes, Route } from "react-router-dom";

import NewOrder from "./compoents/newOrder/index";
import ShowOrder from "./compoents/showOrder";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="admin" element={<NewOrder />} />
        <Route path="/" element={<ShowOrder />} />
      </Routes>
    </div>
  );
}

export default App;
