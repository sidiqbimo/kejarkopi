import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

const ConfirmOrder = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Latte Kejar Deadline",
      price: 20000,
      qty: 1,
      image: "/latte-kejar.png",
    },
    {
      id: 2,
      name: "Cappucino Hanupis",
      price: 15000,
      qty: 2,
      image: "/cappucino.png",
    },
  ]);

  const handleQtyChange = (id: number, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty + delta } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const total = items.reduce((sum, item) => sum + item.qty * item.price, 0);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fffdf9] px-4 pb-32 space-y-6 max-w-[412px] mx-auto font-[Inter] relative">
      {/* Header */}
      <div className="w-full h-20 bg-[#f5f0e1] rounded-b-lg p-4 flex items-center gap-2 mt-0">
        <button
          onClick={() => window.history.back()}
          className="w-6 h-6 flex items-center justify-center"
        >
          <Icon
            icon="material-symbols:arrow-back-rounded"
            className="text-[#6f4e37] text-xl"
          />
        </button>
        <div className="flex-1 flex flex-col items-center">
          <div className="text-[#6f4e37] font-bold text-base font-[Quicksand]">
            Konfirmasi Pesanan
          </div>
          <div className="text-[#cbb99d] text-xs">
            {items.reduce((sum, item) => sum + item.qty, 0)} item
          </div>
        </div>
      </div>

      {/* Item List */}
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4">
            <img src={item.image} className="w-20 h-16 object-cover rounded" />
            <div className="flex-1 flex flex-col gap-1">
              <div className="text-[#6f4e37] font-bold text-base font-[Quicksand]">
                {item.name}
              </div>
              <div className="flex gap-2 text-xs text-[#cbb99d]">
                <span className="font-bold">{item.qty}x</span>
                <span>Rp {item.price.toLocaleString("id-ID")}</span>
              </div>
            </div>
            {/* Quantity Control */}
            <div className="bg-[#f5f0e1] rounded-lg outline outline-1 outline-[#2d2d2d] flex items-center gap-2 px-2 py-1">
              <button
                onClick={() => handleQtyChange(item.id, -1)}
                className="w-8 h-8 flex items-center justify-center"
              >
                <Icon icon="mdi:minus" className="text-[#6f4e37] text-xl" />
              </button>
              <div className="text-base text-[#2d2d2d]">{item.qty}</div>
              <button
                onClick={() => handleQtyChange(item.id, 1)}
                className="w-8 h-8 flex items-center justify-center"
              >
                <Icon icon="mdi:plus" className="text-[#6f4e37] text-xl" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[412px] bg-[#cbb99d] rounded-t-lg p-3 space-y-2 z-10">
        <div className="text-center text-[#6f4e37] text-base">
          Total{" "}
          <span className="font-bold">Rp {total.toLocaleString("id-ID")}</span>
        </div>
        <button
          onClick={() => navigate("/seating")}
          className="w-full p-4 bg-[#6f4e37] text-[#f5f0e1] rounded-lg font-bold flex justify-center items-center gap-2"
        >
          Pilih Meja
          <Icon icon="ooui:next-ltr" className="text-[#f5f0e1] text-xl" />
        </button>
      </div>
    </div>
  );
};

export default ConfirmOrder;
