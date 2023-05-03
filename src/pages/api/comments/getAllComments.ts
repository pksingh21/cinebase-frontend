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
async function getAllMovieById(body: any): Promise<any> {
  let QueryBuilder: string = "?";
  Object.keys(body).forEach((key) => {
    QueryBuilder += `${key}=${body[key as keyof getAllMoviesRequest]}&`;
  });
  const response = await axios.get<any>(
    `http://localhost:8000/api/reviews/${QueryBuilder}`
  );

  return response.data;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const final = req.query;
  try {
    const result = await getAllMovieById(final);
    ////////console.log(result, "result post request");
    res.status(200).json(result);
  } catch (err: any) {
    ////////console.log("Something went wrong");
    res.status(500).json(err.message);
  }
}
