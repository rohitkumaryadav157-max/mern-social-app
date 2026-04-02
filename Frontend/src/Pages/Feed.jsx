import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import CreatePost from "./CreatePost";
import logo from "../assets/cartoon.jpg";
import "./feed.css";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";


function Feed() {
  const [posts, setPosts] = useState([]);
  const [showComments, setShowComments] = useState(null);
  const [commentText, setCommentText] = useState("");

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const navigate = useNavigate();

  //Protect route validate 
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);

  const getPosts = async () => {
    try {
      const res = await axios.get("https://mern-backend-8zkk.onrender.com/api/posts/feed");
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  //  LIKE
  const handleLike = async (id) => {
    if (!user?.username) {
      alert("Please login first");
      return;
    }

    await axios.post(`https://mern-backend-8zkk.onrender.com/api/posts/like/${id}`, {
      username: user.username,
    });

    getPosts();
  };

  //  COMMENT
  const handleComment = async (id, text) => {
    if (!user?.username) {
      alert("Please login first");
      return;
    }

    if (!text.trim()) return;

    await axios.post(`https://mern-backend-8zkk.onrender.com/api/posts/comment/${id}`, {
      username: user.username,
      text,
    });

    setCommentText("");
    getPosts();



    
  };

  return (


    //rap
    <div className="background">
      {/* nav component */}
      <Navbar />

       {/* post component */}
      <CreatePost refreshPosts={getPosts} />


         {/* feed page start code  */}
      <div className="feed-container">
        {posts.map((post) => {
          const isLiked = post.likes.includes(user?.username);

          return (
            <div className="post-card" key={post._id}>
              {/* HEADER */}
              <div className="post-header">
                <img src={logo} className="avatar" />
                <div className="user-info">
                  <h4 className="username">{post.username}</h4>
                  <span className="time">Just now</span>
                </div>
              </div>

              {/* TEXT */}
              <p className="post-text">{post.text}</p>

              {/* IMAGE */}
              {post.image && (
                <img
                  src={`http://mern-backend-8zkk.onrender.com/uploads/${post.image}`}
                  className="post-img"
                />
              )}

              {/* ACTIONS */}
              <div className="post-actions">
                <span onClick={() => handleLike(post._id)}>
                  {isLiked ? (
                    <i className="fa-solid fa-heart" style={{ color: "red" }}></i>
                  ) : (
                    <i className="fa-regular fa-heart"></i>
                  )}
                  {post.likes.length}
                </span>

                <span onClick={() => setShowComments(post._id)}>
                  <i className="fa-solid fa-comment-dots"></i>{" "}
                  {post.comments.length}
                </span>
              </div>

              {/* COMMENTS */}
              {showComments === post._id && (
                <div className="comment-modal">
                  <div className="comment-box">
                    <h3>Comments</h3>

                    <div className="comment-list">
                      {post.comments.map((c, i) => (
                        <div key={i}>
                          <b>{c.username}</b>
                          <p>{c.text}</p>
                        </div>
                      ))}
                    </div>

                    <div className="comment-input">
                      <input
                        type="text"
                        placeholder="Write a comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                      />

                      <button
                        onClick={() =>
                          handleComment(post._id, commentText)
                        }
                        className="btn btn-primary"
                      >
                        Post
                      </button>

                      <button onClick={() => setShowComments(null)} className="btn btn-danger">
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Feed;