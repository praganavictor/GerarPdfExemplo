const pdf = require("pdfjs");
const fs = require("fs");

module.exports = async ({ itens }) => {
  var doc = new pdf.Document({});

  doc.footer().pageNumber(
    function(curr, total) {
      return curr + " / " + total;
    },
    { textAlign: "center" }
  );

  const src = fs.readFileSync("assinatura.jpg");
  console.log(src);
  const bas64 =
    "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";

  var header = doc
    .header()
    .table({ widths: [null, null], paddingBottom: 1 * pdf.cm })
    .row();
  header.cell().image(bas64, { height: 2 * pdf.cm });

  var cell = doc.cell({ paddingBottom: 0.5 * pdf.cm });
  cell.text("Lista de participantes:", { fontSize: 16 });

  var table = doc.table({
    widths: [1.5 * pdf.cm, null, 1.5 * pdf.cm],
    borderHorizontalWidths: function(i) {
      return i < 2 ? 1 : 0.1;
    },
    padding: 5
  });

  var tr = table.header({ borderBottomWidth: 1.5 });
  tr.cell("#");
  tr.cell("Name");
  tr.cell("Price");

  function addRow(qty, name, price) {
    var tr = table.row();
    tr.cell(qty.toString());
    tr.cell(name);
    tr.cell(price);
  }

  for (item of itens) {
    addRow(item.receiptId, item.name, item.price1);
  }

  doc.pipe(fs.createWriteStream("participantes.pdf"));
  await doc.end();
};
