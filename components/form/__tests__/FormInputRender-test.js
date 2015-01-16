jest.dontMock('../FormInputRender')

describe('FormInputRender', ()=> {

    var FormInputRender = require('../FormInputRender'), React = require('react/addons'),
        TestUtils = React.addons.TestUtils,
        onChangeEventMock, valueChangeMock, value, column, formDateInput,formNumberInput,formTextInput

    beforeEach(()=> {
        onChangeEventMock = jest.genMockFunction()
        valueChangeMock = jest.genMockFunction()
        column = {name: "colName", columnName:"columnName",type: ""}
        value = {}
        formDateInput = jest.genMockFunction().mockReturnValue(null)
        formNumberInput = jest.genMockFunction().mockReturnValue(null)
        formTextInput = jest.genMockFunction().mockReturnValue(null)
    })

    it('should correctly display when type is date', ()=> {
        column.type = "date"
        value = new Date().getTime()
        var fdi = TestUtils.renderIntoDocument(<FormInputRender
            onChangeEvent = {onChangeEventMock}
            valueChange = {valueChangeMock}
            column = {column}
            value = {value}
            formDateInput = {formDateInput}
        />)

        expect(formDateInput.mock.calls[0][0].value).toBe(value)
        expect(formDateInput.mock.calls[0][0].columnName).toBe(column.columnName)
        expect(formDateInput.mock.calls[0][0].changedCallback).toBe(valueChangeMock)
    })

    it('should correctly display when type is float or int', ()=> {
        column.type = "float"
        value = 34.334
        var fdi = TestUtils.renderIntoDocument(<FormInputRender
            onChangeEvent = {onChangeEventMock}
            valueChange = {valueChangeMock}
            column = {column}
            value = {value}
            formNumberInput = {formNumberInput}
        />)

        expect(formNumberInput.mock.calls[0][0].value).toBe(value)
        expect(formNumberInput.mock.calls[0][0].columnName).toBe(column.columnName)
        expect(formNumberInput.mock.calls[0][0].onChangeEvent).toBe(onChangeEventMock)
    })

    it('should correctly display when types is undefined (text) ',()=>{
        column.type = undefined
        value = "text"
        var fdi = TestUtils.renderIntoDocument(<FormInputRender
            onChangeEvent = {onChangeEventMock}
            valueChange = {valueChangeMock}
            column = {column}
            value = {value}
            formTextInput = {formTextInput}
        />)

        expect(formTextInput.mock.calls[0][0].value).toBe(value)
        expect(formTextInput.mock.calls[0][0].columnName).toBe(column.columnName)
        expect(formTextInput.mock.calls[0][0].onChange).toBe(onChangeEventMock)
    })

})