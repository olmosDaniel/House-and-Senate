const renderTableAtGlance = (statistics) => {
    let tableBody = document.getElementById("tableAtGlance");
  
    let row1 = document.createElement("tr");

    let cellKeyR = document.createElement("td");
    cellKeyR.appendChild(document.createTextNode("Republican"));
    row1.appendChild(cellKeyR);

    let numberR = document.createElement("td");
    numberR.appendChild(document.createTextNode(statistics.numberOfRepublicans));
    row1.appendChild(numberR);

    let averageR = document.createElement("td");
    averageR.appendChild(document.createTextNode(statistics.republicanAverage));
    row1.appendChild(averageR);

    tableBody.appendChild(row1);

    let row2 = document.createElement("tr");

    let cellKeyD = document.createElement("td");
    cellKeyD.appendChild(document.createTextNode("Democrat"));
    row2.appendChild(cellKeyD);

    let numberD = document.createElement("td");
    numberD.appendChild(document.createTextNode(statistics.numberOfDemocrats));
    row2.appendChild(numberD);

    let averageD = document.createElement("td");
    averageD.appendChild(document.createTextNode(statistics.democratAverage));
    row2.appendChild(averageD);

    tableBody.appendChild(row2);

    let row3 = document.createElement("tr");

    let cellKeyI = document.createElement("td");
    cellKeyI.appendChild(document.createTextNode("Independent"));
    row3.appendChild(cellKeyI);


    let numberI = document.createElement("td");
    numberI.appendChild(document.createTextNode(statistics.numberOfIndependents));
    row3.appendChild(numberI);

    let averageI = document.createElement("td");
    averageI.appendChild(document.createTextNode(statistics.independentAverage));
    row3.appendChild(averageI);

    tableBody.appendChild(row3);

    let row4 = document.createElement("tr");

    let cellKeyT = document.createElement("td");
    cellKeyT.appendChild(document.createTextNode("Total"));
    row4.appendChild(cellKeyT);


    let numberT = document.createElement("td");
    numberT.appendChild(document.createTextNode(statistics.numberOfIndependents + statistics.numberOfDemocrats + statistics.numberOfRepublicans));
    row4.appendChild(numberT);

    let averageT = document.createElement("td");
    averageT.appendChild(document.createTextNode(statistics.democratAverage + statistics.republicanAverage + statistics.independentAverage));
    row4.appendChild(averageT);

    tableBody.appendChild(row4);
  
  };

  renderTableAtGlance(statistics);
  