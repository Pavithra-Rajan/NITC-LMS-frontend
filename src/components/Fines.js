import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useRef, useState } from "react";

export default function Fines() {
	

	const [userID, SetUser] = useState("");

	const [ISBN, SetISBN] = useState("");

    const [Fine, SetFine] = useState("");

	return (
		<>
			<h2>Fines</h2>
            <TextField
				id='user-ID'
				label='User ID'
				variant='standard'
				justifyContent='center'
				align='center'
				style={{ width: 400, marginTop:"25px" }}
                value={userID}
				onChange={(e) => {
					SetUser(e.target.value);
				}}
			/>
            <br/>

			<TextField
				id='ISBN'
				label='ISBN'
				variant='standard'
				justifyContent='center'
				align='center'
				style={{ width: 400, marginTop:"25px" }}
                value={ISBN}
				onChange={(e) => {
					SetISBN(e.target.value);
				}}
			/>
			<br />
			<TextField
				id='fine'
				label='Fine'
				variant='standard'
				justifyContent='center'
				align='center'
				style={{ width: 400, marginTop:"25px", marginBottom:"25px"}}
                value={Fine}
				onChange={(e) => {
					SetFine(e.target.value);
				}}
			/>
			<br />
			<Button variant='contained' style={{ background: "#677eff" }}>
				Submit
			</Button>
		</>
	);
}
