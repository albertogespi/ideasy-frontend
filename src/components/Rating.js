import React from "react";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

export function SimpleRating({ readOnly }) {
	const [value, setValue] = React.useState(0);
	if (readOnly) {
		return (
			<div classname='stars-rating'>
				<Rating name='read-only' value='5' size='large' readOnly />
				{/* <Typography component="legend">Puntuación media</Typography> */}
			</div>
		);
	} else {
		return (
			<div>
				<Rating
					name='simple-controlled'
					value={value}
					onChange={(event, newValue) => {
						setValue(newValue);
					}}
				/>
			</div>
		);
	}
}
