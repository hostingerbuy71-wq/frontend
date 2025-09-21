import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

// Swiper
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";

// Assets
import Slide1 from "../../assets/sperateimg/slide1.png";
import Slide2 from "../../assets/sperateimg/slide2.png";
import Slide3 from "../../assets/sperateimg/slide3.png";
import Slide4 from "../../assets/sperateimg/slide4.png";
import Slide5 from "../../assets/sperateimg/slide5.png";
import Slide6 from "../../assets/sperateimg/slide6.png";
import Slide7 from "../../assets/sperateimg/slide7.png";

import SevenUpDown from "../../assets/sperateimg/7up-down.png";
import Rouletee from "../../assets/sperateimg/rouletee.png";
import TeenPatti from "../../assets/sperateimg/teen-patti.png";
import Beccarat from "../../assets/sperateimg/baccarat.png";
import DragonTiger from "../../assets/sperateimg/dragontiger.png";
import CricketWar from "../../assets/sperateimg/criketwar.png";

import HoreseBlack from "../../assets/sperateimg/horse-black.png";
import BlackHound from "../../assets/sperateimg/blackhound.png";

import AlarmIcon from "../../assets/sperateimg/alarmIcon.png";
import BlackCricket from "@/assets/sperateimg/cricketBlack.png";
import BlackTennis from "@/assets/sperateimg/blackRocket.png";
import BlackSoccer from "@/assets/sperateimg/blackSoccer.png";
import BlackSportBook from "@/assets/sperateimg/blackSportBook.png";

// Define API base once for this module
const API_BASE = (import.meta.env.VITE_BACKEND_URL || '').replace(/\/$/, '');

export const DashboardContent = () => {
  const [selected, setSelected] = useState("inplay");
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Responsive: track viewport width
  const [vw, setVw] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!API_BASE || !token) return;
    fetch(`${API_BASE}/api/auth/profile`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => (r.ok ? r.json() : null))
      .then(res => { if (res?.success && res?.data?.user) setUser(res.data.user); })
      .catch(() => {});
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      navigate('/login');
    } catch (e) {
      console.error('Logout failed', e);
      navigate('/login');
    }
  };

  // Values used by the dropdown UI
  const displayName = user?.fullName || user?.username || 'User';
  const initial = displayName?.[0]?.toUpperCase?.() || 'U';
  const goProfile = () => navigate('/user-dashboard');
  const goStatement = () => {};
  const goBalance = () => {};

  const products = [
    TeenPatti,
    SevenUpDown,
    Rouletee,
    Beccarat,
    DragonTiger,
    CricketWar,
    Rouletee,
    SevenUpDown,
  ];

  const timeSchedule = [
    { time: "6:35 PM", slideName: "Lingfield (GB)" },
    { time: "6:50 PM", slideName: "Cannington (AU)" },
    { time: "6:52 PM", slideName: "Durbanville (ZA)" },
    { time: "7:05", slideName: "Lingfield (GB)" },
    { time: "7:20", slideName: "Bath (GB)" },
    { time: "7:27", slideName: "Durbanville (ZA)" },
    { time: "7:35 PM", slideName: "Durbanville (ZA)" },
    { time: "8:40 PM", slideName: "Bath (GB)" },
  ];

  const sports = [
    { id: "inplay", label: "Inplay", icon: AlarmIcon, bg: "#F04141" },
    { id: "cricket", label: "Cricket", icon: BlackCricket, bg: "#D9D9D9" },
    { id: "tennis", label: "Tennis", icon: BlackTennis, bg: "#D9D9D9" },
    { id: "soccer", label: "Soccer", icon: BlackSoccer, bg: "#D9D9D9" },
    { id: "sportsbook", label: "Sports Book", icon: BlackSportBook, bg: "#D9D9D9" },
  ];

  return (
    <div className="w-100 bg-white h-100">
      {/* Wallet Info */}
      <div className="left-content" id="cust-wallet">
        <div className="table-wrap d-flex gap-4 "
             style={{
               width: '100%',
               background: '#121212'
             }}>
          <div
            className="dashboard-topbar"
            style={{
              position: 'sticky',
              top: 0,
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              background: '#121212',
              color: '#ffffff',
              padding: vw < 576 ? '6px 10px' : '8px 12px',
              borderRadius: '6px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.35)',
              flexWrap: 'wrap',
              gap: '8px 12px'
            }}
          >
            {/* Left: Close icon + Dashboard title */}
            <div className="">
              {/* <span style={{ fontSize: '18px', cursor: 'pointer', lineHeight: 1 }}>×</span> */}
              <Link to={'/user-dashboard'} className="mt-5 mt-md-0 ms-5 ms-md-0" style={{ fontSize: 'clamp(14px, 1.8vw, 18px)', fontWeight: 600, textDecoration: 'none', color: 'white' }}>Dashboard</Link>
            </div>

            {/* Center: Welcome message */}
            <div  className="text-center d-flex justify-content-center align-items-center" style={{ color: '#cfcfcf', fontSize: 'clamp(12px, 1.4vw, 14px)', display: vw < 576 ? 'none' : 'block' }}>Welcome To Premium Exchange !</div>

            {/* Right: Balance | loss | avatar | username */}
            <div style={{ display: 'flex', alignItems: 'center', gap: vw < 576 ? '8px' : '12px',  justifyContent: 'flex-end', minWidth: 220 }}>
              <span style={{ fontWeight: 600, fontSize: 'clamp(12px, 1.6vw, 14px)' }}>Bal: 1000</span>
              <span style={{ color: '#cfcfcf' }}>|</span>
              {vw >= 420 && <span style={{ fontSize: 'clamp(12px, 1.6vw, 14px)' }}>loss: 100</span>}

              <Dropdown align="end" drop={vw < 420 ? "down-centered" : "down"} popperConfig={{ strategy: 'fixed' }}>
                <Dropdown.Toggle
                  variant="outline-light"
                  size="sm"
                  id="user-menu-toggle"
                  style={{ display: 'flex', alignItems: 'center', gap: 8, borderColor: '#F04141', color: '#fff', backgroundColor: 'transparent', padding: vw < 576 ? '2px 6px' : '4px 8px' }}
                >
                  
                  <div
                    style={{
                      width: vw < 576 ? 24 : 28,
                      height: vw < 576 ? 24 : 28,
                      borderRadius: '50%',
                      overflow: 'hidden',
                      border: '2px solid #F04141',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: '#ffebe9',
                      color: '#F04141',
                      fontWeight: 700,
                      fontSize: vw < 576 ? 12 : 14
                    }}
                    aria-label="profile-avatar"
                    title="Profile"
                  >
                    {initial}
                  </div>
                  {vw >= 480 && <span style={{ fontSize: 12 }}>{displayName}</span>}
                </Dropdown.Toggle>
                <Dropdown.Menu variant="dark" className="user-menu" style={{ minWidth: vw < 420 ? 160 : 180, maxWidth: 220, zIndex: 2000 }}>
                   <Dropdown.Item onClick={goProfile} className="text-light">Profile</Dropdown.Item>
                   <Dropdown.Item onClick={goStatement} className="text-light">Statement</Dropdown.Item>
                   <Dropdown.Item onClick={goBalance} className="text-light">Balance</Dropdown.Item>
                   <Dropdown.Divider />
                   <Dropdown.Item onClick={handleLogout} className="text-light">Logout</Dropdown.Item>
                 </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>

      {/* Slider 1 */}
      <div className="barely-slider h-100 mt-4">
        <Swiper
          spaceBetween={6}
          slidesPerView="auto"
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          modules={[Autoplay, Navigation]}
          centeredSlides={false}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 4 },
            576: { slidesPerView: 2, spaceBetween: 6 },
            768: { slidesPerView: 3, spaceBetween: 6 },
            1024: { slidesPerView: 4, spaceBetween: 8 },
            1200: { slidesPerView: 4, spaceBetween: 8 },
          }}
        >
          {products.map((product, index) => (
            <SwiperSlide
              key={index}
              style={{
                display: "flex",
                width: "200px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={product}
                alt="product"
                className="img-fluid"
                style={{ width: "100%", height: "auto", objectFit: "contain" }}
              />
            </SwiperSlide>
          ))}
          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
        </Swiper>
      </div>

      {/* Horse Race */}
      <div className="d-flex align-items-center gap-3">
        <img src={HoreseBlack} alt="dad" />
        <h5>Horse Race</h5>
      </div>
      <div style={{ flex: 1, minWidth: 0 }} className="bg-black text-white">
        <Swiper
          spaceBetween={10}
          slidesPerView="auto"
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          modules={[Autoplay, Navigation]}
          centeredSlides={false}
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 10 },
            576: { slidesPerView: 3, spaceBetween: 10 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
            1200: { slidesPerView: 6 },
          }}
        >
          {timeSchedule.map((product, index) => (
            <SwiperSlide key={index} style={{ width: "215px" }}>
              <div
                className="d-flex flex-column justify-content-center text-center"
                style={{ borderLeft: "1px solid #fff" }}
              >
                <div>{product.time}</div>
                <div>{product.slideName}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Greyhound */}
      <div className="d-flex align-items-center gap-3">
        <img src={BlackHound} alt="dad" />
        <h5>Greyhound</h5>
      </div>
      <div style={{ flex: 1, minWidth: 0 }} className="bg-black text-white">
        <Swiper
          spaceBetween={10}
          slidesPerView="auto"
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          modules={[Autoplay, Navigation]}
          centeredSlides={false}
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 10 },
            576: { slidesPerView: 3, spaceBetween: 10 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
            1200: { slidesPerView: 6 },
          }}
        >
          {timeSchedule.map((product, index) => (
            <SwiperSlide key={index} style={{ width: "215px" }}>
              <div
                className="d-flex flex-column justify-content-center text-center"
                style={{ borderLeft: "1px solid #fff" }}
              >
                <div>{product.time}</div>
                <div>{product.slideName}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Sports Menu */}
      <div className="w-100 py-2 d-flex gap-3">
        {sports.map((sport) => (
          <div
            key={sport.id}
            onClick={() => setSelected(sport.id)}
            className="d-flex justify-content-center align-items-center"
            style={{
              backgroundColor: selected === sport.id ? "#F04141" : sport.bg,
              width: "65px",
              height: "65px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            <div className="text-center">
              <img src={sport.icon} alt={sport.label} width={30} height={30} />
              <div
                className={selected === sport.id ? "text-white" : "text-black"}
              >
                {sport.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dynamic Details Section */}
    {selected === "cricket" && (
  <div className="py-2 px-2" style={{ backgroundColor: "#AEAEAE" }}>
    <div className="row">
      <div className="col-md-5">
        <div className="d-flex">
          <img src={BlackCricket} alt="cricket" width={20} height={20} />
          <h5 className="ms-2">Cricket</h5>
        </div>
      </div>

      <div className="col-md-7">
        <div className="row">
          <div className="col-md-3">Matched</div>
          <div className="col-md-3">1</div>
          <div className="col-md-3">X</div>
          <div className="col-md-3">2</div>
        </div>
      </div>
    </div>

    <div className="d-flex align-items-center gap-4 mt-2 bg-white p-2">
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          backgroundColor: "#F04141",
          width: "60px",
          height: "60px",
        }}
      >
        <div className="text-center text-white">
          <div>Inplay</div>
          <div>1:45PM</div>
        </div>
      </div>
      <div className="fw-bold">Zimbabwe v Sri Lanka</div>
    </div>
  </div>
)}

{selected === "tennis" && (
  <div className="py-2 px-2" style={{ backgroundColor: "#AEAEAE" }}>
    <div className="row">
      <div className="col-md-5">
        <div className="d-flex">
          <img src={BlackTennis} alt="tennis" width={20} height={20} />
          <h5 className="ms-2">Tennis</h5>
        </div>
      </div>

      <div className="col-md-7">
        <div className="row">
          <div className="col-md-3">Set</div>
          <div className="col-md-3">Player A</div>
          <div className="col-md-3">Player B</div>
          <div className="col-md-3">Score</div>
        </div>
      </div>
    </div>

    <div className="d-flex align-items-center gap-4 mt-2 bg-white p-2">
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          backgroundColor: "#198754",
          width: "60px",
          height: "60px",
        }}
      >
        <div className="text-center text-white">
          <div>Live</div>
          <div>2nd Set</div>
        </div>
      </div>
      <div className="fw-bold">Nadal v Djokovic</div>
    </div>
  </div>
)}

{selected === "soccer" && (
  <div className="py-2 px-2" style={{ backgroundColor: "#AEAEAE" }}>
    <div className="row">
      <div className="col-md-5">
        <div className="d-flex">
          <img src={BlackSoccer} alt="soccer" width={20} height={20} />
          <h5 className="ms-2">Soccer</h5>
        </div>
      </div>

      <div className="col-md-7">
        <div className="row">
          <div className="col-md-3">Time</div>
          <div className="col-md-3">Home</div>
          <div className="col-md-3">Draw</div>
          <div className="col-md-3">Away</div>
        </div>
      </div>
    </div>

    <div className="d-flex align-items-center gap-4 mt-2 bg-white p-2">
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          backgroundColor: "#0d6efd",
          width: "60px",
          height: "60px",
        }}
      >
        <div className="text-center text-white">
          <div>Live</div>
          <div>75'</div>
        </div>
      </div>
      <div className="fw-bold">Barcelona v Real Madrid</div>
    </div>
  </div>
)}

{selected === "sportsbook" && (
  <div className="py-2 px-2" style={{ backgroundColor: "#AEAEAE" }}>
    <div className="row">
      <div className="col-md-5">
        <div className="d-flex">
          <img src={BlackSportBook} alt="sportsbook" width={20} height={20} />
          <h5 className="ms-2">Sports Book</h5>
        </div>
      </div>

      <div className="col-md-7">
        <div className="row">
          <div className="col-md-3">Event</div>
          <div className="col-md-3">Type</div>
          <div className="col-md-3">Odds</div>
          <div className="col-md-3">Market</div>
        </div>
      </div>
    </div>

    <div className="d-flex align-items-center gap-4 mt-2 bg-white p-2">
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          backgroundColor: "#6c757d",
          width: "60px",
          height: "60px",
        }}
      >
        <div className="text-center text-white">
          <div>Bet</div>
          <div>Open</div>
        </div>
      </div>
      <div className="fw-bold">Super Bowl Winner 2025</div>
    </div>
  </div>
)}

{selected === "inplay" && (
  <div className="py-2 px-2" style={{ backgroundColor: "#AEAEAE" }}>
    <div className="row">
      <div className="col-md-5">
        <div className="d-flex">
          <img src={AlarmIcon} alt="inplay" width={20} height={20} />
          <h5 className="ms-2">Inplay</h5>
        </div>
      </div>

      <div className="col-md-7">
        <div className="row">
          <div className="col-md-3">Game</div>
          <div className="col-md-3">Status</div>
          <div className="col-md-3">Score</div>
          <div className="col-md-3">Time</div>
        </div>
      </div>
    </div>

    <div className="d-flex align-items-center gap-4 mt-2 bg-white p-2">
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          backgroundColor: "#dc3545",
          width: "60px",
          height: "60px",
        }}
      >
        <div className="text-center text-white">
          <div>Live</div>
          <div>Running</div>
        </div>
      </div>
      <div className="fw-bold">India v Australia (Cricket)</div>
    </div>
  </div>
)}

    </div>
    </div>
  );
};
