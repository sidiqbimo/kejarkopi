import { useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs"; // Required by Ant Design DatePicker

const ChooseTime = () => {
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleDateChange = (date: dayjs.Dayjs | null, dateString: string) => {
    setSelectedDate(date);
  };

  const handleQuickDateSelection = (offset: number) => {
    setSelectedDate(dayjs().add(offset, "day"));
  };

  const isFormComplete =
    selectedDate?.isValid?.() &&
    startTime.trim().length > 0 &&
    endTime.trim().length > 0;

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
        <div className="flex items-center justify-center gap-2">
          <Icon
            icon="lets-icons:date-fill"
            className="text-[#6f4e37] text-xl"
          />
          <label className="text-[#6f4e37] text-base">Tanggal</label>
        </div>

        <Space direction="vertical" className="w-full">
          <DatePicker
            value={selectedDate}
            onChange={handleDateChange}
            format="dddd, DD MMMM YYYY"
            placeholder={dayjs().format("dddd, DD MMMM YYYY")}
            className="w-full h-14 px-4 py-2 bg-[#f5f0e1] rounded-t-lg border-b border-[#6f4e37] text-[#a89f94] text-base font-normal tracking-wide"
          />
        </Space>

        <div className="flex gap-4">
          <button
            className={`flex-1 h-10 rounded-sm text-xs font-bold ${
              selectedDate?.isSame(dayjs(), "day")
                ? "bg-[#cbb99d] text-[#fffdf9]"
                : "bg-[#e1dad2] text-[#b3aaa0]"
            }`}
            onClick={() => handleQuickDateSelection(0)}
          >
            Hari Ini
          </button>
          <button
            className={`flex-1 h-10 rounded-sm text-xs font-bold ${
              selectedDate?.isSame(dayjs().add(1, "day"), "day")
                ? "bg-[#cbb99d] text-[#fffdf9]"
                : "bg-[#e1dad2] text-[#b3aaa0]"
            }`}
            onClick={() => handleQuickDateSelection(1)}
          >
            Besok
          </button>
        </div>
      </div>

      {/* Time Selection */}
      <div className="space-y-0">
        <div className="flex items-center justify-center gap-2">
          <Icon icon="mdi:clock" className="text-[#6f4e37] text-xl" />
          <label className="text-[#6f4e37] text-base">Waktu</label>
        </div>

        <div className="flex gap-4">
          <div className="flex-1 flex flex-col items-center">
            <label className="text-[#6f4e37] text-xs text-center">Mulai</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full px-4 py-2 bg-white rounded-lg border border-[#6f4e37] text-[#6f4e37] text-center appearance-none"
            />
          </div>
          <div className="flex-1 flex flex-col items-center">
            <label className="text-[#6f4e37] text-xs text-center">
              Selesai
            </label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full px-4 py-2 bg-white rounded-lg border border-[#6f4e37] text-[#6f4e37] text-center appearance-none"
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
          <Icon
            icon="ooui:next-ltr"
            className={`text-[#b3aaa0] text-xl ${
              isFormComplete
                ? "text-[#f5f0e1]"
                : "text-[#b3aaa0]"
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default ChooseTime;
