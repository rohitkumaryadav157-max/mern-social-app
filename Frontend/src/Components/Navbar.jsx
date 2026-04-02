import "./Navbar.css";
import logo from '../assets/cartoon.jpg';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logout from "../assets/logout.webp"
function Navbar() {

  const navigate = useNavigate();

  const handleLogout = async () => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You will be logged out!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Logout"
  });

  if (result.isConfirmed) {
    localStorage.removeItem("user");

    await Swal.fire({
      title: "Logged out!",
      text: "You have been logged out successfully.",
      icon: "success",
      timer: 1500,
      showConfirmButton: false
    });

    navigate("/");
  }
};
  return (
    <div className="row">
      <div className="col-sm-5 mx-auto ">
        <div className="navbar-wrapper">
          <div className="navbar">
            <h4 className="nav-title"> <i className="fa-brands fa-forumbee " style={{color:"black"}}></i> Social</h4>

            <div className="nav-right">
              <div className="pill">
                <span className="red">50</span>
                <i className="fa-solid fa-mobile-vibrate fa-fade" style={{color:" rgb(0, 0, 0)"}}></i>
              </div>

              <div className="pill green">$0.0000</div>

              <div className="icon-box">
                <i className="fa-solid fa-bell fa-shake" style={{color:" rgb(0, 0, 0)"}}></i>
                <span className="badge">1</span>
              </div>

              <img
                src={logout}
                alt="profile"
                className="profile"
                onClick={handleLogout}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
