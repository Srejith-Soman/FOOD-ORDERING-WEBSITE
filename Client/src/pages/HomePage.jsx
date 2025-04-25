import React, { useEffect, useState } from "react";
import { getFoods } from "../services/foodApi";
import { addToCart } from "../services/cartApi";
import { toast } from "sonner";

function Home() {
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        getFoods()
            .then((res) => {
                console.log(res?.data);
                setFoods(res?.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleAddToCart = (id)=>{
        addToCart(id).then((res)=>{
            console.log(res)
            toast.success("Product added to cart")
        }).catch((err) => {
            console.log(err);
            toast.error(err.response.data.error)

        })
    }

    return (
        <div>
            <div className="carousel w-full pb-8">
                <div id="slide1" className="carousel-item relative w-full ">
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
                        className="w-full"
                    />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide4" className="btn btn-circle">
                            ❮
                        </a>
                        <a href="#slide2" className="btn btn-circle">
                            ❯
                        </a>
                    </div>
                </div>
                <div id="slide2" className="carousel-item relative w-full">
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp"
                        className="w-full"
                    />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide1" className="btn btn-circle">
                            ❮
                        </a>
                        <a href="#slide3" className="btn btn-circle">
                            ❯
                        </a>
                    </div>
                </div>
                <div id="slide3" className="carousel-item relative w-full">
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
                        className="w-full"
                    />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide2" className="btn btn-circle">
                            ❮
                        </a>
                        <a href="#slide4" className="btn btn-circle">
                            ❯
                        </a>
                    </div>
                </div>
                <div id="slide4" className="carousel-item relative w-full">
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
                        className="w-full"
                    />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide3" className="btn btn-circle">
                            ❮
                        </a>
                        <a href="#slide1" className="btn btn-circle">
                             ❯
                        </a>
                    </div>

                </div>
            </div>

            <div className="grid grid-cols-5 pl-10 gap-5 ">
                {foods.map((food) => (
                    <div key={food?._id} className="card bg-base-100 h-80 w-80  shadow-xl">
                        <figure className="w-70 h-60">
                            <img className="w-80 h-50" src={food.image} alt="food" />
                        </figure>
                        <div className="card-body h-35 p-0 m-2">
                            <h2 className="card-title">{food?.title}</h2>
                            <p>{food?.description}</p>
                            <p>Price {food.price}</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary" onClick={()=>handleAddToCart(food._id)}>Add To Cart</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
