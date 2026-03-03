import {
  createFeedbackSchema,
  TcreateFeedbackPayload,
} from "@repo/common/schemas";
import { Request, Response } from "express";
import { FeedbackService } from "./feedback.service.js";
import MediaService from "../media/media.service.js";
import { AppError } from "@/middlewares/error.middleware.js";
import {
  FeedbackPriority,
  FeedbackStatus,
} from "@prismaGenerated/src/generatedClient/prisma/client.js";

const FeedBackController = {
  createFeedback: async (req: Request, res: Response) => {
    let uploadFileKeys: string[] = [];

    try {
      const payload = req?.body;
      const initialPayload = {
        ...payload,
        clientContext: payload?.clientContext
          ? JSON.parse(payload?.clientContext)
          : undefined,
        debugContext: payload?.debugContext
          ? JSON.parse(payload?.debugContext)
          : undefined,
        images: undefined,
      };

      createFeedbackSchema.parse(initialPayload);

      const uploadResponse = await MediaService.uploadFiles(
        req?.files as Express.Multer.File[],
      );

      uploadFileKeys = uploadResponse?.map((resp) => resp?.key);

      const finalPayload = {
        ...initialPayload,
        images: uploadResponse,
      };

      const parsedPayload = createFeedbackSchema.parse(finalPayload);

      const newFeedback = await FeedbackService?.createFeedback({
        data: parsedPayload,
        domainId: req?.domain?.id,
      });

      res.jsonSuccess({
        data: newFeedback,
        status: 200,
        message: "Feedback created successfully",
      });
    } catch (error) {
      if (uploadFileKeys?.length > 0) {
        MediaService?.deleteFiles(uploadFileKeys);
      }

      throw error;
    }
  },

  getFeedbacks: async (req: Request, res: Response) => {
    const { domainId } = req?.query as { domainId: string };
    if (!domainId) throw new AppError("Domain Id not found", 404, "NOT_FOUND");
    const feedbacksResponse = await FeedbackService.getFeedbacks(domainId);

    res.jsonSuccess({
      data: feedbacksResponse,
      status: 200,
      message: "Feedbacks fetched successfully",
    });
  },

  getFeedback: async (req: Request, res: Response) => {
    const { domainId } = req?.query as { domainId: string };
    if (!domainId) throw new AppError("Domain Id not found", 404, "NOT_FOUND");
    const { feedbackId } = req?.params as { feedbackId: string };
    const feedbackResponse = await FeedbackService.getFeedback({
      domainId,
      feedbackId,
    });
    res.jsonSuccess({
      data: feedbackResponse,
      status: 200,
      message: "Feedbacks fetched successfully",
    });
  },

  editFeedback: async (req: Request, res: Response) => {
    const { feedbackId } = req?.params as { feedbackId: string };
    const { domainId } = req?.query as { domainId: string };

    if (!domainId || !feedbackId) {
      throw new AppError("domainId or feedbackId not found", 404, "NOT_FOUND");
    }

    const { status, comment, priority } = req.body as {
      status: FeedbackStatus;
      comment?: string;
      priority?: FeedbackPriority;
    };

    if (!status && !comment && !priority) {
      throw new AppError("Update data not found in payload", 404, "NOT_FOUND");
    }

    const editFeedbackResponse = await FeedbackService.editFeedback({
      comment,
      feedbackId,
      status,
      domainId,
      priority,
    });

    res.jsonSuccess({
      data: editFeedbackResponse,
      status: 200,
      message: "Feedback edited successfully !",
    });
  },
  deleteFeedback: async (req: Request, res: Response) => {
    const { feedbackId } = req?.params as { feedbackId: string };
    const { domainId } = req?.query as { domainId: string };

    if (!domainId || !feedbackId) {
      throw new AppError("domainId or feedbackId not found", 404, "NOT_FOUND");
    }

    const deleteFeedbackResponse = await FeedbackService.deleteFeedback({
      feedbackId,
      domainId,
    });

    res.jsonSuccess({
      data: deleteFeedbackResponse,
      status: 200,
      message: "Feedback Deleted !",
    });
  },
};

export { FeedBackController };
