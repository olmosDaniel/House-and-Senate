const checkbox = document.getElementsByName("parties");
const select = document.getElementById('selectSenate');
let arrayChecked = [];
let selected = "";
let retorno = dataHouse.results[0].members;

handleFilterLogic(dataHouse);