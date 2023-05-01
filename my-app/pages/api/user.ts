import type { NextApiRequest, NextApiResponse } from 'next'
import client from '@/apollo-client'
import { GET_USER } from '@/queries'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { data } = await client.query({ query: GET_USER, variables: req.body })
      res.status(200)
      res.json(data)
      res.end()
    } catch (e) {
      res.status(404)
      res.json({ error: 'Profile not found' })
    }
  }

  res.status(400)
  res.end()
}

