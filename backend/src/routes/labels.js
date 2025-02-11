import { Router } from "express";
import joi from "joi";
import labelModel from "../models/label.js";

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

    // create new label record
    const labelPayload = {
      name,
      description,
      color,
    };
    await labelModel.insert(labelPayload);

    return res.status(201).json({
      message: "CREATED",
      data: {
        label: labelPayload,
      },
    });
  } catch (error) {
    console.log("error at POST /labels", error);
    return res.status(500).json({
      message: "INTERNAL SERVER ERROR",
      error: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    // get all labels
    const labels = await labelModel.findAll();

    return res.status(200).json({
      message: "OK",
      data: {
        labels,
      },
    });
  } catch (error) {
    console.log("error at GET /labels", error);
    return res.status(500).json({
      message: "INTERNAL SERVER ERROR",
      error: error.message,
    });
  }
});

router.put("/:label_id", async (req, res) => {
  try {
    // request params schema
    const paramsSchema = joi.object({
      label_id: joi.string().required(),
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
    const { label_id } = paramsValue;
    const { name, description, color } = bodyValue;

    // check if label exists
    const labelCondition = { id: label_id };
    const label = await labelModel.findOne(labelCondition);
    if (!label) {
      return res.status(404).json({
        message: "NOT FOUND",
        error: "Label not found",
      });
    }

    // update label record
    const labelPayload = {
      name,
      description,
      color,
      updated_at: new Date(),
    };
    await labelModel.update(labelCondition, labelPayload);

    return res.status(200).json({
      message: "OK",
      data: {
        label: labelPayload,
      },
    });
  } catch (error) {
    console.log("error at PUT /labels/:label_id", error);
    return res.status(500).json({
      message: "INTERNAL SERVER ERROR",
      error: error.message,
    });
  }
});

router.delete("/:label_id", async (req, res) => {
  try {
    // request params schema
    const paramsSchema = joi.object({
      label_id: joi.string().required(),
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
    const { label_id } = paramsValue;

    // check if label exists
    const labelCondition = { id: label_id };
    const label = await labelModel.findOne(labelCondition);
    if (!label) {
      return res.status(404).json({
        message: "NOT FOUND",
        error: "Label not found",
      });
    }

    // delete label record
    await labelModel.remove(labelCondition);

    return res.status(200).json({
      message: "OK",
      data: null,
    });
  } catch (error) {
    console.log("error at DELETE /labels/:label_id", error);
    return res.status(500).json({
      message: "INTERNAL SERVER ERROR",
      error: error.message,
    });
  }
});

export default router;
