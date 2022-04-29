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

let members = dataHouse.results[0].members;

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

console.log(statistics);