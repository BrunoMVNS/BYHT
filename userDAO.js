// import getDB  from '../db.js'



export const createUser = async (user) => {
  const db = await getDB();
  const result = await db.collection('Users').insertOne(user);
  return result.insertedId;
};

export const getUser = async (id) => {
  const db = await getDB();
  const user = await db.collection('Users').findOne({ _id: ObjectId(id) });
  return user;
};

export const updateUser = async (id, updates) => {
  const db = await getDB();
  const result = await db.collection('Users').updateOne({ _id: ObjectId(id) }, { $set: updates });
  return result.modifiedCount;
};

export const deleteUser = async (id) => {
  const db = await getDB();
  const result = await db.collection('Users').deleteOne({ _id: ObjectId(id) });
  return result.deletedCount;
};
