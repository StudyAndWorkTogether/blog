import Dexie from 'dexie';

//
// Declare Database
//
const db = new Dexie("PostDatabase");
db.version(1).stores({ posts: "++id,title,content" });

// db.transaction('rw', db.posts, async() => {

//     // Make sure we have something in DB:
//     if ((await db.posts.where({name: 'Josephine'}).count()) === 0) {
//         const id = await db.posts.add({name: "Josephine", age: 21});
//         alert (`Addded friend with id ${id}`);
//     }

//     // Query:
//     const youngPosts = await db.posts.where("age").below(25).toArray();

//     // Show result:
//     alert ("My posts: " + JSON.stringify(youngPosts));

// }).catch(e => {
//     alert(e.stack || e);
// });

export const createPost = async (inData = {title: 'first post', content: 'keep rolling!'}) => {
  console.log(inData)
  const id = await db.posts.add(inData);
  console.log(id)
  return id;
};

// export const getPost = async (inId = '') => {
// };

export const listPosts = async () => {
  const result = await db.posts.toArray();

  return result
};