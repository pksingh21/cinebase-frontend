import type { NextApiRequest, NextApiResponse } from "next";
import elasticInstance from "@/services/elasticInstance";

export type ElasticMovieSource = {
  tmdb_id?: number;
  title: string;
  tagline?: string;
  language: string;
  release_date: string;
  runtime?: number;
  cinebase_rating: number;
  poster_path?: string;
  overview?: string;
  last_updated: string;
  created: string;
};

export type ElasticHit = {
  _id: string;
  _score: number;
  _source: ElasticMovieSource;
};

export type ElasticData = {
  hits: {
    max_score: number;
    hits: ElasticHit[];
  };
};

export type MovieHit = {
  id: number;
} & ElasticMovieSource;

export type Data = {
  results: MovieHit[];
};

export type ErrorData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
  switch (req.method) {
    case "GET":
      const searchParam = req.query["query"] ?? "";
      const searchTerm =
        typeof searchParam === "string" ? searchParam : searchParam[0];

      const elasticRes = await elasticInstance.post<ElasticData>(
        "/rdbms_sync_idx/_search",
        {
          query: {
            bool: {
              should: [
                {
                  match_bool_prefix: {
                    title: {
                      query: searchTerm,
                      boost: 10,
                      analyzer: "english",
                    },
                  },
                },
                {
                  multi_match: {
                    query: searchTerm,
                    fields: ["title^6", "tagline^2", "overview"],
                    fuzziness: "AUTO",
                  },
                },
              ],
            },
          },
        }
      );

      const elasticData = elasticRes.data;

      const resData: MovieHit[] = elasticData.hits.hits.map((hit) => {
        const id = Number.parseInt(hit._id);
        const {
          tmdb_id,
          title,
          tagline,
          language,
          release_date,
          runtime,
          cinebase_rating,
          poster_path,
          overview,
          last_updated,
          created,
        } = hit._source;

        return {
          id,
          tmdb_id,
          title,
          tagline,
          language,
          release_date,
          runtime,
          cinebase_rating,
          poster_path,
          overview,
          last_updated,
          created,
        };
      });

      res.status(200).json({ results: resData });
      break;

    default:
      res.status(405).send({
        message: "Method Not Allowed",
      });
      break;
  }
}
