const showTable = (data) => {
  let tableBody = document.getElementById("tableBody");

  data.map((rowData, i) => {
    let row = document.createElement("tr");

    let cellFullName = document.createElement("td");
    let a = document.createElement("a");
    a.href = rowData.url;
    a.innerText =
      rowData.first_name +
      " " +
      (rowData.middle_name || " ") +
      " " +
      rowData.last_name;
    cellFullName.appendChild(a);
    row.appendChild(cellFullName);

    let cellParty = document.createElement("td");
    cellParty.appendChild(document.createTextNode(rowData.party));
    row.appendChild(cellParty);

    let cellState = document.createElement("td");
    cellState.appendChild(document.createTextNode(rowData.state));
    row.appendChild(cellState);

    let cellSeniority = document.createElement("td");
    cellSeniority.appendChild(document.createTextNode(rowData.seniority));
    row.appendChild(cellSeniority);

    let cellTotal = document.createElement("td");
    cellTotal.appendChild(
      document.createTextNode(rowData.votes_with_party_pct + " %")
    );
    row.appendChild(cellTotal);

    tableBody.appendChild(row);
  });

};
