import { Router } from "express";
import { RoomController } from "./controllers/RoomController";
import { SubjectController } from "./controllers/SubjectController";

const router = Router();

router.get('/health', (req, res) => {
  res.json({ message: 'App working pretty fine so far!' });
})

router.post('/rooms/:roomId/videos/createVideo', new RoomController().createVideo);
router.post('/rooms/:roomId/addSubject', new RoomController().addSubject);
router.get('/rooms/:roomId', new RoomController().findOne);
router.get('/rooms', new RoomController().list);
router.post('/rooms', new RoomController().create);
router.post('/subjects', new SubjectController().create);
router.get('/subjects', new SubjectController().list);

export default router;
