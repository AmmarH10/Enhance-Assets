import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import cors from "cors";
import db from "./db.js";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API routes
  app.get("/api/assets", (req, res) => {
    try {
      const { division } = req.query;
      let query = "SELECT * FROM assets";
      let params: any[] = [];

      if (division) {
        query += " WHERE division = ?";
        params.push(division);
      }

      query += " ORDER BY created_at DESC";
      const assets = db.prepare(query).all(...params);
      res.json(assets);
    } catch (error) {
      console.error("Error fetching assets:", error);
      res.status(500).json({ error: "Failed to fetch assets" });
    }
  });

  app.post("/api/assets", (req, res) => {
    try {
      const {
        asset_name,
        asset_code,
        category,
        division,
        location,
        assigned_to,
        purchase_date,
        status,
      } = req.body;

      if (!asset_name || !asset_code || !category || !division || !location) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const stmt = db.prepare(`
        INSERT INTO assets (asset_name, asset_code, category, division, location, assigned_to, purchase_date, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);

      const result = stmt.run(
        asset_name,
        asset_code,
        category,
        division,
        location,
        assigned_to || "Unassigned",
        purchase_date || null,
        status || "Active"
      );

      res.status(201).json({ id: result.lastInsertRowid, message: "Asset added successfully" });
    } catch (error: any) {
      console.error("Error adding asset:", error);
      if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        return res.status(400).json({ error: "Asset code must be unique" });
      }
      res.status(500).json({ error: "Failed to add asset" });
    }
  });

  app.delete("/api/assets/:id", (req, res) => {
    try {
      const { id } = req.params;
      const stmt = db.prepare("DELETE FROM assets WHERE id = ?");
      const result = stmt.run(id);

      if (result.changes === 0) {
        return res.status(404).json({ error: "Asset not found" });
      }

      res.json({ message: "Asset deleted successfully" });
    } catch (error) {
      console.error("Error deleting asset:", error);
      res.status(500).json({ error: "Failed to delete asset" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
