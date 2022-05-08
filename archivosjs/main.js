const { createApp } = Vue
let URLHouse = "https://api.propublica.org/congress/v1/113/house/members"
let URLSenate = "https://api.propublica.org/congress/v1/113/senate/members"

let init = {
  method: "GET",
  headers: {
    "X-API-Key": APIKey
  }
}

const renderSelectOptions = (data) => {
  data.map(m => m.state).sort().filter((valor, index, array) => array.indexOf(valor) === index).forEach(state => {
    let option = document.createElement("option");
    option.setAttribute("value", state);
    option.innerHTML = state;
    document.getElementById("selectSenate")?.appendChild(option);
  });
}

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
    if (i - 1 >= Math.trunc(tenPercent) - 1 && a[Math.trunc(tenPercent) - 1]?.votes_with_party_pct === e.votes_with_party_pct) {
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

    if (i - 1 >= Math.trunc(tenPercent) - 1 && a[Math.trunc(tenPercent) - 1]?.missed_votes_pct === e.missed_votes_pct) {
      console.log("se repite desde tenPercentEngagementExtremeValues: ", e.missed_votes_pct);
      count++;
    }
  });
  console.log("veces: ", count);

  return arr.slice(0, Math.floor(tenPercent + count))
};

createApp({
  //variables
  data() {
    return {
      isSenateView: "",
      houses: [],
      senates: [],
      datos: [],
      loading: true,
      checkbox: {},
      selected: "",
      arrayChecked: [],
      statistics: {
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
    }
  },

  //antes del render
  created() {

  },

  //despues del render
  mounted() {

    this.isSenateView = document.getElementById("Senate");
    console.log(this.isSenateView)
    //fetch data
    if (!this.isSenateView) {
      fetch(URLHouse, init)
        .then(response => response.json())
        .then(data => {
          console.log("entra en house")
          this.loading = false;
          this.houses = data.results[0].members;
          renderSelectOptions(this.houses);
          
          this.statistics.numberOfDemocrats = filterByParty(this.houses, "D").length
          this.statistics.numberOfRepublicans = filterByParty(this.houses, "R").length
          this.statistics.numberOfIndependents = filterByParty(this.houses, "ID").length
          
          this.statistics.democratAverage = votesWithPartyAverageByParty(filterByParty(this.houses, "D"));
          this.statistics.republicanAverage = votesWithPartyAverageByParty(filterByParty(this.houses, "R"));
          this.statistics.independentAverage = votesWithPartyAverageByParty(filterByParty(this.houses, "ID")) || 0;
          
          this.statistics.leastLoyal = tenPercentLoayaltyExtremeValues("least", [...this.houses].filter((m) => m.votes_with_party_pct != 0));
          this.statistics.mostLoyal = tenPercentLoayaltyExtremeValues("most", [...this.houses]);
          
          this.statistics.leastEngaged = tenPercentEngagementExtremeValues("least", [...this.houses]);
          this.statistics.mostEngaged = tenPercentEngagementExtremeValues("most", [...this.houses]);

        })
        .catch(error => {
          this.loading = false;
          console.warn(error);
        })
    } else {
      console.log("es senaete")
      fetch(URLSenate, init)
        .then(response => response.json())
        .then(data => {
          this.loading = false;
          this.senates = data.results[0].members;
          renderSelectOptions(this.senates);

          this.statistics.numberOfDemocrats = filterByParty(this.senates, "D").length
          this.statistics.numberOfRepublicans = filterByParty(this.senates, "R").length
          this.statistics.numberOfIndependents = filterByParty(this.senates, "ID").length
          
          this.statistics.democratAverage = votesWithPartyAverageByParty(filterByParty(this.senates, "D"));
          this.statistics.republicanAverage = votesWithPartyAverageByParty(filterByParty(this.senates, "R"));
          this.statistics.independentAverage = votesWithPartyAverageByParty(filterByParty(this.senates, "ID")) || 0;
          
          this.statistics.leastLoyal = tenPercentLoayaltyExtremeValues("least", [...this.senates].filter((m) => m.votes_with_party_pct != 0));
          this.statistics.mostLoyal = tenPercentLoayaltyExtremeValues("most", [...this.senates]);
          
          this.statistics.leastEngaged = tenPercentEngagementExtremeValues("least", [...this.senates]);
          this.statistics.mostEngaged = tenPercentEngagementExtremeValues("most", [...this.senates]);

        })
        .catch(error => {
          this.loading = false;
          console.warn(error);
        })
    }

    this.checkbox = document.getElementsByName("parties");
    this.selected = document.getElementById("selectSenate")?.value;
  },

  //metodos
  methods: {
    clickButtonParty: function (e) {
      if (e.target.checked) {
        this.arrayChecked.push(e.target.value);
      } else {
        this.arrayChecked = this.arrayChecked.filter((ele) => ele !== e.target.value);
      }
    },

    onSelectChange: function (e) {
      this.selected = e.target.value;
    }

  },

  computed: {

    consoleLog: function () {
      console.log("computed: ")
    },

    logicaFiltros: function () {

      this.datos = [];
      //selected y arrayChecked tambien vienen de showtabledatasenate y showtabledatahouse
      if (this.selected === "" || this.selected === "Select state") {
        if (this.arrayChecked.length <= 0) {
          //selected esta vacio y check tambien
          if (this.isSenateView) {
            this.datos = this.senates;
          } else {
            this.datos = this.houses;
          }
        } else if (this.arrayChecked.length > 0) {
          this.datos = [];
          //selected esta vacio y check no
          this.arrayChecked.forEach((ele) => {
            if (this.isSenateView) {
              this.datos.push(
                ...this.senates.filter((m) => m.party === ele)
              );
            } else {
              this.datos.push(
                ...this.houses.filter((m) => m.party === ele)
              );
            }
          });
        }
      } else {
        if (this.arrayChecked.length <= 0) {
          //selected tiene algo y check esta vacio
          if (this.isSenateView) {
            this.datos = this.senates.filter((m) => m.state === this.selected);
          } else {
            this.datos = this.houses.filter((item) => item.state === this.selected);
          }
        } else if (this.arrayChecked.length > 0) {
          this.datos = [];
          //selected tiene algo y check tiene algo
          this.arrayChecked.forEach((ele) => {
            if (this.isSenateView) {
              this.datos.push(
                ...this.senates.filter((m) => m.party === ele)
              );
            } else {
              this.datos.push(
                ...this.houses.filter((m) => m.party === ele)
              );
            }
          });

          this.datos = this.datos.filter((item) => item.state === this.selected);
        }
      }

    }

  },

}).mount('#app')