import express from "express";
import "reflect-metadata";
import { dataSource } from "./datasource";
import { Category } from "./entities/Category";
import { Ad } from "./entities/Ad";
import { Tag } from "./entities/Tag";
import cors from "cors";

const app = express();
const port = 5000;
app.use(express.json());
app.use(cors());

// GET ADS

app.get("/ads", async (req, res) => {
  try {
    const ads = await Ad.find({
      relations: {
        category: true,
        tags: true,
      },
    });

    if (!ads || ads.length === 0) {
      return res.status(404).json({ message: "Aucune annonce trouvée." });
    }

    res.status(200).json(ads);
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

// GET AD BY ID
app.get("/ads/:id", async (req, res) => {
  try {
    const ad = await Ad.findOne({
      where: { id: Number(req.params.id) },
      relations: {
        category: true,
        tags: true,
      },
    });

    if (!ad) {
      return res.status(404).json({ message: "Annonce non trouvée." });
    }

    res.status(200).json(ad);
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

// POST ADS

app.post("/ads", async (req, res) => {
  try {
    const ad = new Ad();
    ad.title = req.body.title;
    ad.description = req.body.description;
    ad.owner = req.body.owner;
    ad.price = req.body.price;
    ad.picture = req.body.picture;
    ad.location = req.body.location;
    ad.createdAt = new Date().toISOString().split("T")[0];
    ad.category = req.body.category;
    ad.tags = req.body.tags;
    await ad.save();
    res.send(ad);
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

// PATCH ADS

// PATCH ADS

app.patch("/ads/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const ad = await Ad.findOneBy({ id });
    if (!ad) {
      return res.status(404).json({ message: "Annonce non trouvée." });
    }
    ad.title = req.body.title;
    ad.description = req.body.description;
    ad.owner = req.body.owner;
    ad.price = req.body.price;
    ad.picture = req.body.picture;
    ad.location = req.body.location;
    ad.category = req.body.category;
    ad.tags = req.body.tags;
    await ad.save();
    res.json(ad);
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

// PUT ADS

app.put("/ads/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const ad = await Ad.findOneBy({ id });

    if (!ad) {
      return res.status(404).json({ message: "Annonce non trouvée." });
    }
    ad.title = req.body.title;
    ad.description = req.body.description;
    ad.owner = req.body.owner;
    ad.price = req.body.price;
    ad.picture = req.body.picture;
    ad.location = req.body.location;
    ad.category = req.body.category;
    ad.tags = req.body.tags;
    await ad.save();
    res.json(ad);
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

// DELETE ADS

app.delete("/ads/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await Ad.delete({ id });
  res.send("Annonce supprimée");
});

// GET CATEGORY

app.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find();

    if (!categories || categories.length === 0) {
      return res.status(404).json({ message: "Aucune catégorie trouvée." });
    }

    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

//POST CATEGORY

app.post("/categories", async (req, res) => {
  try {
    const cat = new Category();
    cat.type = req.body.type;
    cat.createdAt = new Date().toISOString().split("T")[0];
    await cat.save();
    res.send(cat);
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

// PUT CATEGORY

app.put("/categories/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const category = await Category.findOneBy({ id });

    if (!category) {
      return res.status(404).json({ message: "Catégorie non trouvée." });
    }

    category.type = req.body.type;
    await category.save();
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

// DELETE CATEGORY

app.delete("/categories/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await Category.delete({ id });
  res.send("Category deleted");
});

// GET TAG

app.get("/tags", async (req, res) => {
  try {
    const tags = await Tag.find();

    if (!tags || tags.length === 0) {
      return res.status(404).json({ message: "Aucune annonce trouvée." });
    }

    res.status(200).json(tags);
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

// POST TAG

app.post("/tags", async (req, res) => {
  try {
    const tg = new Tag();
    tg.content = req.body.content;
    tg.createdAt = new Date().toISOString().split("T")[0];
    await tg.save();
    res.send(tg);
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

// PATCH TAG

app.patch("/tags/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const tg = await Tag.findOneBy({ id });
    if (!tg) {
      return res.status(404).json({ message: "Annonce non trouvée." });
    }
    tg.content = req.body.content;
    await tg.save();
    res.json(tg);
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

// PUT TAG

app.put("/tags/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const tg = await Tag.findOneBy({ id });

    if (!tg) {
      return res.status(404).json({ message: "Annonce non trouvée." });
    }
    tg.content = req.body.content;
    await tg.save();
    res.json(tg);
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

// DELETE TAG

app.delete("/tags/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await Tag.delete({ id });
  res.send("Tag supprimée");
});

// 404 Error

app.all("*", async (req, res) => {
  res.status(404).json({ messages: "Not found" });
});

app.listen(port, async () => {
  await dataSource.initialize();
  console.log("Server launch on http://localhost:5000");
});
