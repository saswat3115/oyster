'use strict'

const card = require('./index');
const data = require('./datasource');
const expect = require('chai').expect
const _ = require('lodash');

describe('All test cases', () => {
    it('maximum fare should be max value from all fares', () => {
        expect(_.maxBy(data.fares, (o) => o.fare).fare).equals(data.maxfare);
    });

    it('load balance', () => {
        card.methods.reset();
        card.methods.loadBalance(30);
        expect(card.methods.viewBalance()).equals(30);
    });

    it('Do swipe In and validate the balance after swipe in', () => {
        card.methods.reset();
        card.methods.loadBalance(30);
        card.methods.swipeIn();
        expect(card.methods.viewBalance()).equals(30 - data.maxfare);
    });

    it('Calculate fares', () => {
        let sampleroutes = [['Holborn', "Earl's Court"],
          ['BUS','BUS'],
          ["Earl's Court", 'Hammersmith']]
        card.methods.reset();
        card.methods.loadBalance(30);
        card.methods.swipeIn();
        card.methods.swipeOut(sampleroutes);
        expect(card.methods.viewBalance()).equals(23.700000000000003);
    });
})