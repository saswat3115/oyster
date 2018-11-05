const data = require('./datasource');
const _ = require('lodash');

var userBalance = 0;

function reset() {
    userBalance = 0;
}

function viewBalance() {
    return userBalance;
}

// loading the balance
function loadBalance(amount) {
    userBalance = userBalance + amount;
}

function swipeIn() {
    userBalance = userBalance - data.maxfare;
}

function swipeOut(routes) {
    let finalFare = calculateFinalFare(calculateRoute(routes));
    if (finalFare < data.maxfare) {
        userBalance += data.maxfare - finalFare;
    } else {
        userBalance -= finalFare - data.maxfare;
    }    
}

// ***
// route data format
const sampleroutes = [['Holborn', "Earl's Court"],
          ['BUS','BUS'],
          ["Earl's Court", 'Hammersmith']]
// ***
function calculateRoute(routes) {
    if (routes.length) {
        let routeIndexes = [];
        for (let i = 0; i <  routes.length; i++) {            
            
            let fromZone = data.stations.find(f => f.station === routes[i][0]).zones;            
            let toZone = data.stations.find(t => t.station === routes[i][1]).zones;

            if (fromZone.length > toZone.length) {
                routeIndexes.push(getMinFareFromMultiRoute(toZone, fromZone));
            } else if (fromZone.length < toZone.length){
                routeIndexes.push(getMinFareFromMultiRoute(fromZone, toZone));
            }  else {
                routeIndexes.push([fromZone[0], toZone[0]]);
            }          
        }
        return routeIndexes;
    }
}

function getMinFareFromMultiRoute(route, multiRoute) {
    let routes = [];
    for (let i =0; i < multiRoute.length; i++) {
        routes.push([route[0], multiRoute[i]]);
    }
    
    let fare1 = data.fares.filter(f => _.isEqual(f.journey, _.uniq(routes[0])))[0].fare;
    let fare2 = data.fares.filter(f => _.isEqual(f.journey, _.uniq(routes[1])))[0].fare;

    if (Math.min(fare1, fare2) === fare1) {
        return routes[0];
    } else { 
        return routes[1];
    }
}

function calculateFinalFare(finalRoutes) {
    let fare = 0;
    finalRoutes.forEach(route => {
        fare += data.fares.find(f => _.isEqual(f.journey, _.uniq(route))).fare;
    });
    return fare.toFixed(2);
}


exports.methods = {
    reset: reset,
    viewBalance: viewBalance,
    loadBalance: loadBalance,
    swipeIn: swipeIn,
    swipeOut: swipeOut,
    calculateFinalFare: calculateFinalFare
}

loadBalance(30);
swipeIn();
console.log(swipeOut(sampleroutes));
console.log(userBalance);

