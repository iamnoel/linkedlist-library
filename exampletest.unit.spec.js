const {LinkedList} = require('./LinkedList');

test('Adds a node to a LinkedList', () => {
  const list = new LinkedList();

  list.insert({
    id: 1,
    name: `Object ${1} (insert)`,
  });

  expect(list.get(0)).toBeDefined();
  expect(list.size()).toBe(1);
});

test('Removes a node from a LinkedList before setting one', () => {
  const list = new LinkedList();
  
  list.removeFirst()

  // Want to see the test fail in the GH action
  expect(list.get(0)).toBe(false);
  expect(list.size()).toBe(0);
});
