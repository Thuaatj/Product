// Import các module cần thiết
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Kết nối cơ sở dữ liệu MySQL
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'manager',
});

// Kiểm tra kết nối cơ sở dữ liệu
(async () => {
  try {
    await db.query('SELECT 1');
    console.log('✅ MySQL connected successfully!');
  } catch (err) {
    console.error('❌ MySQL connection error:', err);
    process.exit(1);
  }
})();
const projects = [
    { id: 1, name: 'Dự án A', date_of_start: '2023-12-01', team_size: 5 },
    { id: 2, name: 'Dự án B', date_of_start: '2024-01-15', team_size: 8 },
  ];

// ✅ API: Lấy tất cả các dự án
// API: Lấy tất cả dự án
app.get('/projects', (req, res) => {
    res.json(projects);
  });
app.get('/api/projects', async (req, res) => {
  try {
    const [projects] = await db.query('SELECT * FROM projects');
    res.status(200).json(projects);
  } catch (error) {
    console.error('❌ Error fetching projects:', error);
    res.status(500).json({ message: 'Lỗi khi lấy dự án' });
  }
});

// ✅ API: Thêm một dự án mới
app.post('/api/projects', async (req, res) => {
  const { name, date_of_start, team_size } = req.body;
  try {
    if (!name || !date_of_start || !team_size) {
      return res.status(400).json({ message: 'Thiếu thông tin dự án' });
    }
    const [result] = await db.query(
      'INSERT INTO projects (name, date_of_start, team_size) VALUES (?, ?, ?)',
      [name, date_of_start, team_size]
    );
    res.status(201).json({ id: result.insertId, name, date_of_start, team_size });
  } catch (error) {
    console.error('❌ Error adding project:', error);
    res.status(500).json({ message: 'Lỗi khi thêm dự án' });
  }
});

// ✅ API: Cập nhật dự án
app.put('/api/projects/:id', async (req, res) => {
  const { id } = req.params;
  const { name, date_of_start, team_size } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE projects SET name = ?, date_of_start = ?, team_size = ? WHERE id = ?',
      [name, date_of_start, team_size, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Không tìm thấy dự án' });
    }
    res.status(200).json({ id, name, date_of_start, team_size });
  } catch (error) {
    console.error('❌ Error updating project:', error);
    res.status(500).json({ message: 'Lỗi khi cập nhật dự án' });
  }
});

// ✅ API: Xóa dự án
app.delete('/api/projects/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM projects WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Không tìm thấy dự án' });
    }
    res.status(200).json({ message: 'Xóa dự án thành công' });
  } catch (error) {
    console.error('❌ Error deleting project:', error);
    res.status(500).json({ message: 'Lỗi khi xóa dự án' });
  }
});
  

// CRUD for Tasks
// 🟢 API: Lấy tất cả tasks
app.get('/api/tasks', (req, res) => {
    db.query('SELECT * FROM tasks', (err, results) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.json(results);
    });
  });
  
  // 🟢 API: Thêm task mới
  app.post('/api/tasks', (req, res) => {
    const { title, description, completed } = req.body;
    db.query('INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)',
      [title, description, completed],
      (err, result) => {
        if (err) {
          res.status(500).send(err);
          return;
        }
        res.status(201).json({ id: result.insertId, title, description, completed });
      });
  });
  
  // 🟢 API: Cập nhật task
  app.put('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    db.query('UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?',
      [title, description, completed, id],
      (err) => {
        if (err) {
          res.status(500).send(err);
          return;
        }
        res.sendStatus(200);
      });
  });
  
  // 🟢 API: Xóa task
  app.delete('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM tasks WHERE id = ?', [id], (err) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.sendStatus(200);
    });
  });
  
// CRUD for Users
app.get('/api/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.post('/api/users', (req, res) => {
    const { name, role } = req.body;
    db.query('INSERT INTO users (name, role) VALUES (?, ?)', [name, role], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'User added', id: result.insertId });
    });
});

app.put('/api/users/:id', (req, res) => {
    const { name, role } = req.body;
    db.query('UPDATE users SET name = ?, role = ? WHERE id = ?', [name, role, req.params.id], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'User updated' });
    });
});

// DELETE: Xóa nhiệm vụ
app.delete('/api/tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await db.query('DELETE FROM tasks WHERE id = ?', [id]);
      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete task' });
    }
  });
  

// Serve Dashboard


// Đường dẫn tới thư mục chứa Angular source (src)
const angularFolder = path.join(__dirname, '../src');

// Cung cấp các file tĩnh từ thư mục src
app.use(express.static(angularFolder));

// Điều hướng tất cả các route của Angular về index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(angularFolder, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
module.exports = app;