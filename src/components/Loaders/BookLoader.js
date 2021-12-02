import { BookLoader } from "react-awesome-loaders";

const style = {
	root: {
		margin: 0,
		padding: 0,
		boxSizing: "border-box",
	},
	load: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: "80vh",
		backgroundColor: "white",
	},
	home: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: "100vh",
		width: "100%",
		position: "absolute",
	},
};

const BookLoaderComponent = (props) => {
	return (
		<div className='load' style={props.home ? style.home : style.load}>
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
