const env = process.env.NODE_ENV;

const prod = {
  type: "postgres",
  url: process.env.DATABASE_URL,

  entities: ["dist/entity/*.js"],
  subscribers: ["dist/subscriber/*.js"],

  migrations: ["dist/migration/*.js"],

  cli: {
    migrationsDir: "src/migration",
  },
};
const dev = {
  type: "postgres",
  url:
    "postgres://gjg:parolamiz-sevgi@localhost:5432/interview-gjg",

  entities: ["dist/entity/*.js"],
  subscribers: ["dist/subscriber/*.js"],

  migrations: ["dist/migration/*.js"],

  cli: {
    migrationsDir: "src/migration",
  },
};

module.exports =
  env === "development" ? dev : prod;
