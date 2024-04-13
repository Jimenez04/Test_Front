import { React, useState, useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import Comment from "./comment";
import comment from "./comment";

export default function get() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [feature, setFeaure] = useState([]);
  const [comments, setComments] = useState([]);

  const setComments_to_clear = () => {
    setComments([]);
  };

  const fetchData = async () => {
    let url = "http://127.0.0.1:3000/api/feature/id/" + id;
    await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setFeaure(data.data.feature);
        setComments(data.data.comments);
        // console.log()
        // console.log((data.data.feature.time).toLocaleString())
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, [comments]);
  const back = () => {
    navigate("/");
  };
  return (
    <section>
      <div className="information_container">
        <div className="container_btn">
          <button className="btn back radius" onClick={back}>
            Back
          </button>
        </div>
        <h1>{feature.title}</h1>
        <div className="attributes_container grid">
          <div className="type_container">
            <label>Type: </label>
            <span>Feature</span>
          </div>
          <div className="time_container">
            <label>Time: </label>
            <span>{
              (new Date(feature.time * 1))?.toLocaleString()
            }</span>
          </div>
          <div className="place_container">
            <label>Place: </label>
            <span>{feature.place}</span>
          </div>
          <div className="mag_container">
            <label>Mag type: </label>
            <span>{feature.mag_type}</span>
          </div>
          <div className="magnitude_container">
            <label>Magnitude: </label>
            <span>
              {(Math.round(feature.magnitude * 100) / 100).toFixed(2)}
            </span>
          </div>
          <div className="tsunami_container">
            <label>Tsunami: </label>
            <span>{feature.tsunami ? "Positive" : "Negative"}</span>
          </div>
        </div>
        <div className="coordinates_container">
          <div className="coordinates_title_container">
            <label>Coordinates</label>
          </div>
          <div className="flex coordinates_container_info grid">
            <div>
              <label>Longitude: </label>
              <span>{feature.longitude}</span>
            </div>
            <div>
              <label>Latitude: </label>
              <span>{feature.latitude}</span>
            </div>
          </div>
        </div>

        <div className="links_container">
          <div className="links_title_container">
            <label>Links</label>
          </div>
          <div className="links_info_container">
            <label>URL: </label>
            <a href={feature.external_url} target="_blank">
              {feature.external_url}
            </a>
          </div>
        </div>
        <Comment
          comments_list={comments}
          id={feature.id}
          setComments_to_clear={setComments_to_clear}
        ></Comment>
      </div>
    </section>
  );
}
