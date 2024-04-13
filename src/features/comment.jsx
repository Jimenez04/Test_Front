import { React, useState, useEffect } from "react";
import "../assets/css/components/comment.css";

export default function comment(props) {
  const [comment, setComment] = useState(" ");

  const createComment = () => {
    if (comment.length < 10) {
      alert("The comment should have 10 characters");
      return;
    }
    fetchData();
  };
  const fetchData = async () => {
    let url =
      "http://127.0.0.1:3000/api/feature/id/" + props.id + "/comments/create";
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ body: comment }),
    })
      .then((response) => response.json())
      .then((data) => {
        setComment("");
        props.setComments_to_clear();
        alert("The comment was created successfully");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="comments_container">
      <div className="comments_title_container">
        <label>Comments</label>
      </div>
      <div className="comments_info_container flex">
        <div id="create_comment">
          <div id="create_comment_container flex">
            <div className="create_comment_text_container">
              <form>
                <div className="create_comment_text_label_container">
                  <label>Description</label>
                </div>
                <div>
                  <textarea
                    className="radius"
                    value={comment}
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="create_comment_text_btn_container flex">
              <button
                onClick={() => {
                  createComment();
                }}
                className="btn back radius"
              >
                Add
              </button>
            </div>
          </div>
        </div>
        <div className="radius comments_info_table_container">
          {props.comments_list.length > 0 ? (
            props.comments_list.map((item, id) => (
              <div
                key={id}
                className=" line comments_info_table_item_container"
              >
                <span>{item.comment}</span>
              </div>
            ))
          ) : (
            <div className=" line comments_info_table_item_container">
              <span>There is not information still</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
