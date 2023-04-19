import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import querystring from "querystring";
import {
  Movie,
  getAllMoviesRequest,
  getMovieByIdRequest,
  responseObjectgetAllMovieRequest,
} from "@/types/types";
import { useRouter } from "next/router";
type Data = {
  name: string;
};

async function getAllMovieById(
  props: getMovieByIdRequest
): Promise<responseObjectgetAllMovieRequest> {
  const response = await axios.get<responseObjectgetAllMovieRequest>(
    `http://localhost:8000/api/movies/${props.MovieId}`
  );

  return response.data;
}
function fetchData(
  req: NextApiRequest & { body: getMovieByIdRequest },
  res: NextApiResponse<responseObjectgetAllMovieRequest>
): getMovieByIdRequest {
  const movieData = querystring.parse(req.url!!.split("?")[1]);
  console.log(movieData, "hmm");
  const MovieId: getMovieByIdRequest = {
    MovieId: parseInt(movieData.MovieId as string),
  };
  return MovieId;
  // Your code to fetch data here
}
export default async function handler(
  req: NextApiRequest & { body: getMovieByIdRequest },
  res: NextApiResponse<responseObjectgetAllMovieRequest>
) {
  const final = fetchData(req, res);
  try {
    const result = await getAllMovieById(final);
    console.log(result, "result post request");
    res.status(200).json(result);
  } catch (err: any) {
    console.log("Something went wrong");
    res.status(500).json(err.message);
  }
}
