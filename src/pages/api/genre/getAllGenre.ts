import {
  getAllMoviesRequest,
  responseObjectgetAllMovieRequest
} from "@/types/types";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

async function getAllGenres(
  body: getAllMoviesRequest
): Promise<responseObjectgetAllMovieRequest> {
  let QueryBuilder: string = "?";
  //////////console.log(body, "body");
  Object.keys(body).forEach((key) => {
    QueryBuilder += `${key}=${body[key as keyof getAllMoviesRequest]}&`;
  });
  ////////console.log(QueryBuilder, "Query final");
  const response = await axios.get<responseObjectgetAllMovieRequest>(
    `http://${process.env.BACKEND_URI}/api/genres/${QueryBuilder}`
  );

  return response.data;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<responseObjectgetAllMovieRequest>
) {
  const body = req.query;
  ////////console.log(body);
  try {
    const result = await getAllGenres(body);
    res.status(200).json(result);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
}
