import {
	AppBar,
	Container,
	createTheme,
	MenuItem,
	Select,
	Toolbar,
	Typography,
	ThemeProvider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const useStyles = makeStyles(() => ({
	title: {
		flex: 1,
		color: "gold",
		fontFamily: "Montserrat",
		fontWeight: "bold",
		cursor: "pointer",
	},
}));

const Header = () => {
	const classes = useStyles();
	const history = useHistory();
	const darkTheme = createTheme({
		palette: {
			primary: {
				main: "#fff",
			},
			type: "dark",
		},
	});

	return (
		<ThemeProvider theme={darkTheme}>
			<AppBar color="transparent" position="static">
				<Container>
					<Toolbar>
						<Typography
							onClick={() => history.push("/")}
							className={classes.title}
                            variant='h6'
						>
							Coin Sleuth
						</Typography>
						<Select
							variant="outlined"
							style={{
								width: 100,
								margin: 40,
								marginRight: 15,
							}}
						>
							<MenuItem value="USD">USD</MenuItem>
							<MenuItem value="GBP">GBP</MenuItem>
							<MenuItem value="EUR">EUR</MenuItem>
						</Select>
					</Toolbar>
				</Container>
			</AppBar>
		</ThemeProvider>
	);
};

export default Header;
