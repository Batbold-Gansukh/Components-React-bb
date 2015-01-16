jest.dontMock('../Dropdown')

describe("dropdown",()=>{
    it("should show correct content",()=>{
        var React = require('react/addons')
        var Dropdown = require('../Dropdown')
        var TestUtils = React.addons.TestUtils
        var dummyCloseCallback = jest.genMockFunction()
        var dummyCommitCallback = jest.genMockFunction()

        var dummyContent = <div>
            <label>dummy label</label>
        </div>

        var dropdown = TestUtils.renderIntoDocument(
            <Dropdown left={100} top={200} closeCallback={dummyCloseCallback}
                commitCallback={dummyCommitCallback} content = {dummyContent}
            />
        )

        expect(dropdown.getDOMNode().className).toBe("panel")
        expect(dropdown.getDOMNode().style.position).toBe("absolute")
        expect(dropdown.getDOMNode().style.left).toBe("100px")
        expect(dropdown.getDOMNode().style.top).toBe("200px")
        expect(dropdown.getDOMNode().style.top).toBe("200px")

        var content = TestUtils.findRenderedDOMComponentWithClass(dropdown,"dropdownContent")
        var labelText = TestUtils.findRenderedDOMComponentWithTag(content,"label")
        expect(labelText.getDOMNode().innerHTML).toBe("dummy label")

        var cancel = TestUtils.findRenderedDOMComponentWithClass(dropdown,"inline-cancel")
        TestUtils.Simulate.click(cancel)
        expect(dummyCloseCallback).toBeCalled()

        var update = TestUtils.findRenderedDOMComponentWithClass(dropdown,"inline-update")
        TestUtils.Simulate.click(update)
        expect(dummyCommitCallback).toBeCalled()

    })
})