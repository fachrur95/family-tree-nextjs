// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";

const basePath = "api/diagrams";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = JSON.parse(req.body);
    await axios
      .post(`${process.env.apiAddress}${basePath}`, data)
      .then((result) => {
        // console.log(result);
        const response = result.data;
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(500).json({ message: "Internal server error!", err });
      });
  } else if (req.method === "PUT") {
    const { id, parentId } = req.query;
    const data = JSON.parse(req.body);
    if (id !== "0") {
      console.log("atas");
      await axios
        .put(`${process.env.apiAddress}${basePath}/${id}`, data)
        .then((result) => {
          // console.log(result);
          const response = result.data;
          res.status(200).json(response);
        })
        .catch((err) => {
          res.status(500).json({ message: "Internal server error!", err });
        });
    } else if (parentId !== "0") {
      console.log("bawah");
      await axios
        .put(`${process.env.apiAddress}${basePath}/parent/${id}`, data)
        .then((result) => {
          // console.log(result);
          const response = result.data;
          res.status(200).json(response);
        })
        .catch((err) => {
          res.status(500).json({ message: "Internal server error!", err });
        });
    }
  } else if (req.method === "GET") {
    await axios
      .get(`${process.env.apiAddress}${basePath}`)
      .then((result) => {
        const response = result.data;
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(500).json({ message: "Internal server error!", err });
      });
  } else if (req.method === "DELETE") {
    const ids = JSON.parse(req.body);
    await axios
      .post(`${process.env.apiAddress}${basePath}/delete`, ids)
      .then((result) => {
        // console.log(result);
        const response = result.data;
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(500).json({ message: "Internal server error!", err });
      });
  } else {
    res.status(404).json({ message: "Not found!" });
  }
};

export default handler;
