import React, { useState } from "react";
import { uploadRating } from "../http/documentsService";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

export function SimpleRating({ readOnly, value, docId }) {
  const [rating, setRating] = useState(value);
  const changeRating = newValue => {
    const data = { rating: newValue };
    uploadRating(data, docId);
    setRating(newValue);
  };

  if (rating !== undefined) {
    if (readOnly) {
      return (
        <div classname="stars-rating">
          <Rating
            name="read-only"
            precision={0.5}
            value={rating}
            size="large"
            readOnly
          />
        </div>
      );
    } else {
      return (
        <div>
          <Rating
            name={`material-ui-start-${docId}`}
            value={rating}
            size="large"
            onChange={(event, newValue) => {
              changeRating(newValue);
            }}
          />
        </div>
      );
    }
  }
}
