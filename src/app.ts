import express, { Application, urlencoded } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app: Application = express();

const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));

// ** create user
app.post("/create-user", async (req, res) => {
  console.log("create user on fire ");
  const result = await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
    },
  });

  res.json({
    message: " User created successfully",
    data: result,
  });
});

//  ** Get Single User
app.get("/users/:id", async (req, res) => {
  const result = await prisma.user.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
    include: {
      profile: true,
    },
  });
  res.json({
    message: "User retrieved successfully",
    data: result,
  });
});
//  ** Get All User
app.get("/users", async (req, res) => {
  const result = await prisma.user.findMany({});
  res.json({
    message: "User retrieved successfully",
    data: result,
  });
});

//**  Create profile with userId

app.post("/create-profile", async (req, res) => {
  const isExisting = await prisma.profile.findUnique({
    where: {
      userId: req.body.userId,
    },
  });

  if (isExisting) {
    const updateProfile = await prisma.profile.update({
      where: {
        userId: req.body.userId,
      },
      data: {
        bio: req.body.bio,
      },
    });

    res.json({
      message: " profile update successful",
      data: updateProfile,
    });
    return;
  }

  const result = await prisma.profile.create({
    data: {
      bio: req.body.bio,
      userId: req.body.userId,
    },
  });

  res.json({
    message: "Profile created successfully",
    data: result,
  });
});

export default app;
