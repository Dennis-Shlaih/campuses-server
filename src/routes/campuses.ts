import express from 'express';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();
const prisma = new PrismaClient();
// GET /campuses
router.get('/', async (req, res, next) => {
  try {
    const campuses = await prisma.campus.findMany({
      include: { students: true }
    });
    res.json(campuses);
  } catch (err) {
    next(err);
  }
});

// GET /campuses/:id
router.get('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        return res.status(400).json({ error: "Invalid campus ID" });
      }
    const campus = await prisma.campus.findUnique({
      where: {id},
      include: { students: true }
    });
    if (!campus) return res.status(404).json({ error: 'Campus not found' });
    res.json(campus);
  } catch (err) {
    next(err);
  }
});

// POST /campuses
router.post('/', async (req, res, next) => {
  try {
    const { name, address, imageUrl, description } = req.body;
    if (!name || !address) {
      return res.status(400).json({ error: 'name and address are required' });
    }
    const campus = await prisma.campus.create({
      data: { name, address, imageUrl, description }
    });
    res.status(201).json(campus);
  } catch (err) {
    next(err);
  }
});

// PUT /campuses/:id
router.put('/:id', async (req, res, next) => {
  try {
    const { name, address, imageUrl, description } = req.body;
    if (!name || !address) {
      return res.status(400).json({ error: 'name and address are required' });
    }
    const campus = await prisma.campus.update({
      where: { id: Number(req.params.id) },
      data: { name, address, imageUrl, description }
    });
    res.json(campus);
  } catch (err) {
    next(err);
  }
});

// DELETE /campuses/:id
router.delete('/:id', async (req, res, next) => {
  try {
    await prisma.campus.delete({
      where: { id: Number(req.params.id) }
    });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;