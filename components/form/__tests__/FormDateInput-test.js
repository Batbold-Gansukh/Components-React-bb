jest.dontMock('../FormDateInput')

describe('FormDateInput', ()=> {

    var FormDateInput = require('../FormDateInput'), React = require('react/addons'),
        TestUtils = React.addons.TestUtils, changedCallbackMock, dateInputMock, dateFormatterMock,
        modelAlertMock, utilsMock, chooseLabel, colName, valueMock

    beforeEach(()=> {
        changedCallbackMock = jest.genMockFunction()
        dateInputMock = jest.genMockFunction()
        dateFormatterMock = jest.genMockFunction()
        modelAlertMock = jest.genMockFunction()
        utilsMock = {
            "whatever": jest.genMockFunction()
        }
        chooseLabel = "choosingLabel"
        colName = "columnNameTest"
        valueMock = new Date().getTime()
    })

    it('should correctly display', ()=> {

        var formDateInput = TestUtils.renderIntoDocument(<FormDateInput
            changedCallback={changedCallbackMock}
            chooseLabel={chooseLabel}
            value= {valueMock}
            columnName={colName}
            dateInput={dateInputMock}
            dateFormatter={dateFormatterMock}
            utils={utilsMock}
            modalAlert={modelAlertMock}
        />)

        expect(TestUtils.findRenderedDOMComponentWithClass(formDateInput, colName + "-column")).toBeDefined()
        expect(formDateInput.getDOMNode().innerHTML.indexOf(chooseLabel)).toBeGreaterThan(-1)

        expect(formDateInput.state.chooseDateModal).toBeNull()
        var chooseButton = TestUtils.findRenderedDOMComponentWithClass(formDateInput,"button")
        TestUtils.Simulate.click(chooseButton)
        expect(formDateInput.state.chooseDateModal).toNotBe(null)

        expect(dateInputMock).toBeCalled()
        expect(dateInputMock.mock.calls[0][0].value).toBe(valueMock)
        expect(dateInputMock.mock.calls[0][0].utils).toBe(utilsMock)

        expect(modelAlertMock).toBeCalled()

    })
})