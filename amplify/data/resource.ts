import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
      listId: a.id(),
      list: a.belongsTo('List', 'listId'),
    }),
  List: a
    .model({
      title: a.string(),
      todos: a.hasMany('Todo', 'listId'),
    }),

  Post: a.model({
    title: a.string().required(),
    content: a.string().required(),
    // You must supply an author when creating the post
    // Author can't be set to `null`.
    authorId: a.id().required(),
    author: a.belongsTo('Person', 'authorId'),
    // You can optionally supply an editor when creating the post.
    // Editor can also be set to `null`.
    editorId: a.id(),
    editor: a.belongsTo('Person', 'editorId'),
  }),
  Person: a.model({
    name: a.string(),
    editedPosts: a.hasMany('Post', 'editorId'),
    authoredPosts: a.hasMany('Post', 'authorId'),
  }),

  Member: a.model({
    name: a.string().required(),
    // 1. Create a reference field
    teamId: a.id(),
    // 2. Create a belongsTo relationship with the reference field
    team: a.belongsTo('Team', 'teamId'),
  }),

  Team: a.model({
    mantra: a.string().required(),
    // 3. Create a hasMany relationship with the reference field
    //    from the `Member`s model.
    members: a.hasMany('Member', 'teamId'),
  }),

  // custom key example
  User: a
    .model({
      id: a.id().required(),
      birthdate: a.string().required(),
      firstName: a.string().required(),
      lastName: a.string().required(),
      username: a.string().required(),
      phoneNumber: a.hasOne("PhoneNumber", "userId"),
    })
    .secondaryIndexes((index) => [
      index("firstName").queryField("listUsersBySearchTerm").sortKeys(["id"]),
    ]),

  PhoneNumber: a
    .model({
      phoneNumber: a.string().required(),
      userId: a.string().required(),
      user: a.belongsTo("User", "userId"),
    })
    .identifier(["phoneNumber"]),

  CustomKeyTest: a
    .model({
      myKey: a.string().required(),
      description: a.string().required(),
    })
    .identifier(['myKey']),

  ExplicitPkSk: a.model({
      id: a.id().required(),
      sk: a.string().required()
    }).identifier(['id', 'sk']),
  
  ExplicitPkSkSk: a.model({
      id: a.id().required(),
      sk: a.string().required(),
      sk2: a.string().required(),
    }).identifier(['id', 'sk', 'sk2']),

}).authorization(allow => [allow.publicApiKey()]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
