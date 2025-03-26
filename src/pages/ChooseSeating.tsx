import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

const ChooseSeating = () => {
  const [selectedTable, setSelectedTable] = useState(null);

  const tables = [
    { id: "1A", chairs: ["1A-1", "1A-2", "1A-3", "1A-4"] },
    { id: "1B", chairs: ["1B-1", "1B-2", "1B-3", "1B-4"] },
    { id: "1C", chairs: ["1C-1", "1C-2", "1C-3", "1C-4"] },
  ];

  const handleTableSelect = (tableId) => {
    setSelectedTable(tableId);
  };

  const TableBlock = ({
    id,
    selected,
    onSelect,
  }: {
    id: string;
    selected: boolean;
    onSelect: () => void;
  }) => {
    return (
      <div
        className={`relative w-24 h-24 rounded-sm flex items-center justify-center cursor-pointer transition-colors duration-300 ${
          selected ? "bg-[#8ba888]" : "bg-[#e1dad2]"
        }`}
        onClick={onSelect}
      >
        {/* Chairs (top, bottom, left, right) */}
        {["top", "right", "bottom", "left"].map((pos, index) => (
          <div
            key={index}
            className={`absolute w-6 h-6 rounded-full ${
              selected ? "bg-[#8ba888]" : "bg-[#e1dad2]"
            }`}
            style={{
              top:
                pos === "top" ? "-1.2rem" : pos === "bottom" ? "120%" : "50%",
              left:
                pos === "left" ? "-1.2rem" : pos === "right" ? "120%" : "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
        <div className="text-[#6f4e37] text-xl font-[Inter]">{id}</div>
      </div>
    );
  };

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
            Pilih Tempat Duduk
          </div>
          <div className="text-[#cbb99d] text-xs">Lantai 1</div>
        </div>
      </div>

      {/* Seating Area */}
      <div className="flex flex-col items-center gap-10 mt-16">
        {/* Top Row */}
        <div className="flex justify-center gap-24">
          {["1A", "1B"].map((id) => (
            <TableBlock
              key={id}
              id={id}
              selected={selectedTable === id}
              onSelect={() => handleTableSelect(id)}
            />
          ))}
        </div>

        {/* Bottom Centered Table */}
        <div>
          <TableBlock
            id="1C"
            selected={selectedTable === "1C"}
            onSelect={() => handleTableSelect("1C")}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[412px] bg-[#cbb99d] rounded-t-lg p-3 space-y-2 z-10">
        {selectedTable ? (
          <>
            <div className="flex items-center justify-center gap-2.5">
              <Icon
                icon="ic:baseline-table-restaurant"
                className="text-[#6f4e37] text-2xl"
              />
              <div className="text-center text-[#6f4e37] text-base">
                Anda memilih{" "}
                <span className="font-bold">Meja {selectedTable}</span>
              </div>
            </div>
            <button
              onClick={() => navigate("/time")}
              className="w-full p-4 bg-[#6f4e37] text-[#f5f0e1] rounded-lg font-bold flex justify-center items-center gap-2 cursor-pointer"
            >
              Tentukan Waktu
              <Icon icon="ooui:next-ltr" className="text-[#f5f0e1] text-xl" />
            </button>
          </>
        ) : (
          <>
            <div className="text-center text-[#6f4e37] text-base">
              Silakan pilih meja
            </div>
            <button
              className="w-full p-4 bg-[#e1dad2] text-[#b3aaa0] rounded-lg font-bold flex justify-center items-center gap-2 cursor-not-allowed"
              disabled
            >
              Tentukan Waktu
              <Icon icon="ooui:next-ltr" className="text-[#b3aaa0] text-xl" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ChooseSeating;
