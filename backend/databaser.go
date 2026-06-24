package main

import (
	"database/sql"
	"fmt"
	"os"

	_ "modernc.org/sqlite"
)

func InitDB() {
	if _, err := os.Stat("users.db"); err == nil {
		return
	}

	db, err := sql.Open("sqlite", "users.db")
	if err != nil {
		fmt.Printf("Failed to connect to database: %v", err)
	}

	defer db.Close()

	if err := db.Ping(); err != nil {
		fmt.Printf("Failed to ping database: %v", err)
	}

	_, err = db.Exec(`CREATE TABLE users (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		username TEXT UNIQUE NOT NULL,
		password TEXT NOT NULL
	);`)
	if err != nil {
		fmt.Printf("Failed to create table: %v", err)
	}

	_, err = db.Exec(`INSERT OR IGNORE INTO users (username, password) VALUES ("admin", "admin");`)
	if err != nil {
		fmt.Printf("Failed to add default user: %v", err)
	}

	fmt.Println("Success to init database")
}

func AddUser(username string, password string) {
	db, err := sql.Open("sqlite", "users.db")
	if err != nil {
		fmt.Printf("Failed to connect to database: %v", err)
	}

	_, err = db.Exec(`INSERT INTO users (username, password) VALUES (?, ?);`, username, password)
	if err != nil {
		fmt.Printf("Failed to add user: %v", err)
	}
}

func UpdateUser(id int, username string, password string) {
	db, err := sql.Open("sqlite", "users.db")
	if err != nil {
		fmt.Printf("Failed to connect to database: %v", err)
	}

	_, err = db.Exec(`UPDATE users SET username = ?, password = ? WHERE id = ?`, username, password, id)
	if err != nil {
		fmt.Printf("Failed to update user: %v", err)
	}
}
