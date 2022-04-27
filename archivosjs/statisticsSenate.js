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

let members = dataSenate.results[0].members;

statistics.numberOfDemocrats = filterByParty(members, "D").length
statistics.numberOfRepublicans = filterByParty(members, "R").length
statistics.numberOfIndependents = filterByParty(members, "ID").length

statistics.democratAverage = votesWithPartyAverageByParty(filterByParty(members, "D"));
statistics.republicanAverage = votesWithPartyAverageByParty(filterByParty(members, "R"));
statistics.independentAverage = votesWithPartyAverageByParty(filterByParty(members, "ID")) || 0;

statistics.leastLoyal = tenPercentLoayaltyExtremeValues("least", [...members]);
statistics.mostLoyal = tenPercentLoayaltyExtremeValues("most", [...members]);

statistics.leastEngaged = tenPercentEngagementExtremeValues("least", [...members]);
statistics.mostEngaged = tenPercentEngagementExtremeValues("most", [...members]);

console.log(statistics);


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