import { prisma } from "../lib/prisma.js";

async function main() {
  await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@test.com",
      password: "123456",
      role: "ADMIN",
    },
  });

  await prisma.course.create({
    data: {
      title: "Chef Master Class",
      description: "Learn cooking",
      price: 50,
      level: "Beginner",
      duration: "4 weeks",
    },
  });

  console.log("Seed done 🔥");
}

main();