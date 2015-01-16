jest.dontMock('../FormTextInput')

describe('FormTextInput', ()=> {

    var FormTextInput = require('../FormTextInput'), React = require('react/addons'),
        TestUtils = React.addons.TestUtils,
        onChange, columnName, value, min, max, minLabel, maxLabel,optionalLabel

    beforeEach(()=> {
        columnName = "columnName"
        onChange = jest.genMockFunction()
        min = 0
        max = 0
        value = ""
        minLabel = "minLabel"
        maxLabel = "maxLabel"
        optionalLabel = "optionalLabel"
    })

    it('should display correctly by default', ()=> {
        var fti = TestUtils.renderIntoDocument(<FormTextInput
            columnName={columnName}
            onChange= {onChange}
            value={value}
            min={min}
            max={max}
            minLabel={minLabel}
            maxLabel={maxLabel}
        />)
        var inp = TestUtils.findRenderedDOMComponentWithTag(fti, "input")
        expect(inp.getDOMNode().id).toBe(columnName)
        var small = TestUtils.scryRenderedDOMComponentsWithTag(fti, "small")
        expect(small.length).toBe(0)
    })

    it('should display min error label', ()=> {
        min = 2
        value ="1"
        var fti = TestUtils.renderIntoDocument(<FormTextInput
            columnName={columnName}
            onChange= {onChange}
            value={value}
            optionalLabel={optionalLabel}
            min={min}
            max={max}
            minLabel={minLabel}
            maxLabel={maxLabel}
        />)
        expect(TestUtils.findRenderedDOMComponentWithTag(fti,"small").getDOMNode().innerHTML).toBe(minLabel)
        var inp = TestUtils.findRenderedDOMComponentWithTag(fti, "input")
        expect(inp.getDOMNode().attributes.placeholder._nodeValue).toBe(optionalLabel)

    })

    it('should display max error label', ()=> {
        min = 0
        max = 5
        value ="123456"
        var fti = TestUtils.renderIntoDocument(<FormTextInput
            columnName={columnName}
            onChange= {onChange}
            value={value}
            min={min}
            max={max}
            minLabel={minLabel}
            maxLabel={maxLabel}
        />)
        expect(TestUtils.findRenderedDOMComponentWithTag(fti,"small").getDOMNode().innerHTML).toBe(maxLabel)

    })
})