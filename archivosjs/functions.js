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

//creo un option por cada estado en el select de id selectSenate
const renderSelectOptions = (data) => {
    data.results[0].members.map(m => m.state).sort().filter((valor, index, array) => array.indexOf(valor) === index).forEach(state => {
        let option = document.createElement("option");
        option.setAttribute("value", state);
        option.innerHTML = state;
        document.getElementById("selectSenate").appendChild(option);
    });
}
