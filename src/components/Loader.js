import { BookLoader } from "react-awesome-loaders";
import "./loader.css"
const BookLoaderComponent = () => {
  return (
   
    <div className="load">
        <BookLoader
        background={"linear-gradient(135deg, #6066FA, #4645F6)"}
        desktopSize={"60px"}
        mobileSize={"40px"}
        textColor={"#4645F6"}
        duration={"3s"}
        text={"Please Wait..."}
        />
    </div>
    
       
  );
};
export default BookLoaderComponent;
