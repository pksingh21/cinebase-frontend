import {
  responseObjectgetAllMovieRequest,
} from "@/types/types";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

async function getMovieCast(body: {
  [key: string]: string | string[] | undefined;
}): Promise<responseObjectgetAllMovieRequest> {
  const QueryBuilder = body.id;
  const response = await axios.get<responseObjectgetAllMovieRequest>(
    `http://${process.env.BACKEND_URI}/api/people/${QueryBuilder}`
  );

  return response.data;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
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
