import React, { useEffect, useState } from "react";
// GLIDE
import "@glidejs/glide/src/assets/sass/glide.core.scss";
import Glide from "@glidejs/glide";
// IMG's
import img_0 from "../assets/destination/image-moon.png";
import img_1 from "../assets/destination/image-mars.png";
import img_2 from "../assets/destination/image-europa.png";
import img_3 from "../assets/destination/image-titan.png";
// ICON
import loadingIcon from "../assets/shared/loading.png";

const Destination= ({ data }) => {
  const [destinations, setDestinations] = useState(null);
  let glide;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Realizamos la petición al archivo JSON
        const response = await fetch("https://raw.githubusercontent.com/ManukBASS/Space_Tourism/main/src/assets/JSON/data.json");
        const data = await response.json();

        // Actualizamos el estado con los destinos obtenidos
        setDestinations(data.destinations);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (destinations) {
      // Inicializamos el slider si ya tenemos los datos de los destinos
      glide = new Glide(".glide", {
        perView: 1,
        type: "carousel",
      });
      glide.mount();
    }
  }, [destinations]);

  const imgIndex = (index) => {
    switch (index) {
      case 0:
        return img_0;
      case 1:
        return img_1;
      case 2:
        return img_2;
      case 3:
        return img_3;
      default:
        return false;
    }
  };

  return (
    <div className="destination wrapper">
      {destinations ? (
        <div className="glide">
          <div className="glide__track" data-glide-el="track">
            <ul className="glide__slides">
              {destinations.map((item, index) => (
                <li className="glide__slide" key={index}>
                  <div className="content destin">
                    <div className="title-img">
                      <h1>
                        <span>0 1 </span> P I C K&nbsp;&nbsp;&nbsp;Y O U
                        R&nbsp;&nbsp;&nbsp;D E S T I N A T I O N
                      </h1>
                      <img src={imgIndex(index)} alt={item.name} />
                    </div>
                    <div className="wrapper-slider">
                      <div className="header-slider" data-glide-el="controls[nav]">
                        <button data-glide-dir={`=${index}`}>{item.name.toUpperCase()}</button>
                      </div>
                      <div className="slider">
                        <div className="content-slider">
                          <h1>{item.name.toUpperCase()}</h1>
                          <p>{item.description}</p>
                          <hr />
                          <div className="info-slider">
                            <div className="info-box">
                              <h2>AVG. DISTANCE</h2>
                              <span>{item.distance.toUpperCase()}</span>
                            </div>
                            <div className="info-box">
                              <h2>EST. TRAVEL TIME</h2>
                              <span>{item.travel.toUpperCase()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <span className="loading"><img src={loadingIcon} alt="" /></span>
      )}
    </div>
  );
};

export default Destination;