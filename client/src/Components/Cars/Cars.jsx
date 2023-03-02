import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import style from "../Cars/Cars.module.css"
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination"
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { getCars, cleanState } from "../../Redux/actions";
import { getCars, cleanState, orderByAlf,filterByBrand,filterByYear,orderByKM,orderByPrice} from "../../Redux/actions";
import Search from "../Search/Search";

export default function Cars() {
    const dispatch = useDispatch()
    const allcars = useSelector ((state) => state.cars)
   const [currentPage, setCurrentPage] = useState(1)
    const [carsPerPage, setCountriesPerPage] = useState(8)
    const indexOfLastCar = currentPage * carsPerPage
    const indexOfFirstCar = indexOfLastCar - carsPerPage 
    const currentCars = allcars.slice(indexOfFirstCar,indexOfLastCar) 
    const [order, setOrder] = useState("");
    const cars = useSelector((state) => state.allcars);
  

    const page = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(cleanState());
        dispatch(getCars())
    }, [dispatch]);


    function handleSortAlf(e) {
        e.preventDefault();
        dispatch(orderByAlf(e.target.value));
        setOrder(`Order ${e.target.value}`)
        setCurrentPage(1);
      
    }
    function handleFilteredBrand(e) {
        dispatch(filterByBrand(e.target.value));
        setOrder(`Order ${e.target.value}`)
        setCurrentPage(1);
    }

    function handleFilteredYear(e) {
        dispatch(filterByYear(e.target.value));
      setOrder(`Order ${e.target.value}`)
      setCurrentPage(1);
    }

    /* function handleSortAlf(e) {
        e.preventDefault();
        dispatch(orderByAlf(e.target.value));
        setOrder(`Order ${e.target.value}`)
      
    } */
 
    function handleSortKM(e) {
        e.preventDefault();
        dispatch(orderByKM(e.target.value));
        setOrder(`Order ${e.target.value}`)
        setCurrentPage(1);
    }

    function handleSortPrice(e) {
        e.preventDefault();
        dispatch(orderByPrice(e.target.value));
        setOrder(`Order ${e.target.value}`)
        setCurrentPage(1);
    }


    return (
        <>
        <Navbar />
        <Filters />
        <div className={style.filtros}>
        <div>
             Order alphabetically:
            <select className={style.select} onChange={(e) => handleSortAlf(e)}>
                
                <option value="atoz">A - Z</option>
                <option value="desc">Z - A</option>
            </select> 
        </div> 
        <div>
            Order by price:
            <select className={style.select} onChange={(e) => handleSortPrice(e)}>
                <option value="mayp">Minor to Major</option>
                <option value="menp">Major to Minor</option>
            </select>
        </div>
        <div>
            Order by KM:
            <select className={style.select} onChange={(e) => handleSortKM(e)}>
                <option value="All">All</option>
                <option value="mayp">Minor to Major</option>
                <option value="menp">Major to Minor</option>
            </select>
        </div>
        <div>
            Filter by year:
            <select className={style.select} onChange={e => handleFilteredYear(e)}>
                <option value="All">All</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
            </select>
        </div>
        <div>
            Filter by brand:
            <select className={style.select} onChange={e => handleFilteredBrand(e)}>
                <option value="All">All</option>
                   {cars?.map((c) => {
                    return <option >{c.brand}</option>
                    
                    })}
            </select>
        </div>
    </div>
      <div>
      <Search/>
      </div>
        <div className={style.cardconteiner}>
            {currentCars.length ? (
            currentCars.map((e) => {
                return (
                <div>
                    <Link to={`cars/${e.id}`}>
                    <Card
                        id={e.id}
                        brand={e.brand}
                        img={e.img}
                        model={e.model}
                        year={e.year}
                        price={e.price}
                    />
                    </Link>
                </div>
                );
            })
            ) : (
            <div>
                <h3>Loading...</h3>
            </div>
            )}
        </div>
        <Pagination
        carsPerPage = {carsPerPage}
        allcars = {allcars.length}
        page = {page}
        />
        <Footer />
        </>
    );
}
