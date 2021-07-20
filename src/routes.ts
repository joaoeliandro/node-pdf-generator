import { Router, Request, Response } from 'express';

import {prismaClient} from './database/prismaClient';

const routes = Router();

routes.get('/products', async (request: Request, response: Response) => {
  const products = await prismaClient.products.findMany();

  return response.json(products);
});

export {routes};
