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
    if (loyalty==="least"?a.votes_with_party_pct >= b.votes_with_party_pct:a.votes_with_party_pct <= b.votes_with_party_pct) {
      return 1;
    } else {
      return -1;
    }
  });
  return arr.slice(0, Math.floor(tenPercent))
};

const tenPercentEngagementExtremeValues = (engaged, arr) => {
    const tenPercent = arr.length / 10;
    //if engaged equals the string "most" then this sort will order by the missed_votes_pct highest numbers
    //if engaged equals the string "least" then this sort will order by the missed_votes_pct lowest numbers
    arr.sort((a, b) => {
      if (engaged==="most"?a.missed_votes_pct >= b.missed_votes_pct:a.missed_votes_pct <= b.missed_votes_pct) {
        return 1;
      } else {
        return -1;
      }
    });
    return arr.slice(0, Math.floor(tenPercent))
  };
