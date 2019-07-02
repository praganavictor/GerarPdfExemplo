const pdf = require("pdfjs");
const fs = require("fs");

module.exports = async ({ itens }) => {
  var doc = new pdf.Document({});

  var lorem =
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  doc.footer().pageNumber(
    function(curr, total) {
      return curr + " / " + total;
    },
    { textAlign: "center" }
  );

  var cell = doc.cell({ paddingBottom: 0.5 * pdf.cm });
  cell.text("Lista de participantes:", { fontSize: 16 });

  var table = doc.table({
    widths: [1.5 * pdf.cm, 1.5 * pdf.cm, null, 2 * pdf.cm, 2.5 * pdf.cm],
    borderHorizontalWidths: function(i) {
      return i < 2 ? 1 : 0.1;
    },
    padding: 5
  });

  var tr = table.header({ borderBottomWidth: 1.5 });
  tr.cell("#");
  tr.cell("Unit");
  tr.cell("Subject");
  tr.cell("Price", { textAlign: "right" });

  function addRow(qty, name, desc, price) {
    var tr = table.row();
    tr.cell(qty.toString());
    tr.cell("pc.");

    var article = tr.cell().text();
    article
      .add(name, {})
      .br()
      .add(desc, { fontSize: 11, textAlign: "justify" });

    tr.cell(price, { textAlign: "right" });
  }

  for (item of itens) {
    addRow(item.receiptId, item.name, lorem, item.price1);
  }
  addRow(2, "Article A", lorem, "500");
  addRow(1, "Article B", lorem, "250");
  addRow(2, "Article C", lorem, "330");
  addRow(3, "Article D", lorem, "1220");
  addRow(2, "Article E", lorem, "120");
  addRow(5, "Article F", lorem, "50");
  addRow(5, "Article F", lorem, "50");
  addRow(5, "Article F", lorem, "50");
  addRow(5, "Article F", lorem, "50");

  doc.pipe(fs.createWriteStream("output.pdf"));
  await doc.end();
};
