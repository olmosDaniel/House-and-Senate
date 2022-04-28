const renderTableLoyal = (data) => {
    let tableBody = document.getElementById("tableLoyal");

    data.map((rowData, i) => {
      let row = document.createElement("tr");

      let cellName = document.createElement("td");
      cellName.appendChild(document.createTextNode(rowData.first_name + " " + (rowData.middle_name || " ") + " " + rowData.last_name));
      row.appendChild(cellName);

      let cellMissVotes = document.createElement("td");
      cellMissVotes.appendChild(document.createTextNode( rowData.total_votes && ((rowData.total_votes * 100) / rowData.votes_with_party_pct).toFixed(2)));
      row.appendChild(cellMissVotes);

      let cellPercentage = document.createElement("td");
      cellPercentage.appendChild(document.createTextNode(rowData.votes_with_party_pct));
      row.appendChild(cellPercentage);

      tableBody.appendChild(row);
    });
  
  };