import { useEffect, useState } from "react";
import BookLoaderComponent from "./Loaders/BookLoader";
import BorrowedComponent from "./BookBorrowedComponent";
import RequestComponent from "./BookRequestComponent";

export const Borrowal = () => {
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 1000);
	}, []);
	return (
		<>
			{isLoading && <BookLoaderComponent />}
			<div style={{ display: isLoading ? "none" : "block" }}>
				<RequestComponent />
				<BorrowedComponent />
			</div>
		</>
	);
};
