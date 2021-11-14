class Node {
    /**
     * @param {number} data The data to be stored
     * @param {Node} next A reference to the next Node in a list
     * @param {Node} previous A reference to the previous Node in a list
     */
    constructor(data, next = null, previous = null) {
        this.data = data;
        this.next = next;
        this.previous = previous;
    }
}

class LinkedList {
    /**
     * @param {Node} head The first Node in the LinkedList
     * @param {Node} tail The last Node in the LinkedList
     */
    constructor(head = null, tail = null) {
        this.head = head;
        this.tail = tail;
    }

    /**
     * Calculate the size of the LinkedList
     * @returns {number} The number of Nodes in the LinkedList
     */
    size() {
        let count = 0;
        let node = this.head;
        while (node) {
            count++;
            node = node.next;
        }
        return count;
    }

    /**
     * Removes all Nodes from the LinkedList by removing the head Node
     */
    clear() {
        this.head = null;
        this.tail = null;
    }

    /**
     * Gets the data from a Node at a given index
     * @param {number} getIndex The index of the Node 
     * @returns The data stored in the Node at the given index.
     * Returns false if there are fewer Nodes than the requested index.
     */
    get(getIndex) {
        if (!this.head) {
            return null;
        }

        if (!Number(getIndex)) {
            return undefined;
        }

        let node = this.head;
        let index = 0;

        while (node) {
            if (index === getIndex) {
                return node.data;
            }

            if (index < getIndex) {
                if (!node.next) {
                    return false;
                }

                node = node.next;
                index++;
            }
        }
    }

    /**
     * Gets the data from a Node at the head of the LinkedList
     * @returns The data stored in the first Node
     */
    getFirst() {
        if (!this.head) {
            return null;
        }
        return this.head.data;
    }

    /**
     * Gets the data from the last Node at the tail of the LinkedList
     * @returns The data stored in the last Node
     */
    getLast() {
        if (!this.head || !this.tail) {
            return null;
        }

        return this.tail.data;
    }

    /**
     * Inserts a new Node at the head of the LinkedList
     * @param {number} data A number to be stored in the data of the Node
     */
    insert(data) {
        const node = new Node(data, this.head, null);

        if(this.head === null) {
            this.head = node;
            this.tail = node;
            return;
        }

        this.head.previous = node
        this.head = node;
    }

    /**
     * Inserts a new Node at the tail of the LinkedList
     * @param {number} data A number to be stored in the data of the Node
     */
    insertLast(data) {
        const node = new Node(data, null, this.tail);

        if (!this.head) {
            this.head = node;
            this.tail = this.head;
            return;
        }

        this.tail.next = node;
        this.tail = node;
    }

    /**
     * Removes the Node at the head of the LinkedList and shifts the remaining Nodes up
     */
    removeFirst() {
        if (!this.head) {
            return;
        }

        this.head = this.head.next;
    }

    /**
     * Removes the Node at the tail of the LinkedList
     */
    removeLast() {
        if (!this.head) {
            return;
        }

        if (!this.head.next) {
            this.head = null;
            this.tail = null;
            return;
        }

            let node = this.head;
            let previousNode = this.head;

            while (node) {
                // Stop updating the previous reference at the final node
                if (node.next) {
                    previousNode = node;
                }
                node = node.next;
            }

            previousNode.next = null;
            this.tail = previousNode;
    }
}

module.exports = {
    Node,
    LinkedList
}