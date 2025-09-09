import { Swiper, SwiperSlide } from "swiper/react";
import Slide1 from "../../assets/sperateimg/slide1.png";
import Slide2 from "../../assets/sperateimg/slide2.png";
import Slide3 from "../../assets/sperateimg/slide3.png";
import Slide4 from "../../assets/sperateimg/slide4.png";

import Slide5 from "../../assets/sperateimg/slide5.png";

import Slide6 from "../../assets/sperateimg/slide6.png";
import Slide7 from "../../assets/sperateimg/slide7.png";

import SevenUpDown from '../../assets/sperateimg/7up-down.png'
import Rouletee from '../../assets/sperateimg/rouletee.png'
import TeenPatti from '../../assets/sperateimg/teen-patti.png'
import Beccarat from '../../assets/sperateimg/baccarat.png'
import DragonTiger from '../../assets/sperateimg/dragontiger.png'
import CricketWar from '../../assets/sperateimg/criketwar.png'

import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";

import HoreseBlack from "../../assets/sperateimg/horse-black.png";

import BlackHound from "../../assets/sperateimg/blackhound.png";
import AlarmIcon from "../../assets/sperateimg/alarmIcon.png";
import BlackCricket from "@/assets/sperateimg/cricketBlack.png";
import BlackTennis from "@/assets/sperateimg/blackRocket.png";
import BlackSoccer from "@/assets/sperateimg/blackSoccer.png";
import BlackSportBook from "@/assets/sperateimg/blackSportBook.png";
export const DashboardContent = () => {
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
  return (
    <div className="w-100 bg-white h-100">
      <div className="left-content" id="cust-wallet">
        <div className="table-wrap d-flex gap-4">
          <div
            className="table-box-header d-flex gap-4"
            style={{ display: "flex", gap: "30px",backgroundColor:"green" }}
          >
            <span>Credit: 0</span>
            <span className="runrate">Balance: 1,000</span>
            <span className="runrate">Liable: 0</span>
            <span className="runrate">Active Bets: 0</span>
          </div>
        </div>
      </div>

      <div className="barely-slider h-100">
        <Swiper
          spaceBetween={10}
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
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            576: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 3,
            },

            1024: {
              slidesPerView: 4,
            },

            1200: {
              slidesPerView: 5,
            },
          }}
        >
          {products.map((product, index) => (
            <SwiperSlide
              key={index}
              style={{
                display: "flex",
                width: "215px",
                justifyContent: "center",
              }}
            >
              <img
                src={product}
                alt="ada"
                className="ratio-1x1 object-cover img-position-center img-fluid"
                style={{width:"210px"}}
              />
            </SwiperSlide>
          ))}
          <div className="swiper-button-next">{/* <BsChevronRight /> */}</div>
          <div className="swiper-button-prev">{/* <BsChevronLeft /> */}</div>
        </Swiper>
      </div>

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
            320: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            576: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 4,
            },

            1024: {
              slidesPerView: 5,
            },

            1200: {
              slidesPerView: 6,
            },
          }}
        >
          {timeSchedule.map((product, index) => (
            <SwiperSlide
              key={index}
              style={{
                // display: "",
                width: "215px",
                // justifyContent: "center",
              }}
            >
              <div
                className="d-flex flex-column justify-content-center text-center"
                style={{ borderLeft: "1px solid #fff" }}
              >
                <div>{product.time}</div>
                <div>{product.slideName}</div>
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-button-next">{/* <BsChevronRight /> */}</div>
          <div className="swiper-button-prev">{/* <BsChevronLeft /> */}</div>
        </Swiper>
      </div>

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
            320: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            576: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 4,
            },

            1024: {
              slidesPerView: 5,
            },

            1200: {
              slidesPerView: 6,
            },
          }}
        >
          {timeSchedule.map((product, index) => (
            <SwiperSlide
              key={index}
              style={{
                // display: "",
                width: "215px",
                // justifyContent: "center",
              }}
            >
              <div
                className="d-flex flex-column justify-content-center text-center"
                style={{ borderLeft: "1px solid #fff" }}
              >
                <div>{product.time}</div>
                <div>{product.slideName}</div>
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-button-next">{/* <BsChevronRight /> */}</div>
          <div className="swiper-button-prev">{/* <BsChevronLeft /> */}</div>
        </Swiper>
      </div>

      <div className="w-100 py-2 d-flex gap-3">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            backgroundColor: "#F04141",
            width: "65px",
            height: "65px",
            borderRadius: "5px",
          }}
        >
          <div className="text-center">
            <img
              src={AlarmIcon}
              alt="jjdk"
              width={30}
              className=""
              height={30}
            />
            <div className="text-white">Inplay</div>
          </div>
        </div>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            backgroundColor: "#D9D9D9",
            width: "65px",
            height: "65px",
            borderRadius: "5px",
          }}
        >
          <div className="text-center">
            <img
              src={BlackCricket}
              alt="jjdk"
              width={30}
              className=""
              height={30}
            />
            <div className="text-black">Cricket</div>
          </div>
        </div>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            backgroundColor: "#D9D9D9",
            width: "65px",
            height: "65px",
            borderRadius: "5px",
          }}
        >
          <div className="text-center">
            <img
              src={BlackTennis}
              alt="jjdk"
              width={30}
              className=""
              height={30}
            />
            <div className="text-black">Tennis</div>
          </div>
        </div>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            backgroundColor: "#D9D9D9",
            width: "65px",
            height: "65px",
            borderRadius: "5px",
          }}
        >
          <div className="text-center">
            <img
              src={BlackSoccer}
              alt="jjdk"
              width={30}
              className=""
              height={30}
            />
            <div className="text-black">Soccer</div>
          </div>
        </div>

        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            backgroundColor: "#D9D9D9",
            width: "65px",
            height: "65px",
            borderRadius: "5px",
          }}
        >
          <div className="text-center">
            <img
              src={BlackSportBook}
              alt="jjdk"
              width={30}
              className=""
              height={30}
            />
            <div className="text-black lh-sm">Sports Book</div>
          </div>
        </div>
      </div>

      <div className="py-2 px-2" style={{ backgroundColor: "#AEAEAE" }}>
        <div className="row">
          <div className="col-md-5">
            <div className="d-flex">
              <img src={BlackCricket} alt="jjd" width={20} height={20} />
              <h5>Cricket</h5>
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

        <div
          className=" d-flex align-items-center gap-4"
          style={{ backgroundColor: "#ffff" }}
        >
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
          <div className="text-bold" style={{ fontWeight: "bold" }}>
            Zimbabwe v Sri Lanka
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-5">
          <div>
            <div>
              <img src={BlackSoccer} alt="jadj" />
            </div>
            <div>FootBall</div>
          </div>
        </div>
      </div>
    </div>
  );
};
