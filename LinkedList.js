class Node {
    /**
     * @param {number} data 
     * @param {Node} next 
     */
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

class LinkedList {
    /**
     * @param {Node} head 
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
     * Inserts a new Node at the head of the LinkedList
     * @param {number} data A number to be stored in the data of the Node
     */
    insert(data) {
        const node = new Node(data, this.head);

        if(this.head === null) {
            this.tail = node
        }

        this.head = node;
    }

    /**
     * Inserts a new Node at the tail of the LinkedList
     * @param {number} data A number to be stored in the data of the Node
     */
    insertLast(data) {
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
        this.tail = tail.next
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