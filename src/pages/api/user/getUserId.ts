import {
  getAllMoviesRequest,
  responseObjectgetAllMovieRequest,
} from "@/types/types";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

async function getUserID(body: { apiKey: string }): Promise<any> {
  const response = await axios.get<any>(`http://${process.env.BACKEND_URI}/api/auth/user`, {
    headers: {
      Authorization: `Token ${body.apiKey}`,
    },
  });

  return response.data;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const body = req.query;
  try {
    const result = await getUserID({ apiKey: body.apiKey as string });
    res.status(200).json(result);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
}
