import type { NextApiRequest, NextApiResponse } from 'next'
import client from '@/apollo-client'
import { ADD_STAR } from '@/mutations'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { data } = await client.mutate({ mutation: ADD_STAR, variables: req.body })
      res.status(200)
      res.json(data)
      res.end()
    } catch (e) {
      res.status(404)
      res.json({ error: 'Ops! Please try again' })
    }
  }

  res.status(400)
  res.end()
}

