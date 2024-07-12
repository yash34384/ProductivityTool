import * as SQLite from "expo-sqlite/legacy";

const database = SQLite.openDatabase("todos.db");

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
export function deleteToDo(id, readToDo) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((txn) => {
      txn.executeSql(
        `DELETE FROM todos WHERE id = ?`,
        [id],
        (_, result) => {
          console.log(result);
          readToDo();
          resolve(result);
        },
        (_, error) => {
          console.log(error);
          reject(error);
        }
      );
    });
  });
  return promise;
}
