module.exports = function todosGateway(collection) {
  return {
    async display() {
      const foundDisplay = await collection.find().toArray()
      return foundDisplay
    },
    async createTodo(task) {
      return collection
        .insertOne(task)
        .then(() => task)
    }
  }
}
