import { TDocumentDefinitions } from 'pdfmake/interfaces';

export const docDefinitions: TDocumentDefinitions = {
  defaultStyle: { font: "Helvetica" },
  content: [
    { text: "My first report" }
  ],
};
