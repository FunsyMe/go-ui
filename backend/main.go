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

func homeHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path == "/" {
		http.ServeFile(w, r, "../frontend/login.html")
		return
	}
	http.FileServer(http.Dir("../frontend")).ServeHTTP(w, r)
}

func panelHandler(w http.ResponseWriter, r *http.Request) {
	username, err := r.Cookie("username")
	if err != nil {
		http.Redirect(w, r, "/", http.StatusSeeOther)
		return
	}

	password, err := r.Cookie("password")
	if err != nil {
		http.Redirect(w, r, "/", http.StatusSeeOther)
		return
	}

	userData := User{Username: username.Value, Password: password.Value}
	user := GetUser(userData.Username)

	if userData != user {
		http.Redirect(w, r, "/", http.StatusForbidden)
		return
	}

	if r.URL.Path == "/panel" {
		http.ServeFile(w, r, "../frontend/panel.html")
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

func loginHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {
		var userData User

		err := json.NewDecoder(r.Body).Decode(&userData)
		if err != nil {
			http.Error(w, "Invalid data", http.StatusBadRequest)
			return
		}

		user := GetUser(userData.Username)

		if userData == user {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusOK)
		} else {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusNotFound)
		}

		json.NewEncoder(w).Encode(user)
	}
}

func main() {
	InitDB()

	fs := http.FileServer(http.Dir("../frontend/static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))

	http.HandleFunc("/", homeHandler)
	http.HandleFunc("/panel", panelHandler)
	http.HandleFunc("/api/addUser", addUserHandler)
	http.HandleFunc("/api/login", loginHandler)

	fmt.Println("Starting server at port 5555")
	err := http.ListenAndServe(":5555", nil)

	if err != nil {
		fmt.Printf("Error starting the server: %v", err)
	}
}
