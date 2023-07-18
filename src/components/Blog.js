import React, { useEffect, useReducer} from 'react';
import blogReducer from './../reducers/blog-reducer'
import { getReviewsFailure, getReviewsSuccess } from './../actions/index';

const initialState = {
  isLoaded: false,
  reviews: [],
  error: null
};

function Blog() {
  const [state, dispatch] = useReducer(blogReducer, initialState);

useEffect(() => {
  fetch(`https://localhost:5001/api/v1/reviews/`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      } else {
        return response.json()
      }
    })
    .then((jsonifiedResponse) => {
      const action = getReviewsSuccess(jsonifiedResponse)
      dispatch(action);
      })
    .catch((error) => {
      const action = getReviewsFailure(error.message)
      dispatch(action);
    });
  }, [])

  const {error, isLoaded, reviews} = state;

  if (error) {
    // console.error(error)
  } else if (!isLoaded) {
    return <h1>...Loading...</h1>;
  } else {
    return (
      <React.Fragment>
        <h1>Blog</h1>
        <ul>
          {reviews.map((item, index) =>
            <li key={index}>
              <h3>Destination: {item.destination}</h3>
              <p>Country: {item.country}</p>
            </li>
          )}
        </ul>
      </React.Fragment>
    );
  }

}

export default Blog;