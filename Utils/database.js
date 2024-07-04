import * as SQLite from 'expo-sqlite/legacy';

const database = SQLite.openDatabase('todos.db');

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
          resolve()
        },
        (_, error) => {
          reject(error)
        }
      );
    });
  });
  return promise;
}