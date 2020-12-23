import { env } from "process";

if (process.env.NODE_ENV === "production") {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  console.log = () => {};
}
