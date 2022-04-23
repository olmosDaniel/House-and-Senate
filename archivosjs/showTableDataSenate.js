const checkbox = document.getElementsByName("parties");
const select = document.getElementById('selectSenate');
let arrayChecked = [];
let selected = "";
let retorno = dataSenate.results[0].members;

handleFilterLogic(dataSenate);
