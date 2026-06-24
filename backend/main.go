package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type User struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func mainHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path == "/" {
		http.ServeFile(w, r, "../frontend/login.html")
		return
	}
	http.FileServer(http.Dir("../frontend")).ServeHTTP(w, r)
}

func addUserHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {
		var user User

		err := json.NewDecoder(r.Body).Decode(&user)
		if err != nil {
			http.Error(w, "Invalid data", http.StatusBadRequest)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(user)

		AddUser(user.Username, user.Password)
	}
}

func main() {
	InitDB()

	http.HandleFunc("/", mainHandler)
	http.HandleFunc("/api/addUser", addUserHandler)

	fmt.Println("Starting server at port 5555")
	err := http.ListenAndServe(":5555", nil)

	if err != nil {
		fmt.Printf("Error starting the server: %v", err)
	}
}
