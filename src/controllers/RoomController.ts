import { Request, Response } from "express";
import { Room } from "../entities/Room";
import { Subject } from "../entities/Subject";
import { roomRepository } from "../repositories/roomRepository";
import { subjectRepository } from "../repositories/subjectRepository";
import { videoRepository } from "../repositories/videoRepository";

export class RoomController {

  public async create(req: Request, res: Response) {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Os campos name é obrigadórios.' });
    }

    try {
      const newRoom = roomRepository.create({ name, description });
      await roomRepository.save(newRoom);
      return res.status(201).json(newRoom);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  public async createVideo(req: Request, res: Response) {
    const { title, url } = req.body;
    const { roomId } = req.params;

    try {

      if (!title || !url) {
        return res.status(400).json({ message: 'Título ou URL não informados.' });
      }

      const room = await roomRepository.findOneBy({ id: Number(roomId) });
      if (!room) {
        return res.status(404).json({ message: `Aula de código ${roomId} não existe.` });
      }

      const newVideo = videoRepository.create({ title, url, room });
      await videoRepository.save(newVideo);
      return res.status(201).json(newVideo);

    } catch (error: any) {
      return res.status(500).json({ error: 'Ocorreu um erro', message: error.message });
    }

  }

  // Associate a room to a Subject creating a new data into roomSubject table.
  public async addSubject(req: Request, res: Response) {
    const { roomId } = req.params;
    const { subjectId } = req.body;

    try {
      
      const room = await roomRepository.findOne({ where: { id: Number(roomId) }, relations: ['subjects'] });
      if (!room) {
        return res.status(404).json({ message: `Aula de código ${roomId} não existe.` });
      }

      const subject = await subjectRepository.findOneBy({ id: Number(subjectId) });  // Cast was made here with Number() just to ensure it's a number type. Coming from req.body, cast is not needed.
      if (!subject) {
        return res.status(404).json({ message: `Matéria de código ${subject} não existe.` });
      }
      
      // Update the room object adding the subject
      const roomWithSubjectAdded: Room = {
        ...room,
      }
      roomWithSubjectAdded.subjects.push(subject);

      // Implicitly creates new data on roomSubject table with given subjects field.
      await roomRepository.save(roomWithSubjectAdded);
      
      return res.status(204).send();

    } catch (error: any) {
      return res.status(500).json({ error: 'Ocorreu um erro', message: error.message });
    }
  }

  public async findOne(req: Request, res: Response) {
    const { roomId } = req.params;
    try {
      const room = await roomRepository.findOne({ where: { id: Number(roomId) }, relations: ['subjects'] });
      return res.status(200).json(room);

    } catch (error: any) {
      return res.status(500).json({ error: 'Ocorreu um erro', message: error.message }); 
    }
  }

  public async list(req: Request, res: Response) {
    try {

      const rooms = await roomRepository.find({
        relations: {
          subjects: true,
          videos: true,
        }
      });

      return res.status(200).json(rooms);
    } catch (error: any) {
      return res.status(500).json({ error: 'Ocorreu um erro', message: error.message });
    }
  }
}
