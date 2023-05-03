import {
  getAllMoviesRequest,
  responseObjectgetAllMovieRequest,
} from "@/types/types";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

async function getMovieCast(body: {
  [key: string]: string | string[] | undefined;
}): Promise<responseObjectgetAllMovieRequest> {
  const QueryBuilder = body.id;
  const response = await axios.get<responseObjectgetAllMovieRequest>(
    `http://localhost:8000/api/people/${QueryBuilder}`
  );

  return response.data;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<responseObjectgetAllMovieRequest>
) {
  const body = req.query;
  try {
    const result = await getMovieCast(body);
    res.status(200).json(result);
  } catch (err: any) {
    console.log(err);
    res.status(500).send(err.message);
  }
}
