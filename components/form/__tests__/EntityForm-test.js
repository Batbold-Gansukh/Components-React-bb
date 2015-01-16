jest.dontMock("../EntityForm")
jest.dontMock("lodash")

describe("EntityForm", ()=> {
    var React = require("react/addons"),
        TestUtils = React.addons.TestUtils,
        EntityForm = require('../EntityForm'),
        _ = require('lodash')

    var modalAlertDummy,dateRender,utils,dateInput,dummyBackAction,tableDescription,columns,
        commitActionMock,backActionMock

    beforeEach(()=>{
        modalAlertDummy = jest.genMockFunction()
        dateRender = jest.genMockFunction()
        utils = {
            clearTimeZone: jest.genMockFunction()
        }
        dateInput = jest.genMockFunction()
        dummyBackAction = jest.genMockFunction()
        commitActionMock = jest.genMockFunction()
        backActionMock = jest.genMockFunction()
        tableDescription = "testingEntityTable"

        columns = {
            NAME: {name: "Нэр", columnName: "NAME"},
            DEVJEE: {name: "Дэвжээ", columnName: "DEVJEE"},
            TSOL: {name: "Цол", columnName: "TSOL"},
            IMG: {name: "Зураг", type: "img", columnName: "IMG"},
            BIRTHDATE: {name: "Төрсөн", columnName: "BIRTHDATE", type: "date"},
            WEIGHT: {name: "Жин", columnName: "WEIGHT", type: "int"},
            HEIGHT: {name: "Өндөр", columnName: "HEIGHT", type: "float"}
        }
    })

    it("when empty", ()=> {
        var entityForm = TestUtils.renderIntoDocument(<EntityForm
            columns={columns}
            timeout={3000}
            msg={"alertMsg"}
            status={null}
            loading={false}
            loadingSpin={"loadingSpin"}
            commitLabel= {"Add"}
            values={undefined}
            tableDescription={tableDescription}
            backAction={dummyBackAction}
            backLabel={"testBackLabel"}
        />)

        expect(TestUtils.findRenderedDOMComponentWithClass(entityForm, "entityDesc").getDOMNode().innerHTML)
            .toBe(tableDescription)
        var columnLabels = TestUtils.scryRenderedDOMComponentsWithTag(entityForm, "label")
        //Check column labels correctly displayed
        var i = 0
        _.forIn(columns, function (v, k) {
            expect(columnLabels[i].getDOMNode().innerHTML.indexOf(v.name)).toBeGreaterThan(-1)
            i += 1
        })
    })

    it("should correctly commit values",()=>{
        var entityForm = TestUtils.renderIntoDocument(<EntityForm
            columns={columns}
            timeout={3000}
            msg={"alertMsg"}
            status={null}
            loading={false}
            loadingSpin={"loadingSpin"}
            commitLabel= {"Add"}
            values={undefined}
            tableDescription={tableDescription}
            backAction={dummyBackAction}
            backLabel={"testBackLabel"}
            commitAction = {commitActionMock}
            backAction = {backActionMock}
        />)
        var NAME = "name",DEVJEE="devjee" ,TSOL ="TSOL",IMG="image",BIRTHDATE=new Date().getTime()
            WEIGHT = "3434",HEIGHT="343.34"
        entityForm._onValueChange('NAME',NAME)
        entityForm._onValueChange('DEVJEE',DEVJEE)
        entityForm._onValueChange('TSOL',TSOL)
        entityForm._onValueChange('IMG',IMG)
        entityForm._onValueChange('BIRTHDATE',BIRTHDATE)
        entityForm._onValueChange('WEIGHT',WEIGHT)
        entityForm._onValueChange('HEIGHT',HEIGHT)
        entityForm._createNew()
        expect(commitActionMock).toBeCalledWith({
            NAME:NAME,
            DEVJEE:DEVJEE,
            TSOL:TSOL,
            IMG:IMG,
            BIRTHDATE:parseInt(BIRTHDATE),
            WEIGHT:parseInt(WEIGHT),
            HEIGHT:parseFloat(HEIGHT)
        })
    })
})