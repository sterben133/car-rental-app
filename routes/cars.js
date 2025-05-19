const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/cars.db');

// 首页渲染
router.get('/', (req, res) => {
  db.all("SELECT * FROM cars", [], (err, rows) => {
    if (err) return res.send("DB Error");
    res.render('home', { cars: rows, filters: {} });
  });
});

// 搜索建议 API
router.get('/api/suggest', (req, res) => {
  const q = req.query.q?.toLowerCase() || '';
  db.all(`
    SELECT DISTINCT brand || ' ' || model AS keyword 
    FROM cars 
    WHERE LOWER(brand || ' ' || model || ' ' || type || ' ' || fuel) LIKE ?`,
    [`%${q}%`],
    (err, rows) => {
      if (err) return res.json([]);
      res.json(rows.map(r => r.keyword));
    });
});

// 筛选与搜索 AJAX API
router.get('/api/filter', (req, res) => {
  const { keyword = '', brand = '', type = '' } = req.query;
  let query = "SELECT * FROM cars WHERE 1=1";
  let params = [];

  if (keyword) {
    query += " AND (brand || ' ' || model || ' ' || type || ' ' || fuel) LIKE ?";
    params.push(`%${keyword}%`);
  }
  if (brand) {
    query += " AND brand = ?";
    params.push(brand);
  }
  if (type) {
    query += " AND type = ?";
    params.push(type);
  }

  db.all(query, params, (err, rows) => {
    if (err) return res.json([]);
    res.json(rows);
  });
});

router.get('/reserve/:id', (req, res) => {
  const id = req.params.id;
  db.get("SELECT * FROM cars WHERE id = ?", [id], (err, car) => {
    if (err || !car) return res.send("Car not found");
    res.render('reserve', { car });
  });
});

router.post('/reserve/:id', (req, res) => {
  const id = req.params.id;
  const { fullname, email, phone, license, date, days } = req.body;

  db.run("UPDATE cars SET available = 0 WHERE id = ?", [id], function(err) {
    if (err) return res.send("Reservation failed");
    res.redirect('/confirm');
  });
});

router.get('/confirm', (req, res) => {
  res.render('confirm');
});

module.exports = router;
