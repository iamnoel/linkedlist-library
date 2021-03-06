class Node {
    /**
     * A Node of data within a Doubly Linked List. Stores data as well as references to the previous and next Nodes in the sequence.
     * @param {number} data The data to be stored
     * @param {Node} next A reference to the next Node in a list
     * @param {Node} previous A reference to the previous Node in a list
     */
    constructor(data, next = null, previous = null) {
        this.data = data;
        this.next = next;
        this.previous = previous;
    }

    [Symbol.iterator]() {
        const values = Object.values(this)
        let index = 0;

        return {
            next() {
                if (index < values.length) {
                    const value = values[index];
                    index++;
                    return { value: value, done: false};
                } else {
                    return { done: true };
                }
            }
        }
    }
}

class LinkedList {
    /**
     * A Doubly Linked List containing Nodes of data. Stores a reference to the head Node, the tail Node, and tracks the length.
     * @param {Node} head The first Node in the LinkedList
     */
    constructor(head = null) {
        this.head = head;
        this.tail = head;
        if (this.head || this.tail) {
            this.length = 1
        } else {
            this.length = 0
        }
    }

    [Symbol.iterator]() {
        let node = this.head;
        let index = 0;

        return {
            next() {
                if (node !== null) {
                    const value = node.data;
                    index++;
                    node = node.next;
                    return { value: value, done: false};
                } else {
                    return { done: true };
                }
            }
        }
    }

    /**
     * Calculate the size of the LinkedList
     * @returns {number} The number of Nodes in the LinkedList
     */
    size() {
        // let count = 0;
        // let node = this.head;
        // while (node) {
        //     count++;
        //     node = node.next;
        // }
        // return count;
        return this.length;
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

        if (!Number(getIndex) && (Number(getIndex) !== 0)) {
            return undefined;
        }

        const size = this.size();

        if (getIndex >= size || getIndex < 0) {
            return false;
        }

        // Determine fastest direction to iterate
        if (getIndex < (Math.round(size / 2))) {
            // Iterate forward from the head
            let node = this.head;
            let index = 0;

            while (node) {
                if (index === getIndex) {
                    return node.data;
                }

                if (index < getIndex) {
                    if (!node.next) {
                        console.log('cant go next')
                        return false;
                    }

                    node = node.next;
                    index++;
                }
            }

        } else {
            // Iterate backward from the tail
            let node = this.tail;
            let index = (size - 1);

            while (node) {
                if (index === getIndex) {
                    return node.data;
                }

                if (index > getIndex) {
                    if (!node.previous) {
                        console.log('cant go previous')
                        return false;
                    }

                    node = node.previous;
                    index--;
                }
            }
        }
    }

    /**
     * Sets the data of a Node at a given index
     * @param {number} setIndex The index of the Node within the list
     * @param {*} data The data to be stored 
     * @returns the new data if successful, false if there are fewer Nodes than the requested index, null if there are no Nodes in the list, undefined if the specified index is not a number
     */
    set(setIndex, data) {
        if (!this.head) {
            return null;
        }

        if (!Number(setIndex) && (Number(setIndex) !== 0)) {
            return undefined;
        }

        if (setIndex >= this.length || setIndex < 0) {
            return false;
        }

        // Determine fastest direction to iterate
        if (setIndex < (Math.round(this.length / 2))) {
            // Iterate forward from the head
            let node = this.head;
            let index = 0;

            while (node) {
                if (index === setIndex) {
                    node.data = data;
                    return node.data;
                }

                if (index < setIndex) {
                    if (!node.next) {
                        return false;
                    }

                    node = node.next;
                    index++;
                }
            }

        } else {
            // Iterate backward from the tail
            let node = this.tail;
            let index = (this.length - 1);

            while (node) {
                if (index === setIndex) {
                    node.data = data;
                    return node.data;
                }

                if (index > setIndex) {
                    if (!node.previous) {
                        return false;
                    }

                    node = node.previous;
                    index--;
                }
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

        if (this.head === null) {
            this.head = node;
            this.tail = node;
            this.length++;
            return;
        }

        this.head.previous = node
        this.head = node;
        this.length++;
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
            this.length++;
            return;
        }

        this.tail.next = node;
        this.tail = node;
        this.length++;
    }

    /**
     * Removes the Node at the head of the LinkedList and shifts the remaining Nodes up
     */
    removeFirst() {
        if (!this.head) {
            return;
        }

        this.head = this.head.next;
        this.length--;
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
            this.length--;
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
        this.length--;
    }


    /**
     * Performs the specified action for each Node in a LinkedList
     * @param {(value, index: number, list: LinkedList) => void} callbackfn A function that accepts up to three arguments. forEach calls the callbackfn function one time for each Node in the LinkedList.
     */
    forEach(callbackfn) {
        if(!callbackfn) {
            console.log('undefined callback function', (new Error()).stack.split("\n")[2]);
            return undefined;
        }
        
        for (const [key, value] of this.entries()) {
            callbackfn(value, key, this);
        }
    }

    /**
     * Creates an iterable of [index, value] pairs for every Node and its data in the LinkedList.
     * @returns {Iterable<[K, V]>} An iterable of the key, value pairs
     */
    entries() {
        const list = this;
        let node = list.head;
        let index = 0;

        return {
            [Symbol.iterator]() {
                return this;
            },
            next() {
                if (node !== null) {
                    const value = { value: [index, node.data] }
                    index++;
                    node = node.next;
                    return value;
                } else {
                    return { done: true }
                }
            }
        }
    }

    /**
     * Creates an Iterable of the index from each Node in the LinkedList
     * @returns {Iterable} An Iterable of the keys in data
     */
    keys() {
        const list = this;
        let node = list.head;
        let index = 0;

        return {
            [Symbol.iterator]() {
                return this;
            },
            next() {
                if (node !== null) {
                    const value = { value: index }
                    index++;
                    node = node.next;
                    return value;
                } else {
                    return { done: true }
                }
            }
        }
    }

    /**
     * Creates an Iterable of the data from each Node in the LinkedList
     * @returns {Iterable} An Iterable of the values in data
     */
    values() {
        const list = this;
        let node = list.head;

        return {
            [Symbol.iterator]() {
                return this;
            },
            next() {
                if (node !== null) {
                    const value = { value: node.data }
                    node = node.next
                    return value
                } else {
                    return { done: true };
                }
            }
        };
    }
}

module.exports = {
    Node,
    LinkedList
}