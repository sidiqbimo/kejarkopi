import { useState } from "react";
import { Icon } from "@iconify/react";
import Datepicker from "react-tailwindcss-datepicker";
import { useNavigate } from "react-router-dom";

const ChooseTime = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };

  const handleQuickDateSelection = (offset: number) => {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    const [selectedDate, setSelectedDate] = useState<any>(null);
  };

  const isFormComplete = selectedDate && startTime && endTime;

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fffdf9] px-4 pb-32 space-y-6 max-w-[412px] mx-auto font-[Inter] relative">
      {/* Header */}
      <div className="w-full h-20 bg-[#f5f0e1] rounded-b-lg p-4 flex items-center gap-2">
        {/* Back Button */}
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
            Tentukan Waktu
          </div>
        </div>
      </div>

      {/* Date Selection */}
      <div className="space-y-4">
        <label className="text-[#6f4e37] text-base">Tanggal</label>
        <Datepicker
          value={selectedDate}
          onChange={handleDateChange}
          useRange={false}
          asSingle={true}
          displayFormat={"DD/MM/YYYY"}
          classNames="w-full px-4 py-2 bg-[#f5f0e1] rounded-lg border border-[#6f4e37] text-[#6f4e37]"
        />
        <div className="flex gap-4">
          <button
            className="flex-1 h-10 bg-[#e1dad2] rounded-sm text-[#b3aaa0] text-xs font-bold"
            onClick={() => handleQuickDateSelection(0)}
          >
            Hari Ini
          </button>
          <button
            className="flex-1 h-10 bg-[#e1dad2] rounded-sm text-[#b3aaa0] text-xs font-bold"
            onClick={() => handleQuickDateSelection(1)}
          >
            Besok
          </button>
        </div>
      </div>

      {/* Time Selection */}
      <div className="space-y-4">
        <label className="text-[#6f4e37] text-base">Jam</label>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-[#6f4e37] text-xs">Mulai</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full px-4 py-2 bg-[#f5f0e1] rounded-lg border border-[#6f4e37] text-[#6f4e37]"
            />
          </div>
          <div className="flex-1">
            <label className="text-[#6f4e37] text-xs">Selesai</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full px-4 py-2 bg-[#f5f0e1] rounded-lg border border-[#6f4e37] text-[#6f4e37]"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[412px] bg-[#cbb99d] rounded-t-lg p-3 space-y-2 z-10">
        <button
          className={`w-full p-4 rounded-lg font-bold flex justify-center items-center gap-2 ${
            isFormComplete
              ? "bg-[#8ba888] text-[#f5f0e1]"
              : "bg-[#e1dad2] text-[#b3aaa0]"
          }`}
          disabled={!isFormComplete}
          onClick={() => {
            navigate("/pin");
          }}
        >
          Lanjut Bayar
          <Icon icon="ooui:next-ltr" className="text-[#b3aaa0] text-xl" />
        </button>
      </div>
    </div>
  );
};

export default ChooseTime;
