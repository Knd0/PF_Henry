import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "../Home/Home.module.css"
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import Slider from "../Slider/Slider";
import PRUEBA from "./Img/PRUEBA.jpg"
import PRUEBA2 from "./Img/PRUEBA2.jpg"
import PRUEBA3 from "./Img/PRUEBA3.jpg"
import { getCars } from "../../Redux/actions";
import Card from "../Card/Card";
import { Link } from "react-router-dom";



export default function Home() {
  const dispatch = useDispatch()
  const allCars = useSelector((state) => state.cars)
  useEffect(() => {
    dispatch(getCars())
  }, [dispatch])
  const images = [
    PRUEBA,
    PRUEBA2,
    PRUEBA3
  ];

  return (
    <>
      <Navbar />
      <div className={style.containerSlider}>
        <Slider images={images}></Slider>
      </div>
      <hr className={style.hr} />
      <div class="flex justify-center">
        {
          allCars.slice(0, 3).map(e => <Link to={`/cars/${e.id}`}>
            <Card
              id={e.id}
              brand={e.brand}
              img={e.img}
              model={e.model}
              year={e.year}
              price={e.price}
            />
          </Link>)
        }
      </div>
      <div class="flex justify-end mr-40">
        <Link to="/cars"><button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">See more...</button></Link>
      </div>
      <Footer />

    </>
  );
}
