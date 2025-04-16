import sirv from "sirv";
import http from "http";

const PORT = process.env.PORT || 8080;
const serve = sirv("public", { dev: false });

const server = http.createServer((req, res) => {
  serve(req, res);
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
