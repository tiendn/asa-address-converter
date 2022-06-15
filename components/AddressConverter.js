import { useCallback, useState } from "react";
import { Box, TextField, Tooltip, Typography } from "@mui/material";
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

	const onCopy = useCallback(async () => {
		try {
			await navigator.clipboard.writeText(result);
			toast('Copy successfully');
		} catch (err) {
			console.log(err);
		}
	}, [result]);

	return (
		<Box title="Address Converter" flexDirection="column">
			<Typography variant="h4" component="div">Address Converter</Typography>
			<div style={{height: 20}} />
			<TextField style={{width: 500}} onChange={onInputChange} label="Input Address" variant="standard" />
			<div style={{height: 20}} />
			<Tooltip title="Click to copy">
				<TextField disabled style={{width: 500}} label="Converter Address" value={result} variant="standard" onClick={onCopy}/>
			</Tooltip>
			<ToastContainer />
		</Box>
	);
};

export default AddressConverter;
