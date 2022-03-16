import {
	CircularProgress,
	createTheme,
	makeStyles,
	ThemeProvider,
} from "@material-ui/core";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { HistoricalChart } from "../config/api";
import { CryptoState } from "../CryptoContext";

const CoinInfo = ({ coin }) => {
	const [historicalData, sethistoricalData] = useState();
	const [days, setDays] = useState(1);

	const { currency } = CryptoState();

	const fetchHistoricalData = async () => {
		const { data } = await axios.get(
			HistoricalChart(coin.id, days, currency)
		);
		sethistoricalData(data.prices);
	};

	useEffect(() => {
		fetchHistoricalData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currency, days]);

	const darkTheme = createTheme({
		palette: {
			primary: {
				main: "#fff",
			},
			type: "dark",
		},
	});

	const useStyles = makeStyles((theme) => ({
		container: {
			width: "75%",
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "center",
			marginTop: 25,
			padding: 40,
			[theme.breakpoints.down("md")]: {
				width: "100%",
				marginTop: 0,
				padding: 20,
				paddingTop: 0,
			},
		},
	}));

	const classes = useStyles();

	return (
		<ThemeProvider theme={darkTheme}>
			<div className={classes.container}>
				{!historicalData ? (
					<CircularProgress
						style={{ color: "gold " }}
						size={250}
						thickness={1}
					/>
				) : (
					<>
						<Line
							data={{
								label: historicalData.map((coin) => {
									let date = new Date(coin[0]);
									let time =
										date.getHours() > 12
											? `${
													date.getHours() - 12
											  }:${date.getMinutes()} PM`
											: `${date.getHours()}:${date.getMinutes()} AM`;
									return days === 1
										? time
										: date.toLocaleDateString();
								}),

								datasets: [
									{data: historicalData.map(coin => coin[1])}
								]
							}}
						/>
					</>
				)}
			</div>
		</ThemeProvider>
	);
};

export default CoinInfo;
