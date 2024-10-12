const express = require("express");
const app = express();
const path = require("node:path");
const router = express.Router();

app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

const messages = [
  {
    text: "Hello World",
    user: "Dennis Ritchie",
    date: new Date(),
  },
  {
    text: "The One Piece, The One Piece is real!!!",
    user: "Papa Beard",
    date: new Date(),
  },
];

app.get("/", (req, res) => {
  res.render("index", { messages: messages });
});

router.get("/", (req, res) => {
  res.render("None");
});

router.post("/new", (req, res) => {
  const userName = req.body.name;
  const userMessage = req.body.message;

  if (userName == "" || userMessage == "") {
    console.log("Empty name and message");
  }

  messages.push({
    text: userMessage,
    user: userName,
    date: new Date(),
  });

  res.redirect("/");
});

app.use("/", router);
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Port ${PORT} is listening...`);
});
