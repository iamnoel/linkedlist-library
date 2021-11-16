const { LinkedList } = require('./LinkedList');

const list = new LinkedList();

// Demonstrate creating Objects and adding them into the LinkedList
for (let i = 1; i < 5; i++) {
    const obj = {
        id: i,
        name: `Object ${i} (insert)`
    }
    list.insert(obj)
}
list.insertLast({ id: 5, name: 'Object 5 (insert last)' })

// Replacer function for JSON stringify to replace the circular references in the Nodes' references to the previous Node in the list with a string
const replaceCircularReferences = (key, value) => {
 if (key === 'previous') {
     return value?.data?.id !== undefined ? ('Node ' + value.data.id) : null;
 }
 return value;
}

// Call json stringify with the replacer function
// console.log(JSON.stringify( list, replaceCircularReferences, 3))

// Call json stringify with that same replacer code but as an anonymous function
console.log(JSON.stringify( list, (key, value) => key === 'previous' ? value?.data?.id ? `Node ${value.data.id}` : null : value, 3))

list.set(3, { id: 1, name: 'Object 1 (Updated)' })

// Demonstrate forEach with two arguments in the callback (all 3 are optional) using an anonymous function for the callback
list.forEach((e, k) => {console.log('Callback Function at index ', k, '| ', e)})

// Demonstrate 'for...of' Iterable of the base LinkedList class
for (const element of list) {
    console.log('test', element)
}

// Demonstrate key, value pair Iterable method in the LinkedList
for (const [keys, values] of list.entries()) {
    console.log('K: ', keys, '| V:', values)
}

// Demonstrate key Iterable method in the LinkedList for the Nodes' indices
for (const element of list.keys()) {
    console.log('Key: ', element)
}

// Demonstrate value Iterable method in the LinkedList for the Nodes' data
for (const element of list.values()) {
    console.log(element)
}

console.log('List before removing removing any values:', list)

// Demonstrate removing Nodes from the LinkedList
list.removeLast();
console.log(list)

console.log('Value of the Node at list index 2: ', list.get(2))

list.removeLast();
console.log(list)

list.removeLast();
console.log(list)

console.log('Value of the last Node in the list: ', list.getLast())

list.removeLast();
console.log(list)