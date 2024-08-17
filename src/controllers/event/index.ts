import { Request, Response } from "express";
import {
  _getAllEvents,
  _getEventDetailsById,
} from "../../services/event/event.service";

export const getEventDetailsById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      error: "Etkinlik ID parametresi boş olamaz.",
    });
  }

  try {
    const event = await _getEventDetailsById(id);
    return res.status(200).json({
      data: event,
      message: "Etkinlik başarıyla getirildi.",
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const getAllEvents = async (req: Request, res: Response) => {
  const { universityId } = req.query;

  if (!universityId) {
    return res.status(400).json({
      error: "Üniversite ID parametresi boş olamaz.",
    });
  }

  try {
    const events = await _getAllEvents(String(universityId));
    return res.status(200).json({
      data: events,
      message: "Etkinlikler başarıyla getirildi.",
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
