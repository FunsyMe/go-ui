package main

import (
	"database/sql"
	"fmt"
	"os"

	_ "modernc.org/sqlite"
)

func Init(filename string) {
	if _, err := os.Stat(filename); err == nil {
		return
	}

	db, err := sql.Open("sqlite", filename)
	if err != nil {
		fmt.Printf("Failed to connect to database: %v", err)
	}

	defer db.Close()

	if err := db.Ping(); err != nil {
		fmt.Printf("Failed to ping database: %v", err)
	}

	createTableSQL := `CREATE TABLE users (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		username TEXT UNIQUE NOT NULL,
		password TEXT NOT NULL
	);`

	_, err = db.Exec(createTableSQL)
	if err != nil {
		fmt.Printf("Failed to create table: %v", err)
	}

	fmt.Println("Success to init database")
}

func AddUser() {

}

func UpdateUser() {

}
