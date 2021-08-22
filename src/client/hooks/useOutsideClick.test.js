const useOutsideClick = require("./useOutsideClick")
// @ponicode
describe("useOutsideClick.default", () => {
    test("0", () => {
        let callFunction = () => {
            useOutsideClick.default({ current: "2017-09-29T23:01:00.000Z" }, "callback detected, not supported yet")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            useOutsideClick.default({ current: "2017-09-29T19:01:00.000" }, "callback detected, not supported yet")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            useOutsideClick.default({ current: "Mon Aug 03 12:45:00" }, "callback detected, not supported yet")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            useOutsideClick.default({ current: "01:04:03" }, "callback detected, not supported yet")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            useOutsideClick.default(undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
