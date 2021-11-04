class Node {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
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
    }

    /**
     * Gets the data from a Node at a given index
     * @param {number} getIndex The index of the Node 
     * @returns The data stored in the Node at the given index.
     * Returns false if there are fewer Nodes than the requested index.
     */
    getAt(getIndex) {
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
        if (!this.head) {
            return null;
        }

        let node = this.head;

        while (node) {
            if (!node.next) {
                return node;
            }

            node = node.next;
        }
    }

    /**
     * Inserts a new Node at the tail of the LinkedList
     * @param {number} data A number to be stored in the data of the Node
     */
    insert(data) {
        if (!this.head) {
            this.head = new Node(data);
            return;
        }

        let node = this.head;
        let tail = this.head;

        while (node) {
            tail = node;
            node = node.next;
        }

        tail.next = new Node(data);
    }

    /**
     * Inserts a new Node at the head of the LinkedList
     * @param {number} data A number to be stored in the data of the Node
     */
    insertFirst(data) {
        const node = new Node(data, this.head);
        this.head = node;
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
        }

            let node = this.head;
            let previousNode = this.head;

            while (node) {
                previousNode = node;
                node = node.next;
            }

            previousNode.next = null;
    }
}

module.exports = {
    Node,
    LinkedList
}