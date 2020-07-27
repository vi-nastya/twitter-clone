// @ts-ignore
export const getTweets = (store) =>
  store && store.todos ? store.tweets.allTweets : []

// export const getTodoById = (store, id) =>
//   store && store.todos && store.todos.byIds
//     ? { ...store.todos.byIds[id], id }
//     : {}

// /**
//  * example of a slightly more complex selector
//  * select from store combining information from multiple reducers
//  */
// export const getTodos = (store) =>
//   getTodoList(store).map((id) => getTodoById(store, id))
