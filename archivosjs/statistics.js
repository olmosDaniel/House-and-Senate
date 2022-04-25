let statistics = {
    "numberOfDemocrats": 0,
    "numberOfRepublicans": 0,
    "numberOfIndependents": 0
}

let democratList = dataSenate.results[0].members.filter((m) => m.party === "D");

let republicanList = dataSenate.results[0].members.filter((m) => m.party === "R");

let independentList = dataSenate.results[0].members.filter((m) => m.party === "ID");

statistics.numberOfDemocrats = democratList.length;

statistics.numberOfRepublicans = republicanList.length;

statistics.numberOfIndependents = independentList.length;

console.log(statistics)


// let members = dataSenate.results[0].members;

// statistics.numberOfDemocrats = members.filter((m) => m.party === "D").length; /* El length permite que vuelva como número y no como array */

// statistics.numberOfRepublicans = members.filter((m) => m.party === "R").length;

// statistics.numberOfIndependents = members.filter((m) => m.party === "ID").length;

// console.log("statistics.numberOfIndependents: ",statistics)

  // statistics.numberOfDemocrats = members.reduce((acc, value) => {
//     value.party==="D"&&acc++
//     return acc;
// },0)

// statistics.numberOfRepublicans = members.reduce((acc, value) => {
//     value.party==="R"&&acc++
//     return acc;
// },0)

// // statistics.numberOfIndependents = members.reduce((acc, value) => {
// //     value.party==="ID"&&acc++
// //     return acc;
// // },0)

// console.log("statistics.numberOfIndependents: ",statistics)