const { Node, LinkedList } = require('./LinkedList')

/**
 * Calculates the highest possible value of pairs of numbers in a LinkedList
 * @param {Node} node A reference to the head of a LinkedList
 * @returns {number} The maximum possible value of the combined Nodes' data
 */
const getMaximumPair = (node) => {
    const numberOfPairs = node.data;
    console.log('Number of pairs: ', numberOfPairs)

    const pageCounts = []
    let index = 0;

    let firstPageCount = 0;
    let lastPageCount = 0;

    let firstNode = node.next;
    let currentNode = firstNode;
    let previousNode = firstNode;
    
    while (currentNode) {
        firstNode = index === 0 ? new Node(currentNode.data, currentNode.next) : firstNode;
        firstPageCount = index === 0 ? currentNode.data : firstPageCount;
        lastPageCount = currentNode?.next === null ? currentNode.data : lastPageCount;

        if (currentNode.next) {
            previousNode = currentNode;
            currentNode = currentNode.next;
            index++;
        } else {
            console.log(`First node: ${firstPageCount}, Last node: ${lastPageCount} (Total nodes: ${index+1})| Pair Sum: ${firstPageCount+lastPageCount}`)
            pageCounts.push(firstPageCount+lastPageCount);
            node = firstNode.next;
            previousNode.next = null;
            currentNode = node;
            index = 0;
            firstPageCount = 0;
            lastPageCount = 0;
        }

        if (!currentNode.next && numberOfPairs === pageCounts.length) {
            currentNode = null;
        }
    }

    console.log(pageCounts)

    return Math.max(...pageCounts)
}

/**
 * Given a LinkedList of Nodes where each contains an integer and the head specifies a number of pairs in the list.
 * There is an even number of pairs after the head Node. Each pair is the result of the combined value of the first and last Nodes.
 * Using a reference to the head of a LinkedList, determine the highest possible value of each pair,
 * removing the first and last Nodes from the set upon calculating that pair's combined value.
 */
const main = () => {
    const list = new LinkedList();
    const EXPECTED_OUTPUT = 6;

    list.insert(3);
    list.insert(3);
    list.insert(2);
    list.insert(5);
    list.insert(1);
    list.insert(2);
    list.insert(2);

    const output = getMaximumPair(list.head)
    
    if (output === EXPECTED_OUTPUT) {
        console.log(`Success: ${output}`)
    } else {
        console.log(`Fail: ${output}`)
    }
}

main();