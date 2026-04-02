import { useRef, useState } from "react";
import axios from "axios";
import "./createPost.css";
import Swal from 'sweetalert2'

function CreatePost({ refreshPosts }) {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const fileRef = useRef();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const openGallery = () => fileRef.current.click();

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handlePost = async () => {
    if (!user?.username) {
      alert("Please login first");
      return;
    }

    if (!text && !image) return;

    try {
      const formData = new FormData();
      formData.append("username", user.username);
      formData.append("text", text);
      if (image) formData.append("image", image);

      await axios.post("http://localhost:3000/api/posts/create", formData);

      Swal.fire({
  title: "Post Sucessfully!",
  icon: "success",
  draggable: true
});

      setText("");
      setImage(null);
      setPreview("");
      refreshPosts();

    } catch (err) {
      console.log(err);
      alert("Post failed ");
    }
  };

  return (
    <div className="create-container">
      <div className="create-card">

        {/* HEADER */}
        <div className="create-header">
          <h2>Create Post</h2>

          <div className="tabs">
            <button className="active">All Posts</button>
            <button>Promotions</button>
          </div>
        </div>

        {/* TEXTAREA */}
        <textarea
          placeholder="What's on your mind?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* IMAGE PREVIEW */}
        {preview && <img src={preview} className="preview" />}

        {/* HIDDEN FILE INPUT */}
        <input type="file" ref={fileRef} hidden onChange={handleImage} />

        {/* FOOTER */}
        <div className="footer">
          <div className="icons">
            <i
              className="fa-solid fa-image"
              onClick={openGallery}
              style={{ cursor: "pointer" }}
            ></i>

            <i className="fa-regular fa-face-smile"></i>
            <i className="fa-solid fa-chart-simple"></i>
            <i className="fa-solid fa-bullhorn"></i>
          </div>

          <button
            className="post-btn"
            disabled={!text && !image}
            onClick={handlePost}
          >
            Post
          </button>
        </div>

      </div>
    </div>
  );
}

export default CreatePost;