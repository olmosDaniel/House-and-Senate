const renderTableLoyalMost = (data) => {
    let tableBody = document.getElementById("tableLoyalMost");

    data.map((rowData, i) => {
      let row = document.createElement("tr");

      let cellName = document.createElement("td");
      cellName.appendChild(document.createTextNode(rowData.first_name));
      row.appendChild(cellName);

      let cellMissVotes = document.createElement("td");
      cellMissVotes.appendChild(document.createTextNode(rowData.missed_votes));
      row.appendChild(cellMissVotes);

      let cellPercentage = document.createElement("td");
      cellPercentage.appendChild(document.createTextNode(rowData.votes_with_party_pct));
      row.appendChild(cellPercentage);

      tableBody.appendChild(row);
    });
  
  };