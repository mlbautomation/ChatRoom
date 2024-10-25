package main

import (
	"context"
	"log"
	"net/http"
)

func main() {

	rootCtx := context.Background()
	ctx, cancel := context.WithCancel(rootCtx)
	defer cancel()
	setupAPI(ctx)

	//log.Fatal(http.ListenAndServeTLS(":8080", "server.crt", "server.key", nil))
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func setupAPI(ctx context.Context) {

	manager := NewManager(ctx)

	http.HandleFunc("/ws", manager.serveWS)
	http.HandleFunc("/login", manager.loginHandler)
}
