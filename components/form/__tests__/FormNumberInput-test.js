jest.dontMock('../FormNumberInput')

describe('FormNumberInput', ()=> {

    var FormNumberInput = require('../FormNumberInput'), React = require('react/addons'),
        TestUtils = React.addons.TestUtils,
        onChangeEventMock,columnName, optionalLabel, min, minLabel,max,maxLabel

    beforeEach(()=> {
        columnName = "columnName"
        onChangeEventMock = jest.genMockFunction()
        optionalLabel = "optionalLabel"
    })

    it('should display correctly by default',()=>{
        var value = ""
        var fni = TestUtils.renderIntoDocument(<FormNumberInput
            columnName = {columnName}
            onChangeEvent = {onChangeEventMock}
            value = {value}
            isOptional={false}
            optionalLabel = {optionalLabel}
        />)

        var input = TestUtils.findRenderedDOMComponentWithTag(fni,"input")
        expect(input.props.placeholder).toBe(optionalLabel)
        TestUtils.Simulate.change(input,100)
        expect(onChangeEventMock).toBeCalled()
    })

    it('should display error when float value is set and no type is specified',()=>{
        var value = '10.23'
        var errorLabel = "error"
        var fni = TestUtils.renderIntoDocument(<FormNumberInput
            columnName = {columnName}
            onChangeEvent = {onChangeEventMock}
            value = {value}
            optionalLabel = {optionalLabel}
            errorLabel = {errorLabel}
        />)

        var input = TestUtils.findRenderedDOMComponentWithTag(fni,"input")
        expect(input.getDOMNode().value).toBe(value.toString())

        var small = TestUtils.findRenderedDOMComponentWithTag(fni,"small")
        //type=float is not present so it should display error
        expect(small.getDOMNode().innerHTML).toBe(errorLabel)
    })

    it('should display correctly when float value is set and type is specified as float',()=>{
        var value = '103343.234323'
        var errorLabel = "error"
        var fni = TestUtils.renderIntoDocument(<FormNumberInput
            columnName = {columnName}
            onChangeEvent = {onChangeEventMock}
            value = {value}
            optionalLabel = {optionalLabel}
            errorLabel = {errorLabel}
            type="float"
        />)

        var input = TestUtils.findRenderedDOMComponentWithTag(fni,"input")
        expect(input.getDOMNode().value).toBe(value.toString())

        var small = TestUtils.scryRenderedDOMComponentsWithTag(fni,"small")
        expect(small).toEqual([])
    })

    it('should display error msg when invalid input',()=>{
        var value = "aoirsetn"
        var errorLabel = "errorLabel"
        var fni = TestUtils.renderIntoDocument(<FormNumberInput
            columnName = {columnName}
            onChangeEvent = {onChangeEventMock}
            value = {value}
            errorLabel = {errorLabel}
        />)

        var small = TestUtils.findRenderedDOMComponentWithTag(fni,"small")
        expect(small.getDOMNode().innerHTML).toBe(errorLabel)
    })

    it('should display error msg when input value is float and type is int',()=>{
        var value = '23434.3434'
        var errorLabel = "errorLabel"
        var fni = TestUtils.renderIntoDocument(<FormNumberInput
            columnName = {columnName}
            onChangeEvent = {onChangeEventMock}
            value = {value}
            type = "int"
            errorLabel = {errorLabel}
        />)

        var small = TestUtils.findRenderedDOMComponentWithTag(fni,"small")
        expect(small.getDOMNode().innerHTML).toBe(errorLabel)
    })

    it('should not display error msg when input value is parse able string and type is correct',()=>{
        var value = '23434'
        var errorLabel = "errorLabel"
        var fni = TestUtils.renderIntoDocument(<FormNumberInput
            columnName = {columnName}
            onChangeEvent = {onChangeEventMock}
            value = {value}
            type = "int"
            errorLabel = {errorLabel}
        />)

        var small = TestUtils.scryRenderedDOMComponentsWithClass(fni,"error")
        expect(small.length).toBe(0)
    })

    it('should display min error label',()=>{
        var value = '23'
        var min = 234,minLabel = "minLabel"
        var fni = TestUtils.renderIntoDocument(<FormNumberInput
            columnName = {columnName}
            onChangeEvent = {onChangeEventMock}
            value = {value}
            type = "int"
            min = {min}
            minLabel = {minLabel}
        />)

        var small = TestUtils.findRenderedDOMComponentWithTag(fni,"small")
        expect(small.getDOMNode().innerHTML).toBe(min+minLabel)
    })

    it('should display max error label',()=>{
        var value = '2334'
        var max = 234,maxLabel = "minLabel"
        var fni = TestUtils.renderIntoDocument(<FormNumberInput
            columnName = {columnName}
            onChangeEvent = {onChangeEventMock}
            value = {value}
            type = "int"
            max = {max}
            maxLabel = {maxLabel}
        />)

        var small = TestUtils.findRenderedDOMComponentWithTag(fni,"small")
        expect(small.getDOMNode().innerHTML).toBe(max+maxLabel)
    })

})