//Controller
import Users from "../model/user";

//https://friendly-twilight-8c9958.netlify.app/api/users

//read/get
export async function getUsers(req, res) {
  try {
    const users = await Users.find({});
    if (!users) return res.status(404).json({ error: "Data Not Found" });
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ error: "Error while fetching Data" });
  }
}

//read/get single user
//https://friendly-twilight-8c9958.netlify.app/api/users/userId
export async function getUser(req, res) {
  try {
    const { userId } = req.query;
    if (userId) {
      const user = await Users.findById(userId);
      res.status(200).json(user);
    }
    res.status(404).json({ error: "User Not Found" });
  } catch (error) {
    res.status(404).json({ error: "Cannot get the user" });
  }
}

//create
export async function postUsers(req, res) {
  try {
    const formData = req.body;
    if (!formData)
      return res.status(404).json({ error: "Form Data Not Provided" });
    Users.create(formData, function (err, data) {
      res.status(200).json(data);
    });
  } catch (error) {
    res.status(404).json({ error: "Error while posting Data" });
  }
}

//update
export async function putUsers(req, res) {
  try {
    const { userId } = req.query;
    const formData = req.body;
    if (userId && formData) {
      const user = await Users.findByIdAndUpdate(userId, formData);
      res.status(200).json(user);
    }
    res.status(404).json({ error: "Form Data Not Updated" });
  } catch (error) {
    res.status(404).json({ error: "Error while updating the Data" });
  }
}
//update single user
export async function putUser(req, res) {
  try {
    const { userId } = req.query;
    const formData = req.body;
    if (userId && formData) {
      const user = await Users.findByIdAndUpdate(userId, formData);
      res.status(200).json(user);
    }
    res.status(404).json({ error: "Form Data Not Updated" });
  } catch (error) {
    res.status(404).json({ error: "Error while updating the Data" });
  }
}

//delete
export async function deleteUsers(req, res) {
  try {
    const { userId } = req.query;
    if (userId) {
      const user = await Users.findByIdAndDelete(userId);
      res.status(200).json({ deleted: userId });
    }
    return res.status(404).json({ error: "User Not Deleted " });
  } catch (error) {
    res.status(404).json({ error: "Error while deleting Data" });
  }
}

//delete single user
export async function deleteUser(req, res) {
  try {
    const { userId } = req.query;
    if (userId) {
      const user = await Users.findByIdAndDelete(userId);
      res.status(200).json({ deleted: userId });
    }
    return res.status(404).json({ error: "User Not Deleted " });
  } catch (error) {
    res.status(404).json({ error: "Error while deleting Data" });
  }
}
