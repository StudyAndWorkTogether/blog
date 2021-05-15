import Dexie from 'dexie';

//
// Declare Database
//
const db = new Dexie("blogdb");
db.version(1).stores({ posts: "++id,title,content" });
db.open()
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

export default db

export const createPost = (dbtable, data) => {
  let flag = empty(data)
  if(flag){
    dbtable.bulkAdd([data])
    console.log("Data created successfully...!")
  } else {
    console.log(`Hello... Please Enter DATA...=.="`)
  }

  return flag
  // async (inData = {title: 'first post', content: 'keep rolling!'}) => {
  // console.log(inData)
  // const id = await db.posts.add(inData);

  // return id;
};

const empty = obj => {
  let flag = false;
  for (const key in obj) {
    if (obj[key] !== "" && obj.hasOwnProperty(key)) {
      flag = true
    } else {
      return flag = false
    }
  }
  return flag
}

// export const getPost = async (inId = '') => {
// };

export const readPosts = () => {
  console.log('readPosts')
  // const result = await db.posts.toArray();

  // return result
};

export const updatePost = () => {
  console.log('updatePost')
}

export const deletePost = () => {
  console.log('deletePost')
}