// creating user routes and handling it here
const express = require("express");
const userRouter = express.Router();
const User = require("../model/User");
const zod = require("zod");
const bcrypt = require("bcrypt");
const bankDetails = require("../model/Bank");
const { default: mongoose } = require("mongoose");

const userSignUp = zod.object({
  userName: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});
const userLogin = zod.object({
  userName: zod.string().email(),

  password: zod.string(),
});

userRouter.post("/signup", async (req, res) => {
  const { userName, firstName, lastName, password } = req.body;
  const { success } = userSignUp.safeParse(req.body);
  if (!success) {
    res.json({ msg: "All credentials are not provided" });
    return;
  }
  //   what if user is already present in db
  //   we have to give user random balance on signup and uske according we can find and get the balance
  const findu = await User.findOne({ userName: userName });
  if (findu) {
    res.send("username already taken try login");
    return;
  }
  // connect to db and store it
  try {
    // const salt = bcrypt.genSalt(10);
    const hashP = await bcrypt.hash(password, 10);
    const neo = await new User({
      firstName,
      lastName,
      password: hashP,
      userName: userName,
    });
    await neo.save();
    const val = Math.floor(Math.random() * 1000);
    const bal = await new bankDetails({
      userId: neo.id,
      balance: val,
    });
    await bal.save();
    res.send({ msg: "success", user: neo, balance: val });
  } catch (e) {
    res.send(e);
  }
});
userRouter.post("/login", async (req, res) => {
  const { userName, password } = req.body;
  const { success } = userLogin.safeParse(req.body);
  if (!success) {
    res.json({ msg: "All credentials are not provided" });
    return;
  }
  //   what if user is already present in db
  const findu = await User.findOne({ userName: userName });

  if (!findu) {
    res.send("username not present kindly Signup");
    return;
  }

  // connect to db and store it
  try {
    // get password from the db
    const p = findu.password;
    const comp = await bcrypt.compare(password, p);

    if (comp) {
      const bd = await bankDetails.findOne({ userId: findu.id });

      res.send({
        success: true,
        userinfo: {
          id: findu._id,
          balance: bd.balance,
          firstName: findu.firstName,
          lastName: findu.lastName,
        },
      });
    } else
      res.send({
        success: false,
      });
  } catch (e) {
    res.send({
      success: false,
    });
  }
});
userRouter.put("/update", async (req, res) => {
  // first check whether current user is in database or not
  const { firstName, lastName, userName, password } = req.body;
  const u = await User.findOne({ userName: userName });

  if (!u) {
    res.send({ msg: "invalid credentials1" });
    return;
  }
  const check = await bcrypt.compare(password, u.password);

  if (!check) {
    res.send({ msg: "invalid credentials" });
    return;
  }
  const neo = req.body;
  neo.password = u.password;
  const temp = await User.updateOne(u, neo);
  res.send(neo);
});
async function getUserBalance(user) {
  // console.log(user);
  const bal = await bankDetails.findOne({
    userId: user,
  });
  return bal.balance;
}
// in this we will also send balance of user
userRouter.get("/all", async (req, res) => {
  // we just need the list of users
  const list = await User.find({});
  //   we need not to send the password
  let neo = [];
  for (let i = 0; i < list.length; i++) {
    const val = list[i]._id.toString();
    const temp = {
      userName: list[i].userName,
      firstName: list[i].firstName,
      id: val,
      lastName: list[i].lastName,
      balance: await getUserBalance(val),
    };

    neo.push(temp);
    // console.log(list[i].userName);
  }
  res.send(neo);
});

userRouter.post("/transfer", async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  const { amount, fromUser, toUser } = req.body;

  // Fetch the accounts within the transaction
  const sender = await User.findById(fromUser).session(session);
  const reciever = await User.findById(toUser).session(session);

  if (!sender || !reciever) {
    await session.abortTransaction();
    return res.status(400).json({
      success: false,
      message: "Invalid Account",
    });
  }

  const bal = await bankDetails.findOne({ userId: fromUser }).session(session);

  if (bal.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      success: false,
      message: "Insufficient balance",
    });
  }

  await bankDetails
    .updateOne({ userId: fromUser }, { $inc: { balance: -amount } })
    .session(session);
  await bankDetails
    .updateOne({ userId: toUser }, { $inc: { balance: amount } })
    .session(session);

  // Commit the transaction
  await session.commitTransaction();
  res.json({
    success: true,
    message: "Transfer successful",
  });
});
userRouter.post("/balance", async (req, res) => {
  const { user } = req.body;
  const uInfo = await User.findById(user);
  const balance = await bankDetails.findOne({
    userId: user,
  });
  // console.log(balance);
  res.send({
    firstName: uInfo.firstName,
    balance: balance.balance,
    lastName: uInfo.lastName,
    id: user,
  });
});
module.exports = {
  userRouter,
};
