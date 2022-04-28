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
