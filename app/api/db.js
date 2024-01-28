import mysql from "mysql2/promise";

// const uri = "mongodb://localhost:27017/visard";

const connectToDatabase = async () => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "vizard",
    password: "",
  });

  return connection;

};

export { connectToDatabase };
