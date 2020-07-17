---
title: "GraphQL discovery and study notes"
---

## REST problems
- **Overfetching**:** bringing a lot of unecessary data
- **Underfetching:** needs more than one request (from differente endpoints) to get the data we want.
- **API versioning:** Users need to update them manually, or sel they will use an old version forever.
- **No typed contracts:** There is no way to know the types from a JSON property, considering that it's everything always a string.
- **No typed contracts 2:** There is no way to know if some property can be null and also the client can send and receive data from any type.
- **Visibility:** The user can see the entire response from an endpoint, even if it just needs one property. The only way to solve this is making different endpoints.

## Why GraphQL?
- **Only what you need:** Receive only what the user ask and need
- **Type safe:** GraphQL can be strongly typed using Relay and other technologies.
- **Type safe 2:** GraphQL will tell you if some data can be null.
- **Visibility:** You can choose what the user will see from the request (which fields will be available).
- **Documentation:** GraphQL will autodocument your API, there is no need to write the API and then the documentation too.
- **Multiple communication** GraphQL have a structured and standardized way of communicating with multiple clients/services.

## The bad

### **Too much work server-side**
The client may have it's data perfectly, which is just what it asked, but on the other side, the server needs to fetch it all from the database, which can be very expensive in some cases.

The resolver function don't have information about the data the client is asking, so the option is to fetch all of it.

**Solution**  
A resolver function has a 4th parameter, which is not even documented and it's rarely used, which is the `info`.

```js
resolvers = {
  getUsers: function (root, args, context, info) {
    // ...
  }
}
```
The info parameter contains some information about the request, there is a library called [graphql-fields](https://github.com/robrichard/graphql-fields) which solves the problem to find the requested fields from the `info` argument.

A query like this:
```js
{
  users {
    name
    age
  }
}
```
Would return `['name', 'age']`.

Using it like this:

```js
const graphqlFields = require(‘graphql-fields’);
function userResolver(root, args, context, info) {
  const fields = Object.keys(graphqlFields(info));
  console.log(fields) // [‘name’, ‘age']
}

```

**How to use it with MongoDB?**  
A Mongoose query looks something like this:  
`User.find({}).select('name age');`

So we can just use:
```js
function userResolver(root, args, context, info) {
  const fields = Object.keys(graphqlFields(info)).join(' ');
  User.find({}).select(fields);
}
```

Of course this is just a simple approach for simple queries.
Another way is building a helper function to use the `{name: 1, age: 1}` syntax.

```js
function getMongooseSelectionFromFields(info, fieldPath) {
  const selections = graphqlFields(info);
  const mongooseSelection = Object
  .keys(fieldPath ? selections[fieldPath] : selections)
  .reduce((a, b) => ({ …a, [b]: 1 }), {});

  return mongooseSelection;
}
```

Using the example above, `getMongooseSelectionFromFields(info)` would return `{name: 1, age: 1}`.

But in my opnion it's not worth it to do something like this, it will add extra complexity and probably still not enough to cover everything.

### **Complexity compared to a REST api**
Using GraphQL for simple applications is usually not ideal, since it requires a lot more boilerplate to get it working.

## The good

### **Typing**
A great feature in GraphQL is that it's strongly typed, you can describe the structure of the queries using Schemas, so when it's passed a value which it's not expecting, it will throw an error, and it's great for the development side, since it will work well with the typing system.

It allows a very good validation and less errors when using the API.

**Example**

Query: 
```js
{
  user(id: 2) {
    name
    age
  }
}
```

Schema:
```
type RootQuery {
  user(id: Int): User
}

type User {
  name: String!
  age: Int!
}
```

As you can see, it's possible to see the type each field is expecting to receive, making data handling safer.

### **Resolution to over-fetching and under-fetching**
Something that don't even need to be mentioned, since this was the main reason GraphQL was made, to fetch only the client needs. No over-fetching and no under-fetching.

In REST, it is often used like this to fix a problem like this.

``${userServiceURL}?pick=competitors,appId,title``

This would fetch only the wanted fields from an API, and then there had to be a logic of course to get the fields from that query string and fetch them from the database.

But why would we want this?

A lot of people (somewhat less today), have a slow internet or a bad cellphone, which would cause our application to be slow, specially if there is a lot of data like a dashboard, usually there is a lot of data fetching, from multiple routes.

But with GraphQL you can always get what you (client) need and what is needed to show. And of course in the development side is great too, you don't need to manipulate a lot of data from different sources to have the data you need.

## Migration from REST to GraphQL

To really use GraphQL, we need to think in the GraphQL way, but it's hard to do that after you already have a structure (REST) done.

What about using GraphQL as a proxy/gateway wrapping the REST api?
Yes it is possible, and it will work, but we would miss out in some great features, in exchange for an extra service written in a totally different query language, that would be somewhat hard to do maintenance on top of the REST api.

## Conclusion

I don't think migrating from REST to GraphQL is a very good option, it may difficult more.