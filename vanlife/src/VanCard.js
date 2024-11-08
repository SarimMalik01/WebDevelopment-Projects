import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Context } from "./GlobalContext/Context";
import { FaHeart, FaTrash } from 'react-icons/fa';
import "./css/VanCard.css";

function VanCard() {
    const { id } = useParams(); 
    const { data, addFavourite } = useContext(Context); 
    const [van, setVan] = useState(null);
    const [buttonstate, setButton] = useState(true);
    
    useEffect(() => {
        if (data && data.length > 0) {
            const selectedVan = data.find((van) => van.id == parseInt(id));
            setVan(selectedVan || null);
        }
    }, [id, data]); 

    function FavbuttonClick(buttonstate, id) {
        setButton((prevstate) => !prevstate);
        addFavourite(buttonstate, id);
    }

    if (!van) return <div>Loading...</div>;

    return (
        <div className="VanCard">
            <Link to="/vans/ExploreVans" className="back-link">
                <p>← Back to all Vans</p>
            </Link>
            <div className="Van-Card-Content">
                <img className="Van-Image" src={van.image} alt={van.title} />
                <div className="Van-Details">
                    <div className="Buttons">
                        <button className="Van-Type">{van.type}</button>
                        <button
                            className={`FavButton ${buttonstate ? 'add' : 'remove'}`}
                            onClick={() => FavbuttonClick(buttonstate, van.id)}
                        > {buttonstate ? <FaHeart /> : <FaTrash />}
                            {buttonstate ? "Add to Favourite Vans" : "Remove from Favourite Vans"}
                        </button>
                    </div>
                    <h1 className="Van-Title">{van.title}</h1>
                    <h2 className="Van-Price">${van.price}/day</h2>
                    <p className="Van-Description">{van.description}</p>
                </div>
                <button className="Rent-Button">Rent your van today</button>
            </div>
        </div>
    );
}

export default VanCard;