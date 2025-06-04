import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
    })
    res.status(200).json(posts)
  }

  if (req.method === 'POST') {
    const { title, content } = req.body

    if (!title) {
      return res.status(400).json({ error: 'Title is required' })
    }

    const post = await prisma.post.create({
      data: { title, content },
    })

    res.status(201).json(post)
  }
}
