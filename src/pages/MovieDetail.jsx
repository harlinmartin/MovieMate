import React from 'react';
import { useParams } from 'react-router-dom';

const MovieDetail = () => {
  const { id } = useParams();
  return <div className="container"><h1>Movie Details: {id}</h1></div>;
};

export default MovieDetail;
