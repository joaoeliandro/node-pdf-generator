import { Router, Request, Response } from 'express';
import { nanoid } from 'nanoid';
import fs from 'fs';

import PDFPrinter from 'pdfmake';

import { prismaClient } from './database/prismaClient';
import { fonts } from './utils/fontsReport';
import { docDefinitions } from './utils/docDefinitions';

const routes = Router();

routes.get('/products', async (request: Request, response: Response) => {
  try {
    const products = await prismaClient.products.findMany();

    return response.status(200).json(products);
  } catch (err) {
    return response.status(400).json({ error: err });
  }
});

routes.post('/products', async (request: Request, response: Response) => {
  try {
    const { description, price, quantity } = request.body;

    const products = await prismaClient.products.create({
      data: {
        id: nanoid(),
        description,
        price,
        quantity
      }
    });

    return response.status(201).json(products);
  } catch (err) {
    return response.status(400).json({ error: err });
  }
});

routes.get("/products/report", async (request: Request, response: Response) => {
  const products = await prismaClient.products.findMany();

  const fontHelvetica = {
    Helvetica: fonts.Helvetica,
  };

  const printer = new PDFPrinter(fontHelvetica);

  const pdfDoc = printer.createPdfKitDocument(await docDefinitions(products));

  pdfDoc.pipe(fs.createWriteStream('./src/tmp/Report.pdf'));

  const chunks: Uint8Array[] = [];

  pdfDoc.on("data", (chunk) => {
    chunks.push(chunk);
  });

  pdfDoc.end();

  pdfDoc.on("end", () => {
    const result = Buffer.concat(chunks);

    response.status(200).end(result);
  });
});

export { routes };
