import express from 'express';
import {PrismaClient} from '@prisma/client';
import dotenv from 'dotenv'

dotenv.config()
const router = express.Router();
const prisma = new PrismaClient();

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// GET /students
router.get('/', async (req, res, next) => {
    try {
        const students = await prisma.student.findMany({
           include: { campus: true } 
        });
        res.json(students);
    }
    catch (err) {
        next(err);
    }
});

// GET /students/:id
router.get('/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id)) {
            return res.status(400).json({error: "Invalid student id"});
        }
        const student = await prisma.student.findUnique({
            where: { id },
            include: { campus: true }
        });
        if (!student) return res.status(404).json({error: "Student not found"});
        res.json(student);
    }
    catch (err) {
        next(err)
    }
});

// POST /students
router.post('/', async (req, res, next) => {
    try {
        const { firstName, lastName, email, imageUrl, gpa, campusId } = req.body;
        if (!firstName || !lastName || !email) {
            return res.status(400).json({error: "firstName, lastName, and email are required."
            });
        }
        if (!emailRegex.test(email)) {
            return res.status(400).json({error: "Invalid email format"
            });
        }
        const parsedGpa = Number(gpa);
        if (
            gpa !== undefined &&
            (Number.isNaN(parsedGpa) || parsedGpa < 0 || parsedGpa > 4)
        ) {
            return res.status(400).json({
                error: "gpa must be between 0 and 4"
            });
        }
        const student = await prisma.student.create({
            data: {
                firstName,
                lastName,
                email,
                imageUrl,
                gpa: gpa !== undefined ? parsedGpa : 0.0,
                campusId: campusId ? Number(campusId) : null
            }
        });
        res.status(201).json(student);
    }
    catch (err) {
        next(err)
    }
});

// PUT /students/:id
router.put('/:id', async (req, res, next) => {
  try {
    const { firstName, lastName, email, imageUrl, gpa, campusId } = req.body;
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ error: 'firstName, lastName and email are required' });
    }
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    const parsedGpa = Number(gpa);
        if (
            gpa !== undefined &&
            (Number.isNaN(parsedGpa) || parsedGpa < 0 || parsedGpa > 4)
        ) {
            return res.status(400).json({
                error: "gpa must be between 0 and 4"
            });
        }
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
            return res.status(400).json({
                error: "Invalid student ID"
            });
        }
    const student = await prisma.student.update({
      where: { id },
      data: {
        firstName,
        lastName,
        email,
        imageUrl,
        gpa: gpa !== undefined ? parsedGpa : 0.0,
        campusId: campusId ? Number(campusId) : null
      }
    });
    res.json(student);
  } catch (err) {
    next(err);
  }
});

// DELETE /students/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
        if (Number.isNaN(id)) {
            return res.status(400).json({
                error: "Invalid student ID"
            });
        }
    await prisma.student.delete({
      where: { id }
    });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;
