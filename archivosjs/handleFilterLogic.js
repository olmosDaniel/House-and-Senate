const handleFilterLogic = (data) => {
    showTable(retorno);

    const eventListenerDeSelect = () => {
        select.addEventListener('change', function () {
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