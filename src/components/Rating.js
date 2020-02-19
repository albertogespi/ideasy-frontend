import React, { useState } from "react";
import { uploadRating } from "../http/documentsService";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

export function SimpleRating({ readOnly, value, docId }) {
	const [rating, setRating] = useState(value);
	const changeRating = (newValue) => {
		console.log({ docId });
		const data = { rating: newValue };
		uploadRating(data, docId);
		setRating(newValue);
	};

	if (rating !== undefined) {
		if (readOnly) {
			return (
				<div classname='stars-rating'>
					<Rating
						name='read-only'
						precision={0.5}
						value={rating}
						size='large'
						readOnly
					/>
					{/* <Typography component="legend">Puntuación media</Typography> */}
				</div>
			);
		} else {
			return (
				<div>
					<Rating
						name='simple-controlled'
						value={rating}
						onChange={(event, newValue) => {
							changeRating(newValue);
						}}
					/>
				</div>
			);
		}
	}
}
