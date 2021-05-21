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

export const readPosts = (dbtable, fn) => {
  let index = 0
  let obj = {}

  dbtable.count((count) => {
    if(count) {
      dbtable.each(table => {
        obj = SortObj(table)
        fn(obj, index++)
      })
    } else {
      fn(0)
    }
  })
  // const result = await db.posts.toArray();

  // return result
};

const SortObj = obj => {
  let sortobj = {}
  sortobj = {
    id: obj.id,
    title: obj.title,
    content: obj.content
  }
  return sortobj
}

export const updatePost = async (dbtable, data) => {
  let flag = empty(data)
  if(flag) {
    dbtable.update(data.id, {
      title: data.title,
      content: data.content
    })
  } else {
    console.log(`Hello... Please Enter DATA...=.="`)
  }
}

export const deletePost = () => {
  console.log('deletePost')
}