import { TableCell, TDocumentDefinitions } from 'pdfmake/interfaces';
import { formatPrice } from './formatCurrency';

const extractValuesProducts = async (products: any) => {
  const body = [];

  const columnsTitle = mapTableTitleProducts();

  body.push(columnsTitle);

  for await (let product of products) {
    const rows = new Array();

    rows.push(product.id);
    rows.push(product.description);
    rows.push(formatPrice(product.price));
    rows.push(product.quantity);

    body.push(rows);
  }

  return body;
}

const mapTableTitleProducts = () => {
  const columnsTitle = new Array();

  const tableTitle: TableCell[] = [
    { text: "ID", style: 'columnsTitle' },
    { text: "Descrição", style: 'columnsTitle' },
    { text: "Preço", style: 'columnsTitle' },
    { text: "Quantidade", style: 'columnsTitle' }
  ];

  tableTitle.forEach(column => columnsTitle.push(column));

  return columnsTitle;
}

export const docDefinitions = async (data: any): Promise<TDocumentDefinitions> => {
  const body = await extractValuesProducts(data);

  return {
    defaultStyle: { font: "Helvetica" },
    content: [
      {
        columns: [
          {
            text: "Relatório de produtos",
            style: "header",
            alignment: 'left'
          },
          {
            text: new Date(Date.now()).toLocaleDateString('pt-BR'),
            alignment: 'right',
            bold: false,
            fontSize: 10
          },
        ],
      },
      {
        table: {
          widths: ['auto', '*', 'auto', 80],
          heights: function (row) {
            return 30;
          },
          body,
        },
      }
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 30],
      },
      columnsTitle: {
        fontSize: 14,
        bold: true,
        fillColor: '#EEC03F',
        margin: [0, 10, 0, 0],
        alignment: 'center'
      }
    }
  }
};
