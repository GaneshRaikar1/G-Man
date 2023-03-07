process.argv[2] = 'input.txt'
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const { expect } = chai;
sinon.spy(console, 'log');

const functionmodule = require('./functions.js')
sinon.spy(functionmodule);
const {main,setSource,setDestination, calculatePower,data}=functionmodule

describe('', () => {
    afterEach(()=>{
        Object.keys(functionmodule).forEach(function (key) {
            functionmodule[key].resetHistory()
        });
        console.log.resetHistory()
    })
    describe('setSource', () => {
        it("should be a function", () => {
            expect(setSource).to.be.a("function")
        });
        it("should log error,with value less than 0", () => {
            let a=-1;let b=6;let c='E';let d=0;let e=''
            setSource(a, b, c)
            const { source, direction } = data()
            expect(setSource).to.have.been.calledWith(a, b, c)
            expect(source.length).to.equal(d)
            expect(console.log).to.have.been.calledWith('Invalid Source -1 6 E')
            expect(direction).to.equal(e)
        });
        it("should log error,with value greater than 6 ", () => {
            let a=1;let b=7;let c='E';let d=0;let e=''
            setSource(a, b, c)
            const { source, direction } = data()
            expect(console.log).to.have.been.calledWith('Invalid Source 1 7 E')
            expect(setSource).to.have.been.calledWith(a, b, c)
            expect(direction).to.equal(e)
            expect(source.length).to.equal(d)
        });
        it("should log error,with invalid direction ", () => {
            let a=1;let b=5;let c='U';let d=0;let e=''
            setSource(a, b, c)
            const { source, direction } = data()
            expect(setSource).to.have.been.calledWith(a,b,c)
            expect(console.log).to.have.been.calledWith('Invalid Source 1 5 U')
            expect(source.length).to.equal(d)
            expect(direction).to.equal(e)
        });
        it("should set source and direction ", () => {
            let a=2;let b=6;let c='E'
            setSource(a,b,c)
            const { source, direction } = data()
            expect(setSource).to.have.been.calledWith(a,b,c)
            expect(source[0]).to.equal(a)
            expect(source[1]).to.equal(b)
            expect(direction).to.equal(c)
        });
    })
    describe('setDestination', () => {
        it("should be a function", () => {
            expect(setDestination).to.be.a("function")
        });
        it("should log error, with value less than 0 ", () => {
            let a=-1;let b=6;let c=0
            setDestination(a,b)
            const { destination } = data()
            expect(setDestination).to.have.been.calledWith(a,b)
            expect(console.log).to.have.been.calledWith('Invalid Destination -1 6')
            expect(destination.length).to.equal(c)
        });
        it("should log error,with value greater than 6 ", () => {
            let a=1;let b=7;let c=0
            setDestination(a,b)
            const { destination } = data()
            expect(setDestination).to.have.been.calledWith(a,b)
            expect(destination.length).to.equal(c)
            expect(console.log).to.have.been.calledWith('Invalid Destination 1 7')
        });
        it("should set destination", () => {
            let a=2;let b=6;
            setDestination(a,b)
            const { destination } = data()
            expect(setDestination).to.have.been.calledWith(a,b)
            expect(destination[0]).to.equal(a)
            expect(destination[1]).to.equal(b)
        });
    })
    describe('calculatePower', () => {
        it("should be a function", () => {
            expect(calculatePower).to.be.a("function")
        });
        it("should initially set power to 200", () => {
            let result=200
            calculatePower()
            const { power } = data()
            expect(calculatePower).to.have.been.called
            expect(power).to.equal(result)
        });
        it("should not change power,with invalid inputs", () => {
            let a=2;let b=1;let c='R';let d=4;let e=3;let result=200
            setSource(a,b,c)
            setDestination(d,e)
            calculatePower()
            const {power} = data()
            expect(calculatePower).to.have.been.called
            expect(power).to.equal(result)
        });
        it("should set power to 155 ", () => {
            let a=2;let b=1;let c='E';let d=4;let e=3;let result=155
            setSource(a,b,c)
            setDestination(d,e)
            calculatePower()
            const { power } = data()
            expect(power).to.equal(result)
            expect(calculatePower).to.have.been.called
        });
        it("should set power to 150 ", () => {
            let a=2;let b=1;let c='S';let d=4;let e=3;let result=150
            setSource(a,b,c)
            setDestination(d,e)
            calculatePower()
            const { power } = data()
            expect(calculatePower).to.have.been.called
            expect(power).to.equal(result)
        });
        it("should set power to 170 ", () => {
            let a=2;let b=1;let c='S';let d=2;let e=3;let result=170
            setSource(a,b,c)
            setDestination(d,e)
            calculatePower()
            const { power } = data()
            expect(calculatePower).to.have.been.called
            expect(power).to.equal(result)
        });
        it("should set power to 175 ", () => {
            let a=2;let b=1;let c='W';let d=2;let e=3;let result=175
            setSource(a,b,c)
            setDestination(d,e)
            calculatePower()
            const { power } = data()
            expect(calculatePower).to.have.been.called
            expect(power).to.equal(result)
        });
        it("should set power to 110 ", () => {
            let a=3;let b=6;let c='N';let d=1;let e=0;let result=110
            setSource(a,b,c)
            setDestination(d,e)
            calculatePower()
            const { power } = data()
            expect(calculatePower).to.have.been.called
            expect(power).to.equal(result)
        });
    })
    describe('main', () => {
        it("should be a function", () => {
            expect(main).to.be.a("function")
        });
        it("should log error, if invalid command", () => {
            let input = ['SHORC 2 1 E', 'DESTINATION 4 3', 'PRINT_POWER']
            main(input)
            expect(main).to.have.been.calledWith(input)
            expect(console.log).to.have.been.calledWith('INVALID_COMMAND')
        });
        it("should execute with valid inputs", () => {
            let result=155
            let input = ['SOURCE 2 1 E', 'DESTINATION 4 3', 'PRINT_POWER']
            main(input)
            const { power } = data()
            expect(main).to.have.been.calledWith(input)
            expect(power).to.equal(result)    
        });
    })
})