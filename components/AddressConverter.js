import { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { astraToEth, ethToAstra } from "asa-address-converter";

const AddressConverter = () => {
	const [result, setResult] = useState("");
	const onInputChange = (e) => {
		const input = e.target.value;
		try {
			if (input.startsWith("0x")) {
				setResult(ethToAstra(input));
			} else if (input.startsWith("astra")) {
				setResult(astraToEth(input));
			} else {
				setResult("Wrong address");
			}
		} catch (err) {
			console.log(err)
			toast(err.message);
		}
	};
	return (
		<Box title="Address Converter" flexDirection="column">
			<Typography variant="h4" component="div">Address Converter</Typography>
			<TextField style={{width: 500}} onChange={onInputChange} label="Input Address" variant="standard" />
			<div style={{height: 20}} />
			<TextField disabled style={{width: 500}} label="Converter Address" value={result} variant="standard" />
			<ToastContainer />
		</Box>
	);
};

export default AddressConverter;
