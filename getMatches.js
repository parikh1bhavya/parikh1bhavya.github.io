function cartesianProduct(a) { // a = array of array
    var i, j, l, m, a1, o = [];
    if (!a || a.length == 0) return a;

    a1 = a.splice(0, 1)[0]; // the first array of a
    a = cartesianProduct(a);
    for (i = 0, l = a1.length; i < l; i++) {
        if (a && a.length) for (j = 0, m = a.length; j < m; j++)
            o.push([a1[i]].concat(a[j]));
        else
            o.push([a1[i]]);
    }
    return o;
}

function choose(choices) {
  let index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

function matchesDay(match, day) {
  return match.indexOf(day) > -1;
}

function matchesActivity(match, activity) {
  return match.indexOf(activity) > -1;
}

function matchesCriteria(match, day, activity) {
    return matchesDay(match, day) && matchesActivity(match, activity);
}

function getAMatch(allMatches, requiredActivities, requiredDays) {
  var response = null;
  while (response === null) {

    let match = choose(allMatches);
    let allCombinations = cartesianProduct([requiredActivities, requiredDays])

    for (pack of allCombinations) {
      let activity = pack[0]
      let day = pack[1]

      if (matchesCriteria(match, day, activity)) {
        response = match;
        break;
      }
    }

  }

  return response;
}

// let allMatches = localStorage.getItem("allMatches")
let allMatches = require('./out.json');
let userChosenActivities = ["biking", "hiking"];
let userChosenDays = ["this saturday"];
console.log(getAMatch(allMatches, userChosenActivities, userChosenDays));
