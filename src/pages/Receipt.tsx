import React from "react";
import { Icon } from "@iconify/react";
import { QRCode } from "react-qrcode-logo"; // QR code generator library
import { jsPDF } from "jspdf";

interface OrderItem {
  name: string;
  image: string;
  quantity: number;
  price: string;
}

const orderId = localStorage.getItem("orderId") || "";
const tableName = localStorage.getItem("tableName") || "";
const reservationDate = localStorage.getItem("reservationDate") || "";
const reservationTime = localStorage.getItem("reservationTime") || "";
const orders: OrderItem[] = JSON.parse(
  localStorage.getItem("orderItems") || "[]"
);

console.log("Order ID:", orderId);
console.log("Table Name:", tableName);
console.log("Reservation Date:", reservationDate);
console.log("Reservation Time:", reservationTime);
console.log("Orders:", orders);


// Add a function to generate and download the PDF
const generatePDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text("Bukti Transaksi", 20, 20);

  doc.setFontSize(12);
  doc.text(`Order ID: ${orderId}`, 20, 40);
  doc.text(`Table: ${tableName}`, 20, 50);
  doc.text(`Date: ${reservationDate}`, 20, 60);
  doc.text(`Time: ${reservationTime}`, 20, 70);

  // Add ordered items
  let yPosition = 80;
  orders.forEach((item: OrderItem) => {
    doc.text(`${item.name} - ${item.quantity}x - ${item.price}`, 20, yPosition);
    yPosition += 10;
  });

  // Save as PDF
  doc.save("receipt.pdf");
};


const Receipt: React.FC = () => {
  const qrCodeValue = `Order ID: ${orderId}`;

  console.log("Now Entering Receipt localStorage Data:", localStorage);
  console.log("Order ID:", orderId);
  console.log("Table Name:", tableName);
  console.log("Reservation Date:", reservationDate);
  console.log("Reservation Time:", reservationTime);
  console.log("Orders:", orders);

  return (
    <div className="min-h-screen bg-[#fffdf9] pb-32 space-y-6 max-w-[412px] mx-auto font-[Inter] relative">
      {/* Header */}
      <div className="w-full h-20 bg-[#f5f0e1] rounded-b-lg p-4 flex items-center gap-2">
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
          className="w-6 h-6 flex items-center justify-center"
        >
          <Icon
            icon="material-symbols:arrow-back-rounded"
            className="text-[#6f4e37] text-xl"
          />
        </button>
        <div className="flex-1 flex flex-col items-center">
          <div className="text-[#6f4e37] font-bold text-base font-[Quicksand]">
            Bukti Transaksi
          </div>
        </div>
      </div>

      <div className="px-4">
        {/* Heading */}
        <div className="text-center mt-6">
          <h1 className="text-[#6f4e37] text-2xl font-bold font-[Quicksand]">
            Transaksi Berhasil
          </h1>
          <p className="text-[#cbb99d] text-base">
            Makasih, ya! Semangat kejar deadline 🔥
          </p>
        </div>

        {/* QR Code */}
        <div className="flex justify-center mt-4">
          <QRCode
            value={qrCodeValue}
            size={200}
            bgColor="#fffdf9"
            fgColor="#6f4e37"
            qrStyle="dots"
            eyeRadius={10}
          />
        </div>
        <p className="text-center text-[#a89f94] text-base mt-2">
          Scan kode QR saat masuk cafe
        </p>

        {/* Order Details */}
        <div className="bg-[#cbb99d] rounded-lg p-6 mt-4 space-y-4">
          <div className="flex items-center gap-2">
            <Icon
              icon="fluent:receipt-24-filled"
              className="text-[#6f4e37] text-xl"
            />
            <span className="text-[#6f4e37] text-base font-bold">
              #{orderId}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Icon
              icon="ic:baseline-table-restaurant"
              className="text-[#6f4e37] text-xl"
            />
            <span className="text-[#6f4e37] text-base">{tableName}</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon
              icon="lets-icons:date-fill"
              className="text-[#6f4e37] text-xl"
            />
            <span className="text-[#6f4e37] text-base">
              {reservationDate}, {reservationTime}
            </span>
          </div>
        </div>

        {/* Ordered Items */}
        <div className="bg-[#f5f0e1] rounded-lg p-4 mt-4">
          <h2 className="text-center text-[#cbb99d] text-base mb-2">
            Pesanan Saya
          </h2>
          {orders.map((item, index) => (
            <div key={index} className="flex items-center gap-4 py-2">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-16 shadow-md"
              />
              <div className="flex-1">
                <h3 className="text-[#6f4e37] text-base font-bold font-[Quicksand]">
                  {item.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-[#cbb99d] text-xs font-bold">
                    {item.quantity}x
                  </span>
                  <span className="text-[#cbb99d] text-xs">{item.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer with Download PDF button */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[412px] bg-[#cbb99d] rounded-t-lg p-3 space-y-2 z-10">
        <button
          onClick={generatePDF}
          className="w-full p-4 bg-[#6f4e37] text-[#f5f0e1] rounded-lg font-bold flex justify-center items-center gap-2"
        >
          Download PDF Receipt
          <Icon icon="ooui:next-ltr" className="text-[#f5f0e1] text-xl" />
        </button>
      </div>
    </div>
    
  );
};

export default Receipt;
