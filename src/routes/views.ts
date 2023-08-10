import { Router } from "express";
const router = Router();

router.get("/", (request, response) => {
  response.render("index", {
    subject: "hbs template engine",
    name: "our template",
    link: "https://google.com",
  });
});

router.get("/about", (request, response) => {
  response.render("about", {
    subject: "hbs template engine",
    name: "our template",
    link: "https://google.com",
  });
});

export { router as viewsRouter };
