// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Pagination, Autoplay } from "swiper/modules";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

const images = ["/carousel/c1.jpg", "/carousel/c2.jpg", "/carousel/c3.jpg"];

const Home = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const swiperRef = useRef<SwiperType | null>(null);

  const updateHeaderColor = (index: number) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = images[index];
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const sampleWidth = 10;
        canvas.width = sampleWidth;
        canvas.height = 1;

        const ctx = canvas.getContext("2d");
        const sx = Math.floor(img.width / 2) - sampleWidth / 2;

        ctx?.drawImage(img, sx, 0, sampleWidth, 1, 0, 0, sampleWidth, 1);
        const imageData = ctx?.getImageData(0, 0, sampleWidth, 1).data;

        if (!imageData) return;

        let r = 0,
          g = 0,
          b = 0;
        const length = imageData.length / 4;

        for (let i = 0; i < imageData.length; i += 4) {
          r += imageData[i];
          g += imageData[i + 1];
          b += imageData[i + 2];
        }

        r = Math.floor(r / length);
        g = Math.floor(g / length);
        b = Math.floor(b / length);

        setHeaderColor(`rgb(${r}, ${g}, ${b})`);
      } catch (err) {
        console.error("Color sampling failed:", err);
        setHeaderColor("#F5F0E1");
      }
    };
  };

  useEffect(() => {
    updateHeaderColor(0); // Set initial color
  }, []);

  const menuItems = [
    {
      id: 1,
      name: "Latte Kejar Deadline",
      price: 20000,
      image: "/latte-kejar.png",
    },
    {
      id: 2,
      name: "Cappucino Hanupis",
      price: 15000,
      image: "/cappucino.png",
    },
  ];

  const [cart, setCart] = useState<{ [id: number]: number }>({});

  const addToCart = (id: number) => {
    setCart((prev) => ({ ...prev, [id]: 1 }));
  };

  const updateQty = (id: number, delta: number) => {
    setCart((prev) => {
      const newQty = (prev[id] || 0) + delta;
      if (newQty <= 0) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [id]: _removed, ...rest } = prev;

        return rest;
      }
      return { ...prev, [id]: newQty };
    });
  };

  const total = menuItems.reduce(
    (sum, item) => sum + (cart[item.id] || 0) * item.price,
    0
  );

  const handleNavigateToConfirm = () => {
    localStorage.setItem("orderItems", JSON.stringify(menuItems));
    localStorage.setItem("orderTotal", total.toString());
    localStorage.setItem("cartItems", JSON.stringify(cart));
    navigate("/confirm");
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] pt-6 pb-24 space-y-6 font-[Inter] max-w-[412px] mx-auto">
      {/* 🔄 Dynamic Search Bar Container */}
      <div
        className="w-full h-[72px] transition-colors duration-500 -mt-6 mb-0 pt-4 pb-16 px-4"
        style={{ backgroundColor: headerColor }}
      >
        <div className="w-full h-12 bg-[#fffdf9] rounded-lg shadow-[0px_4px_4px_rgba(0,0,0,0.25)] outline outline-1 outline-offset-[-1px] outline-[#cbb99d] flex items-center px-4 space-x-3 overflow-hidden">
          <Icon
            icon="material-symbols:search"
            className="text-[#cbb99d] text-xl"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Latte Kejar Deadline"
            className="flex-1 text-[#a89f94] text-base bg-transparent outline-none font-[Inter] placeholder-[#a89f94]"
          />
        </div>
      </div>

      {/* Carousel */}
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet custom-bullet",
          bulletActiveClass:
            "swiper-pagination-bullet-active custom-bullet-active",
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        spaceBetween={16}
        slidesPerView={1}
        className="rounded-b-xl h-56"
        onSlideChange={(swiper) => updateHeaderColor(swiper.realIndex)}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {images.map((src, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={src}
              className="w-full h-full object-cover rounded-b-xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="relative z-10 -mt-12 bg-[#fffdf9] px-4 py-4 rounded-lg shadow-[0px_4px_4px_rgba(0,0,0,0.25)] space-y-0 flex items-center justify-between gap-4 mx-4">
        {/* Gopay & Balance */}
        <div className="w-20 flex flex-col items-start gap-1">
          <img
            src="/gopay-logo.png"
            alt="gopay"
            className="h-6 w-full object-contain"
          />
          <div className="text-[#6F4E37] text-[14px] font-[Inter]">
            Rp 100.000
          </div>
        </div>

        {/* Divider */}
        <div className="w-px h-10 bg-[#f5f0e1]" />

        {/* Actions */}
        <div className="flex gap-6">
          {/* Top Up */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 bg-[#cbb99d] rounded-sm flex items-center justify-center">
              <Icon
                icon="mingcute:plus-fill"
                className="text-[#f5f0e1] text-xl"
              />
            </div>
            <div className="text-[#6F4E37] text-xs font-bold text-center">
              Top Up
            </div>
          </div>

          {/* Bayar */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 bg-[#cbb99d] rounded-sm flex items-center justify-center">
              <Icon
                icon="majesticons:qr-code"
                className="text-[#f5f0e1] text-xl"
              />
            </div>
            <div className="text-[#6F4E37] text-xs font-bold text-center">
              Bayar
            </div>
          </div>

          {/* Pesanan */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 bg-[#cbb99d] rounded-sm flex items-center justify-center">
              <Icon
                icon="fluent:receipt-24-filled"
                className="text-[#f5f0e1] text-xl"
              />
            </div>
            <div className="text-[#6F4E37] text-xs font-bold text-center">
              Pesanan
            </div>
          </div>
        </div>
      </div>

      <div className="px-4">
        {/* Section Header */}
        <div>
          <h2
            style={{ fontFamily: "Quicksand, sans-serif" }}
            className="text-[#6F4E37] text-2xl font-bold"
          >
            Pesan Lagi
          </h2>

          <p className="w-96 text-[#cbb99d] text-base font-normal font-[Inter] mb-2">
            Paling sering kamu pesan
          </p>
        </div>

        {/* Favorite Items */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 justify-center">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="w-44 p-4 bg-[#f5f0e1] rounded-lg inline-flex flex-col justify-center items-center gap-2 overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.name}
                className="self-stretch h-28 object-cover rounded"
              />

              <div className="self-stretch flex flex-col items-start gap-0.5">
                <div className="text-[#6f4e37] text-base font-bold font-[Quicksand]">
                  {item.name}
                </div>
                <div className="text-[#cbb99d] text-xs font-normal font-[Inter]">
                  Rp {item.price.toLocaleString("id-ID")}
                </div>
              </div>

              {cart[item.id] ? (
                <div className="self-stretch h-8 bg-[#f5f0e1] rounded-lg outline outline-1 outline-[#2d2d2d] flex items-center justify-between px-2">
                  <button
                    onClick={() => updateQty(item.id, -1)}
                    className="w-8 h-8 flex items-center justify-center"
                  >
                    <Icon icon="mdi:minus" className="text-[#6f4e37] text-xl" />
                  </button>

                  <div className="text-[#2d2d2d] text-base">
                    {cart[item.id]}
                  </div>

                  <button
                    onClick={() => updateQty(item.id, 1)}
                    className="w-8 h-8 flex items-center justify-center"
                  >
                    <Icon icon="mdi:plus" className="text-[#6f4e37] text-xl" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => addToCart(item.id)}
                  className="self-stretch h-8 relative bg-[#cbb99d] rounded-sm overflow-hidden text-[#f5f0e1] text-s font-normal font-[Inter] flex items-center justify-center active:scale-[0.98] hover:brightness-95 transition-all duration-150"
                >
                  Pesan
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      {Object.keys(cart).length > 0 && (
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[412px] bg-[#cbb99d] rounded-t-lg p-3 space-y-2 z-10">
          <div className="text-center text-[#6f4e37] text-base">
            Total{" "}
            <span className="font-bold">
              Rp {total.toLocaleString("id-ID")}
            </span>
          </div>
          <button
            onClick={handleNavigateToConfirm}
            className="w-full p-4 bg-[#6f4e37] text-[#f5f0e1] rounded-lg font-bold flex justify-center items-center gap-2"
          >
            Selanjutnya
            <Icon icon="ooui:next-ltr" className="text-[#f5f0e1] text-xl" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
