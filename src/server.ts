import app from "./app";

const fire = async () => {
  app.listen(8000, () => {
    console.log("server fire on port 8000");
  });
};

fire();
