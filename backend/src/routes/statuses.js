import { Router } from "express";
import joi from "joi";
import statusModel from "../models/status.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    // request body schema
    const schema = joi.object({
      name: joi.string().required(),
      description: joi.string().optional(),
      color: joi.string().lowercase().required(),
    });

    // validate request body
    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.message,
        data: null,
      });
    }

    // request body
    const { name, description, color } = value;

    // create new status record
    const statusPayload = {
      name,
      description,
      color,
    };
    await statusModel.insert(statusPayload);

    return res.status(201).json({
      message: "CREATED",
      data: {
        status: statusPayload,
      },
    });
  } catch (error) {
    console.log("error at POST /statuses", error);
    return res.status(500).json({
      message: "INTERNAL SERVER ERROR",
      error: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    // get all statuses
    const statuses = await statusModel.findAll();

    return res.status(200).json({
      message: "OK",
      data: {
        statuses,
      },
    });
  } catch (error) {
    console.log("error at GET /statuses", error);
    return res.status(500).json({
      message: "INTERNAL SERVER ERROR",
      error: error.message,
    });
  }
});

router.put("/:status_id", async (req, res) => {
  try {
    // request params schema
    const paramsSchema = joi.object({
      status_id: joi.string().required(),
    });

    // validate request params
    const { error: paramsError, value: paramsValue } = paramsSchema.validate(
      req.params
    );
    if (paramsError) {
      return res.status(400).json({
        message: "BAD REQUEST",
        error: paramsError.details[0].message,
      });
    }

    // request body schema
    const bodySchema = joi.object({
      name: joi.string().required(),
      description: joi.string().optional(),
      color: joi.string().lowercase().required(),
    });

    // validate request body
    const { error: bodyError, value: bodyValue } = bodySchema.validate(
      req.body
    );
    if (bodyError) {
      return res.status(400).json({
        message: "BAD REQUEST",
        error: bodyError.details[0].message,
      });
    }

    // request values
    const { status_id } = paramsValue;
    const { name, description, color } = bodyValue;

    // check if status exists
    const statusCondition = { id: status_id };
    const status = await statusModel.findOne(statusCondition);
    if (!status) {
      return res.status(404).json({
        message: "NOT FOUND",
        error: "Status not found",
      });
    }

    // update status record
    const statusPayload = {
      name,
      description,
      color,
      updated_at: new Date(),
    };
    await statusModel.update(statusCondition, statusPayload);

    return res.status(200).json({
      message: "OK",
      data: {
        status: statusPayload,
      },
    });
  } catch (error) {
    console.log("error at PUT /statuses/:status_id", error);
    return res.status(500).json({
      message: "INTERNAL SERVER ERROR",
      error: error.message,
    });
  }
});

router.delete("/:status_id", async (req, res) => {
  try {
    // request params schema
    const paramsSchema = joi.object({
      status_id: joi.string().required(),
    });

    // validate request params
    const { error: paramsError, value: paramsValue } = paramsSchema.validate(
      req.params
    );
    if (paramsError) {
      return res.status(400).json({
        message: "BAD REQUEST",
        error: paramsError.details[0].message,
      });
    }

    // request values
    const { status_id } = paramsValue;

    // check if status exists
    const statusCondition = { id: status_id };
    const status = await statusModel.findOne(statusCondition);
    if (!status) {
      return res.status(404).json({
        message: "NOT FOUND",
        error: "Status not found",
      });
    }

    // delete status record
    await statusModel.remove(statusCondition);

    return res.status(200).json({
      message: "OK",
      data: null,
    });
  } catch (error) {
    console.log("error at DELETE /statuses/:status_id", error);
    return res.status(500).json({
      message: "INTERNAL SERVER ERROR",
      error: error.message,
    });
  }
});

export default router;
