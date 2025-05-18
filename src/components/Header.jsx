import { useDispatch,useSelector } from "react-redux";
import HamburgerMenu from "./Hamburger"
import {useEffect, useState} from "react"
import { setDeliveryLocation } from "../redux/globSlice";
const Header=()=>{
     const [isMenuOpen, setIsMenuOpen] = useState(false);
     const isLogin=useSelector((state)=>state?.user?.login);
     const dispatch=useDispatch();
     const deliveryLocation=useSelector((state)=>state?.Data?.deliveryLocation)||{}
     console.log(deliveryLocation)
     function saveUserLocationToLocalStorage() {
       
        if (!navigator.geolocation) {
          console.error("Geolocation is not supported by this browser.");
          return;
        }
      
        
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
        
           dispatch(setDeliveryLocation({ latitude, longitude }))
          
          },
          (error) => {
            console.error("Error retrieving location:", error);
          }
        );
      }
      useEffect(()=>{
        saveUserLocationToLocalStorage();
      },[])
    //  console.log(deliveryLocation)
    return(
        <div className="z-50 h-16 w-screen grid items-center bg-blue-800 shadow-md px-4">
  <HamburgerMenu setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />

  {isLogin ? (
    <button
      className="absolute right-8 h-10 w-10 rounded-full border-2 border-white hover:scale-105 transition"
      onClick={() => setIsMenuOpen(!isMenuOpen)}
    >
      <img
        className="h-full w-full rounded-full object-cover"
        src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg?w=768"
        alt="User Avatar"
      />
    </button>
  ) : (
    <button className="absolute right-8 h-10 w-24 rounded-md bg-white text-pink-600 font-semibold hover:bg-pink-100 transition">
      Login
    </button>
  )}
</div>

    )
}
export default Header