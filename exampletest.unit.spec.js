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
