import Dexie from 'dexie';

//
// Declare Database
//
const db = new Dexie("FriendDatabase");
db.version(1).stores({ friends: "++id,name,age" });

db.transaction('rw', db.friends, async() => {

    // Make sure we have something in DB:
    if ((await db.friends.where({name: 'Josephine'}).count()) === 0) {
        const id = await db.friends.add({name: "Josephine", age: 21});
        alert (`Addded friend with id ${id}`);
    }

    // Query:
    const youngFriends = await db.friends.where("age").below(25).toArray();

    // Show result:
    alert ("My young friends: " + JSON.stringify(youngFriends));

}).catch(e => {
    alert(e.stack || e);
});

export const createPost = async (inData = {}) => {
  const id = await db.friends.add(inData);

  return id;
};

export const getPost = async (inId = '') => {
};

export const listPosts = async () => {
  const result = await db.friends.toArray();

  return result
};