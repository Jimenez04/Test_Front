import { React, useState, useEffect } from "react";
import "../assets/css/feature/index.css";

import Pagination from "@mui/material/Pagination";
import CircularProgress from "@mui/material/CircularProgress";

import { useNavigate } from "react-router-dom";

export default function index() {
  const navigate = useNavigate();
  const [features, setFeaures] = useState([]);
  const [pagination_total, setPagination_total] = useState(0);
  const [current_page, setCurrent_page] = useState(1);
  const [perpage, setPerpage] = useState(15);
  const [mag_type, setMag_type] = useState(null);

  const fetchData = async () => {
    let url =
      mag_type == null || mag_type == "all"
        ? "http://127.0.0.1:3000/api/features/page/" +
          current_page +
          "/per_page/" +
          perpage
        : "http://127.0.0.1:3000/api/features/mag/" +
          mag_type +
          "/page/" +
          current_page +
          "/per_page/" +
          perpage;
    await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setFeaures(data);
        setPagination_total(data.pagination.total);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, [current_page, perpage, mag_type]);

  function pageChange(page) {
    setCurrent_page(page);
  }
  const perpageChange = (per_page) => {
    setPerpage(per_page);
  };
  const mag_typeChange = (mag) => {
    setMag_type(mag);
  };
  const rowOnClick = (id) => {
    navigate("/feature/" + id);
  };

  return Object.keys(features).length > 0 ? (
    <section>
      <div>
        <div id="selects_container">
          <div id="page_select">
            <label>Item per page: </label>
            <select onChange={(e) => perpageChange(parseInt(e.target.value))}>
              <option value="15">15</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
          <div id="mg_select">
            <label>Mag Type: </label>
            <select onChange={(e) => mag_typeChange(e.target.value)}>
              <option value="all">All</option>
              <option value="md">md</option>
              <option value="ml">ml</option>
              <option value="ms">ms</option>
              <option value="mw">mw</option>
              <option value="me">me</option>
              <option value="mi">mi</option>
              <option value="mb">mb</option>
              <option value="mlg">mlg</option>
            </select>
          </div>
        </div>
        <div id="container_table">
          <div className="table radius">
            <div id="head" className="radius flex">
              <div className="column_one ">Title</div>
              <div className="column_two">Place</div>
              <div className="column_three">Magnitude</div>
              <div className="column_four">Time</div>
              <div className="column_five">Action</div>
            </div>
            <div id="body">
              {features.data.length > 0 ? (
                features.data.map((item, id) => (
                  <div id="content_table" key={id} className="flex line">
                    <div className="column_one">{item.attributes.title}</div>
                    <div className="column_two">{item.attributes.place}</div>
                    <div className="column_three">
                      {(
                        Math.round(item.attributes.magnitude * 100) / 100
                      ).toFixed(2)}
                    </div>
                    <div className="column_four">
                      {new Date(item.attributes.time * 1)?.toLocaleString()}
                    </div>
                    <div className="column_five">
                      <button onClick={() => rowOnClick(item.id)}>Go</button>
                    </div>
                  </div>
                ))
              ) : (
                <label>"There are not information to show still"</label>
              )}
            </div>
          </div>

          <div className="pagination">
            <Pagination
              variant="outline"
              onChange={(e) => pageChange(parseInt(e.target.textContent))}
              page={current_page}
              count={pagination_total}
            />
          </div>

        </div>
      </div>
    </section>
  ) : (
    <section>
      <div className="circular_progress">
        <CircularProgress />
      </div>
    </section>
  );
}
