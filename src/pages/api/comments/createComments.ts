import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

async function getAllGenres(body: any): Promise<any> {
  const response = await axios.post<any>(
    `http://localhost:8000/api/reviews/`,
    body,
    {
      headers: {
        Authorization: `Token ${body.apiKey}`,
      },
    }
  );
  return response.data;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body;
  //console.log(body);
  try {
    const result = await getAllGenres(body);
    res.status(200).json(result);
  } catch (err: any) {
    console.error(err);
    res.status(500).send(err.message);
  }
}
