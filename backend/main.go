package main

import (
	"fmt"
	"net/http"
)

func loginHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path == "/" {
		http.ServeFile(w, r, "../frontend/login.html")
		return
	}
	http.FileServer(http.Dir("../frontend")).ServeHTTP(w, r)
}

func main() {
	Init("database.db")

	http.HandleFunc("/", loginHandler)

	fmt.Println("Starting server at port 5555")
	err := http.ListenAndServe(":5555", nil)

	if err != nil {
		fmt.Printf("Error starting the server: %v", err)
	}
}
