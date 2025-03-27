import { useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import dayjs from "dayjs"; // Required by Ant Design DatePicker

const Pin = () => {
  const [pin, setPin] = useState(["", "", "", "", "", ""]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();
  
  const selectedTable = localStorage.getItem("selectedTable");
  const selectedDate = localStorage.getItem("selectedDate");
  const startTime = localStorage.getItem("startTime");
  const endTime = localStorage.getItem("endTime");
  const items = JSON.parse(localStorage.getItem("orderItems") || "[]");


  const handleChange = (index: number, value: string) => {
    if (/^[0-9]?$/.test(value)) {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);

      if (value && index < pin.length - 1) {
        const nextInput = document.getElementById(`pin-${index + 1}`);
        if (nextInput) nextInput.focus();
      }

      if (newPin.join("") === "123456") {
        if (newPin.join("") === "123456") {
          const orderId = `A${Math.floor(Math.random() * 100000)}`; // Generate Order ID
          
          localStorage.setItem("orderId", orderId); // Store the order ID
          if (selectedTable) {
            if (selectedTable) {
              localStorage.setItem("tableName", selectedTable); // Store the selected table
            }
          }
          localStorage.setItem(
            "reservationDate",
            dayjs(selectedDate).format("DD MMMM YYYY")
          ); // Store reservation date
          localStorage.setItem("reservationTime", `${startTime} - ${endTime}`); // Store time
          localStorage.setItem("orderItems", JSON.stringify(items)); // Store the order items
          
          const orderData = {
            orderId: `A${Math.floor(Math.random() * 100000)}`, // Generate Order ID
            tableName: selectedTable, // Table selected
            reservationDate: dayjs(selectedDate).format("DD MMMM YYYY"), // Selected date formatted
            reservationTime: `${startTime} - ${endTime}`, // Start and end time
            orders: items, // Items array
          };

          // Store order data in localStorage
          localStorage.setItem("orderData", JSON.stringify(orderData));
          
          console.log("Order Data Stored:", orderData);

          navigate("/receipt"); // Navigate to the receipt page
        }

        navigate("/receipt");
      } else if (!newPin.includes("")) {
        setSnackbarOpen(true);
        setPin(["", "", "", "", "", ""]);
        setTimeout(() => {
          const firstInput = document.getElementById("pin-0");
          if (firstInput) firstInput.focus();
        }, 0);

      }
    }
  };

  console.log("Now Entering PIN - localStorage Data:", localStorage);

  return (
    <div className="min-h-screen bg-[#fffdf9] pb-32 space-y-6 max-w-[412px] mx-auto font-[Inter] relative">
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
            Masukkan PIN
          </div>
        </div>
      </div>

      {/* PIN Input */}
      <div className="flex justify-center space-x-3 mt-32" data-pin-input>
        {pin.map((digit, index) => (
          <input
            key={index}
            id={`pin-${index}`}
            type="password"
            className="pin-input pin-input-underline w-12 h-12 text-center text-lg"
            placeholder="○"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            inputMode="none"
            onFocus={(e) => e.target.blur()}
          />
        ))}
      </div>

      {/* Custom Keyboard */}
      <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto mt-32">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "←"].map((key, idx) => (
          <button
            key={idx}
            disabled={key === ""}
            className="h-12 bg-[#f5f0e1] text-[#6f4e37] text-lg font-bold rounded"
            onClick={() => {
              if (key === "←") {
                const lastFilledIndex = pin.findIndex((d) => d === "");
                const indexToClear =
                  lastFilledIndex === -1 ? pin.length - 1 : lastFilledIndex - 1;
                if (indexToClear >= 0) {
                  const newPin = [...pin];
                  newPin[indexToClear] = "";
                  setPin(newPin);
                  document.getElementById(`pin-${indexToClear}`)?.focus();
                }
              } else {
                const index = pin.findIndex((d) => d === "");
                if (index !== -1) {
                  const newPin = [...pin];
                  newPin[index] = `${key}`;
                  setPin(newPin);
                  if (index < pin.length - 1)
                    document.getElementById(`pin-${index + 1}`)?.focus();

                  if (newPin.join("") === "123456") {
                    if (newPin.join("") === "123456") {
                      const orderId = `A${Math.floor(Math.random() * 100000)}`; // Generate Order ID
                      localStorage.setItem("orderId", orderId); // Store the order ID
                      localStorage.setItem("tableName", selectedTable); // Store the selected table
                      localStorage.setItem(
                        "reservationDate",
                        dayjs(selectedDate).format("DD MMMM YYYY")
                      ); // Store reservation date
                      localStorage.setItem(
                        "reservationTime",
                        `${startTime} - ${endTime}`
                      ); // Store time
                      localStorage.setItem("orderItems", JSON.stringify(items)); // Store the order items

                      const orderData = {
                        orderId: `A${Math.floor(Math.random() * 100000)}`, // Generate Order ID
                        tableName: selectedTable, // Table selected
                        reservationDate: dayjs(selectedDate).format("DD MMMM YYYY"), // Selected date formatted
                        reservationTime: `${startTime} - ${endTime}`, // Start and end time
                        orders: items, // Items array
                      };

                      // Store order data in localStorage
                      localStorage.setItem(
                        "orderData",
                        JSON.stringify(orderData)
                      );

                      navigate("/receipt"); // Navigate to the receipt page
                    }

                    navigate("/receipt");
                  } else if (!newPin.includes("")) {
                    setSnackbarOpen(true);
                    setPin(["", "", "", "", "", ""]);
                    setTimeout(() => {
                      const firstInput = document.getElementById("pin-0");
                      if (firstInput) firstInput.focus();
                    }, 0);
                  }
                }
              }
            }}
          >
            {key}
          </button>
        ))}
      </div>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ top: 100 }}
      >
        <Alert severity="error">PIN salah</Alert>
      </Snackbar>
    </div>
  );
};

export default Pin;
