let data = [];
let members = [];

if (typeof dataSenate !== 'undefined') {
  data = dataSenate;
  members = dataSenate.results[0].members;
}
if (typeof dataHouse !== 'undefined') {
  data = dataHouse;
  members = dataHouse.results[0].members;
}

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

    tableBody&&tableBody.appendChild(row);
  });

};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*creo una funcion que me permite eliminar la tabla y crear una nueva*/
const refreshTable = () => {
  //elimino el tbody
  document.getElementById("tableBody").remove();
  //creo un nuevo tbody
  let tableB = document.createElement("tbody");
  //le pongo el mismo id que tenia antes
  tableB.setAttribute("id", "tableBody");
  //agrego el tbody a la tabla
  document.getElementById("tablecontainer").appendChild(tableB);
};

const logicaFiltros = (data) => {
  retorno = data.results[0].members;//retorno viene de showtabledatasenate y showtabledatahouse
  //selected y arrayChecked tambien vienen de showtabledatasenate y showtabledatahouse
  if (selected === "" || selected === "Select state") {
      if (arrayChecked.length <= 0) {
          /*selected esta vacio y check tambien*/
          retorno = data.results[0].members;
      } else if (arrayChecked.length > 0) {
          retorno = [];
          /*selected esta vacio y check no*/
          arrayChecked.forEach((ele) => {
              retorno.push(
                  ...data.results[0].members.filter((m) => m.party === ele)
              );
          });
      }
  } else {
      if (arrayChecked.length <= 0) {
          /*selected tiene algo y check esta vacio*/
          retorno = retorno.filter((item) => item.state === selected);
      } else if (arrayChecked.length > 0) {
          retorno = [];
          /*selected tiene algo y check tiene algo*/
          arrayChecked.forEach((ele) => {
              retorno.push(
                  ...data.results[0].members.filter((m) => m.party === ele)
              );
          });

          retorno = retorno.filter((item) => item.state === selected);
      }
  }

  return retorno
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//creo un option por cada estado en el select de id selectSenate
const renderSelectOptions = (data) => {
  data.results[0].members.map(m => m.state).sort().filter((valor, index, array) => array.indexOf(valor) === index).forEach(state => {
      let option = document.createElement("option");
      option.setAttribute("value", state);
      option.innerHTML = state;
      document.getElementById("selectSenate")?.appendChild(option);
  });
}

const handleFilterLogic = (data) => {
  showTable(retorno);

  const eventListenerDeSelect = () => {
      select?.addEventListener('change', function () {
          refreshTable(); //cada vez que se toca un select se crea una nueva tabla
          selected = this.value;

          showTable(logicaFiltros(data));
      });
  }

  eventListenerDeCheckbox = () => {
      checkbox.forEach((e) => {
          e.addEventListener("change", function (event) {
              //eventListenerDeSelect();
              if (event.currentTarget.checked) {
                  refreshTable(); //cada vez que se toca un checkbox se crea una nueva tabla
                  arrayChecked.push(event.currentTarget.value);

                  showTable(logicaFiltros(data));

              } else {
                  refreshTable(); //cada vez que se quita un checkbox se crea una nueva tabla
                  //elimino un elemento del array
                  arrayChecked = arrayChecked.filter((ele) => ele !== event.currentTarget.value);

                  showTable(logicaFiltros(data));

              }
          });
      });
  }

  renderSelectOptions(data);
  eventListenerDeSelect();
  eventListenerDeCheckbox();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const checkbox = document.getElementsByName("parties");
const select = document.getElementById('selectSenate');
let arrayChecked = [];
let selected = "";
let retorno = []

if (typeof dataSenate !== 'undefined') {
  retorno = dataSenate?.results[0].members;
  handleFilterLogic(dataSenate);
}
if (typeof dataHouse !== 'undefined') {
  retorno = dataHouse?.results[0].members;
  handleFilterLogic(dataHouse);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const filterByParty = (arr, party) => arr.filter((x) => x.party === party);

const votesWithPartyAverageByParty = (arr) => {
  let acc = 0;
  arr.forEach((x) => {
    acc = acc + x.votes_with_party_pct;
  });
  return acc / arr.length;
};

const tenPercentLoayaltyExtremeValues = (loyalty, arr) => {
  const tenPercent = arr.length / 10;
  //if loyalty equals the string "most" then this sort will order by the votes_with_party_pct highest numbers
  //if loyalty equals the string "least" then this sort will order by the votes_with_party_pct lowest numbers
  arr.sort((a, b) => {
    if (loyalty === "least" ? a.votes_with_party_pct >= b.votes_with_party_pct : a.votes_with_party_pct <= b.votes_with_party_pct) {
      return 1;
    } else {
      return -1;
    }
  });
  let count = 0;
  //obtengo la repeticion de votes_with_party_pct a partir del primer 10%,
  //al ser un array ordenado sé que solo va a haber repetidos en posiciones consecutivas
  arr.map((e, i, a) => {
    if (i-1 >= Math.trunc(tenPercent) - 1 && a[Math.trunc(tenPercent) - 1]?.votes_with_party_pct === e.votes_with_party_pct) {
      console.log("se repite desde tenPercentLoayaltyExtremeValues: ", e.votes_with_party_pct);
      count++;
    }
  });
  console.log("veces: ", count);

  return arr.slice(0, Math.floor(tenPercent + count))
};

const tenPercentEngagementExtremeValues = (engaged, arr) => {
  const tenPercent = arr.length / 10;
  //if engaged equals the string "most" then this sort will order by the missed_votes_pct highest numbers
  //if engaged equals the string "least" then this sort will order by the missed_votes_pct lowest numbers
  arr.sort((a, b) => {
    if (engaged === "most" ? a.missed_votes_pct >= b.missed_votes_pct : a.missed_votes_pct <= b.missed_votes_pct) {
      return 1;
    } else {
      return -1;
    }
  });

  let count = 0;
  //obtengo la repeticion de missed_votes_pct a partir del primer 10%,
  //al ser un array ordenado sé que solo va a haber repetidos en posiciones consecutivas
  arr.map((e, i, a) => {

    if (i-1 >= Math.trunc(tenPercent) - 1 && a[Math.trunc(tenPercent) - 1]?.missed_votes_pct === e.missed_votes_pct) {
      console.log("se repite desde tenPercentEngagementExtremeValues: ", e.missed_votes_pct);
      count++;
    }
  });
  console.log("veces: ", count);

  return arr.slice(0, Math.floor(tenPercent+ count))
};

let statistics = {
  numberOfDemocrats: 0,
  numberOfRepublicans: 0,
  numberOfIndependents: 0,
  democratAverage: 0,
  republicanAverage: 0,
  independentAverage: 0,
  leastLoyal: [], 
  mostLoyal: [],
  leastEngaged: [], 
  mostEngaged: []
}

statistics.numberOfDemocrats = filterByParty(members, "D").length
statistics.numberOfRepublicans = filterByParty(members, "R").length
statistics.numberOfIndependents = filterByParty(members, "ID").length

statistics.democratAverage = votesWithPartyAverageByParty(filterByParty(members, "D"));
statistics.republicanAverage = votesWithPartyAverageByParty(filterByParty(members, "R"));
statistics.independentAverage = votesWithPartyAverageByParty(filterByParty(members, "ID")) || 0;

statistics.leastLoyal = tenPercentLoayaltyExtremeValues("least", [...members].filter((m) => m.votes_with_party_pct != 0));
statistics.mostLoyal = tenPercentLoayaltyExtremeValues("most", [...members]);

statistics.leastEngaged = tenPercentEngagementExtremeValues("least", [...members]);
statistics.mostEngaged = tenPercentEngagementExtremeValues("most", [...members]);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
  averageR.appendChild(document.createTextNode(statistics.republicanAverage.toFixed(2)));
  row1.appendChild(averageR);

  tableBody&&tableBody.appendChild(row1);

  let row2 = document.createElement("tr");

  let cellKeyD = document.createElement("td");
  cellKeyD.appendChild(document.createTextNode("Democrat"));
  row2.appendChild(cellKeyD);

  let numberD = document.createElement("td");
  numberD.appendChild(document.createTextNode(statistics.numberOfDemocrats));
  row2.appendChild(numberD);

  let averageD = document.createElement("td");
  averageD.appendChild(document.createTextNode(statistics.democratAverage.toFixed(2)));
  row2.appendChild(averageD);

  tableBody&&tableBody.appendChild(row2);

  let row3 = document.createElement("tr");

  let cellKeyI = document.createElement("td");
  cellKeyI.appendChild(document.createTextNode("Independent"));
  row3.appendChild(cellKeyI);


  let numberI = document.createElement("td");
  numberI.appendChild(document.createTextNode(statistics.numberOfIndependents));
  row3.appendChild(numberI);

  let averageI = document.createElement("td");
  averageI.appendChild(document.createTextNode(statistics.independentAverage.toFixed(2)));
  row3.appendChild(averageI);

  tableBody&&tableBody.appendChild(row3);

  let row4 = document.createElement("tr");

  let cellKeyT = document.createElement("td");
  cellKeyT.appendChild(document.createTextNode("Total"));
  row4.appendChild(cellKeyT);


  let numberT = document.createElement("td");
  numberT.appendChild(document.createTextNode(statistics.numberOfIndependents + statistics.numberOfDemocrats + statistics.numberOfRepublicans));
  row4.appendChild(numberT);

  let averageT = document.createElement("td");
  
  averageT.appendChild(document.createTextNode((statistics.democratAverage + statistics.republicanAverage + statistics.independentAverage).toFixed(2)));
  row4.appendChild(averageT);

  tableBody&&tableBody.appendChild(row4);

};

renderTableAtGlance(statistics);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const renderTableAttendance = (data) => {
  
  let tableBody = document.getElementById("tableAttendance");

  data.map((rowData, i) => {
    let row = document.createElement("tr");

    let cellName = document.createElement("td");
    cellName.appendChild(document.createTextNode(rowData.first_name + " " + (rowData.middle_name || " ") + " " + rowData.last_name));
    row.appendChild(cellName);

    let cellMissVotes = document.createElement("td");
    cellMissVotes.appendChild(document.createTextNode(rowData.missed_votes));
    row.appendChild(cellMissVotes);

    let cellPercentage = document.createElement("td");
    cellPercentage.appendChild(document.createTextNode(rowData.missed_votes_pct));
    row.appendChild(cellPercentage);

    tableBody&&tableBody.appendChild(row);
  });

};

const renderTableLoyal = (data) => {
  let tableBody = document.getElementById("tableLoyal");

  data.map((rowData, i) => {
    let row = document.createElement("tr");

    let cellName = document.createElement("td");
    cellName.appendChild(document.createTextNode(rowData.first_name + " " + (rowData.middle_name || " ") + " " + rowData.last_name));
    row.appendChild(cellName);

    let cellMissVotes = document.createElement("td");
    cellMissVotes.appendChild(document.createTextNode(Math.round((rowData.total_votes * rowData.votes_with_party_pct) / 100)));
    row.appendChild(cellMissVotes);

    let cellPercentage = document.createElement("td");
    cellPercentage.appendChild(document.createTextNode(rowData.votes_with_party_pct));
    row.appendChild(cellPercentage);

    tableBody&&tableBody.appendChild(row);
  });

};

const renderTableAttendanceMost = (data) => {
  let tableBody = document.getElementById("tableAttendanceMost");

  data.map((rowData, i) => {
    let row = document.createElement("tr");

    let cellName = document.createElement("td");
    cellName.appendChild(document.createTextNode(rowData.first_name + " " + (rowData.middle_name || " ") + " " + rowData.last_name));
    row.appendChild(cellName);

    let cellMissVotes = document.createElement("td");
    cellMissVotes.appendChild(document.createTextNode(rowData.missed_votes));
    row.appendChild(cellMissVotes);

    let cellPercentage = document.createElement("td");
    cellPercentage.appendChild(document.createTextNode(rowData.missed_votes_pct));
    row.appendChild(cellPercentage);

    tableBody&&tableBody.appendChild(row);
  });

};

const renderTableLoyalMost = (data) => {
  let tableBody = document.getElementById("tableLoyalMost");

  data.map((rowData, i) => {
    let row = document.createElement("tr");

    let cellName = document.createElement("td");
    cellName.appendChild(document.createTextNode(rowData.first_name + " " + (rowData.middle_name || " ") + " " + rowData.last_name));
    row.appendChild(cellName);

    let cellMissVotes = document.createElement("td");
    cellMissVotes.appendChild(document.createTextNode(Math.round((rowData.total_votes * rowData.votes_with_party_pct) / 100)));
    row.appendChild(cellMissVotes);

    let cellPercentage = document.createElement("td");
    cellPercentage.appendChild(document.createTextNode(rowData.votes_with_party_pct));
    row.appendChild(cellPercentage);

    tableBody&&tableBody.appendChild(row);
  });

};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

renderTableAttendance(statistics.leastEngaged);
renderTableLoyal(statistics.leastLoyal);
renderTableAttendanceMost(statistics.mostEngaged);
renderTableLoyalMost(statistics.mostLoyal);