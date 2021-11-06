const { LinkedList } = require("./LinkedList")

class Test {
    /**
     * An individual test
     * @param {TestInput[]} test An array of TestInputs to evaluate
     * @param {number} condition The resulting value required for a test to be evaluated as passing
     */
    constructor (test = [], condition = null) {
        this.test = test.map(e => new TestInput(e ?? 0))
        this.condition = condition
    }
}

class TestInput {
    /**
     * An input for a test
     * @param {number} value The value to test
     */
    constructor (value = null) {
        this.value =  value
    }
}

class Result {
    /**
     * The results of a test
     * @param {number} test The index of the test output
     * @param {boolean} result The success or failure of the test. True is a pass and False is a failure.
     */
    constructor(test = null, result = null) {
        this.test = test
        this.result = result
    }
}

class LinkedListTester { 
    /**
     * A tester class for the LinkedList
     * @param {LinkedList} list The LinkedList to test
     * @param {Test[]} testCases The tests
     * @param {number} outputs The output of each test
     * @param {Result[]} results The pass/fail result of each test
     */
    constructor (list = new LinkedList(), testCases = LinkedListTester.#DEFAULT_TEST_CASES,  outputs= [], results = []) {
        Object.freeze(LinkedListTester.#DEFAULT_TEST_CASES) // Ensure the default cases are immutable when this is instantiated
        this.list = list
        this.testCases = [...testCases]
        this.outputs = [...outputs]
        this.results = [...results]
    }

    // Private static immutable collection to populate default values in a test when none are provided
    static #DEFAULT_TEST_CASES = [
        new Test([4, 3, 2, 5, 1, 1, 1, 2, 2], 6),
        new Test([2, 4, 3, 6, 1], 9),
        new Test([1, 1, 4], 5),
        new Test([3, 5, 3, 4, 4, 2, 2], 8),
        new Test([5, 4, 1, 5, 3, 2, 4, 4, 1, 3, 1], 7),
    ]

    /**
     * Setup the tester, clear any stale results, apply the test function to the test cases, evaluates pass/fail status with optional logging.
     * @param {Function} testFunction The function to use to test
     * @param {boolean} outputToConsole Determines if the test pass/fail status should be logged to console. Defaults true if unspecified.
     */
    start(testFunction, outputToConsole = true) {
        this.outputs = []
        this.results = []
        this.list.clear()
        this.#run(testFunction)
        this.#evaluate(outputToConsole)
    }

    /**
     * Iterate through the test cases, adding their values to a LinkedList, and then calculate the function output
     * @param {Function} testFunction A function to test
     */
    #run(testFunction) {
        const outputs = []

        for ( let index = 0, length = this.testCases.length; index < length; index++) {
            for (let testIndex = (this.testCases[index].test.length - 1); testIndex >= 0; testIndex--) {
                const parsed = Number.parseInt(this.testCases[index].test[testIndex].value)
                if (Number.isNaN(parsed)) {
                    console.log(`${this.testCases[index].test[testIndex].value} is not a number`)
                } else {
                    this.list.insert(this.testCases[index].test[testIndex].value)
                }
                
            }
            outputs.push(testFunction(this.list.head))
            this.list.clear()
        }

        this.results = outputs
    }

    /**
     * Iterate through the tests' output and determines whether each test case matched the criteria to pass or fail with optional console logging.
     * @param {boolean} consoleLog Determines if the tests' pass/fail status should be logged to the console. Default true if none provided
     */
    #evaluate(consoleLog = true) {
        for (let key = 0, length = this.results.length; key < length; key++) {
            if (this.results[key] === this.testCases[key].condition) {
                this.results.push(new Result(key, true))
                if (consoleLog) console.log(`Test ${key+1} passed (Expected: ${this.testCases[key].condition} | Received: ${this.results[key]})`)
            } else {
                this.results.push(new Result(key, false))
                if (consoleLog) console.log(`Test ${key+1} failed (Expected: ${this.testCases[key].condition} | Received: ${this.results[key]})`)
            }
        }
    }

    clear() {
        this.list = new LinkedList()
        this.testCases = []
        this.outputs = []
        this.results = []
    }

    reset() {
        this.list = new LinkedList()
        this.testCases = [...LinkedListTester.#DEFAULT_TEST_CASES]
        this.outputs = []
        this.results = []
    }

    update(testCases = []) {
        this.testCases = [...testCases]
    }

    add(testCase = null, condition = null) {
        if(!testCase) {
            return
        }
        this.testCases.push(new Test([...testCase], condition))
    }


}

module.exports = {
    LinkedListTester,
    Test
}