import * as SQLite from "expo-sqlite/legacy";

const database = SQLite.openDatabase("todos.db");

// initializing the database 
export function init() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((txn) => {
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY NOT NULL, 
        description TEXT, 
        isImportant INTEGER, 
        isUrgent INTEGER, 
        taskType INTEGER, 
        stage INTEGER DEFAULT 0
        )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
}

// creat todo 
export function createToDo(todo) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((txn) => {
      txn.executeSql(
        `INSERT INTO todos (description,isImportant, isUrgent, taskType, stage) VALUES (?,?,?,?,?)`,
        [
          todo.description,
          todo.isImportant,
          todo.isUrgent,
          todo.taskType,
          todo.stage,
        ],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
}

// read all todo 
export function readToDo(settodos) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((txn) => {
      txn.executeSql(
        `SELECT * FROM todos ORDER BY id DESC`,
        [],
        (_, result) => {
          settodos(result.rows._array);
          resolve(result.rows._array);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
}

// read single todo 
export function readSingleToDo(id) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((txn) => {
      txn.executeSql(
        `SELECT * FROM todos WHERE id = ?`,
        [id],
        (_, result) => {
          resolve(result.rows._array);
        }, (_, error) => {
          reject(error);
        })
    })
  })
  return promise;
}

// update todo 
export function updateToDo(todo, id, setAllTodo) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((txn) => {
      txn.executeSql(
        `UPDATE todos SET description = ?, isImportant = ?, isUrgent = ?, taskType = ? WHERE id = ?`,
        [todo.description, todo.isImportant, todo.isUrgent, todo.taskType, id],
        (_, result) => {
          setAllTodo();
          resolve(result);
        },
        (_, error) => {
          reject(error);
        })
    })
  });
  return promise;
}

// delete todo 
export function deleteToDo(id, readToDo) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((txn) => {
      txn.executeSql(
        `DELETE FROM todos WHERE id = ?`,
        [id],
        (_, result) => {
          readToDo();
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
}
