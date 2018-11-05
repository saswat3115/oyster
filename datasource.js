const stations = [
    { station: 'Holborn', zones: [1]},
    { station: "Earl's Court", zones: [1, 2]},
    { station: 'Wimbledon', zones: [3]},
    { station: 'Hammersmith', zones: [2]},
    { station: 'BUS', zones: [0]}
]


const fares = [
    { id: 1, journey: [1], fare: 2.50},
    { id: 2, journey: [2], fare: 2.00},
    { id: 2, journey: [3], fare: 2.00},
    { id: 3, journey: [1,2], fare: 3.00},
    { id: 3, journey: [2,1], fare: 3.00},
    { id: 3, journey: [1,3], fare: 3.00},
    { id: 3, journey: [3,1], fare: 3.00},
    { id: 4, journey: [2,3], fare: 2.25},
    { id: 4, journey: [3,2], fare: 2.25},
    { id: 5, journey: [1,3], fare: 3.20},
    { id: 6, journey: [0], fare: 1.80},
]

exports.stations = stations;
exports.fares = fares;
exports.maxfare = 3.20;