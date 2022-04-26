let statistics = {
    "numberOfDemocrats": 0,
    "numberOfRepublicans": 0,
    "numberOfIndependents": 0,
    "democratAverage": 0,
    "republicanAverage": 0
}

let members = dataSenate.results[0].members;

let democratList = dataSenate.results[0].members.filter((m) => m.party === "D");

let republicanList = dataSenate.results[0].members.filter((m) => m.party === "R");

let independentList = dataSenate.results[0].members.filter((m) => m.party === "ID");

statistics.numberOfDemocrats = democratList.length;

statistics.numberOfRepublicans = republicanList.length;

statistics.numberOfIndependents = independentList.length;

let accDemocrats = 0;
democratList.forEach(m => {
  accDemocrats = accDemocrats + m.votes_with_party_pct;
})

let democratAverage = accDemocrats / democratList.length;

statistics.democratAverage = democratAverage;


let accRepublicans = 0;
republicanList.forEach(m => {
  accRepublicans = accRepublicans + m.votes_with_party_pct;
})

dataSenate.results[0].members.length;

let republicanAverage = accRepublicans / republicanList.length;

statistics.republicanAverage = republicanAverage;

// Members Who Least Often Vote with Their Party

const tenPercent = dataSenate.results[0].members.length/10

members.sort((a, b) => {
  if (a.votes_with_party_pct >= b.votes_with_party_pct){
    return 1
  } else {
    return -1
  }
})

console.log("members: ",  members.slice(0, Math.floor(tenPercent)))


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