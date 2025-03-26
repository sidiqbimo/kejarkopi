import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const Pin = () => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPin = e.target.value;
    setPin(newPin);

    if (newPin.length === 6) {
      if (newPin === "123456") {
        navigate("/receipt");
      } else {
        setError(true);
        setPin("");
      }
    }
  };

  const handleCloseSnackbar = () => {
    setError(false);
  };

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
            Masukkan PIN
          </div>
        </div>
      </div>

      {/* PIN Input */}
      <div className="space-y-4">
        <label className="text-[#6f4e37] text-base">PIN</label>
        <input
          type="password"
          value={pin}
          onChange={handlePinChange}
          onCopy={(e) => e.preventDefault()}
          onPaste={(e) => e.preventDefault()}
          maxLength={6}
          className="w-full h-14 px-4 py-2 bg-white rounded-lg border border-[#6f4e37] text-[#6f4e37] text-center text-xl tracking-widest"
        />
      </div>

      {/* Error Snackbar */}
      <Snackbar
        open={error}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          PIN salah
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Pin;
