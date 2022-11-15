import express from "express";
import { allWorkers } from "../db.js";
const router = express.Router();

router.route("/").get((req, res) => {
  if (Object.keys(req.query).length > 0) {
    const worker = allWorkers.find((el) => {
      return +el.id === +req.query.id;
    });
    if (worker) {
      res.json({
        permission: worker.permission,
      });
    } else {
      res.json({
        permission: true,
      });
    }
  } else {
    res.json(allWorkers);
  }
});

router.route("/:id").get((req, res) => {
  console.log("req.params.id", req.params.id);
  const worker = allWorkers.find((el) => {
    return +el.id === +req.params.id;
  });
  if (worker) {
    res.json({
      permission: worker.permission,
    });
  } else {
    res.json({
      permission: true,
    });
  }
});

export default router;
