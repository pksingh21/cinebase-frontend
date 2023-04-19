import type { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosError } from "axios";
import {
  Movie,
  getAllMoviesRequest,
  responseObjectgetAllMovieRequest,
} from "@/types/types";
type Data = {
  name: string;
};

async function getAllMovies(
  body: getAllMoviesRequest
): Promise<responseObjectgetAllMovieRequest> {
  let QueryBuilder: string = "?";
  Object.keys(body).forEach((key) => {
    QueryBuilder += `${key}=${body[key as keyof getAllMoviesRequest]}&`;
  });
  const response = await axios.get<responseObjectgetAllMovieRequest>(
    `http://localhost:8000/api/movies/${QueryBuilder}`
  );

  return response.data;
}
export default async function handler(
  req: NextApiRequest & { body: getAllMoviesRequest },
  res: NextApiResponse<responseObjectgetAllMovieRequest>
) {
  const body: getAllMoviesRequest = req.body;
  try {
    const result = await getAllMovies(body);
    res.status(200).json(result);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
}
