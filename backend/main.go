package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"sync"
	"time"

	"github.com/rs/cors"
)

type Note struct {
	ID        string    `json:"id"`
	Content   string    `json:"content"`
	CreatedAt time.Time `json:"createdAt"`
}

type NotesStorage struct {
	notes []Note
	mutex sync.RWMutex
}

type CreateNoteRequest struct {
	Content string `json:"content"`
}

var storage = &NotesStorage{
	notes: []Note{
		{ID: "1", Content: "Welcome to your notes app!", CreatedAt: time.Now()},
		{ID: "2", Content: "This is a sample note", CreatedAt: time.Now()},
	},
}

func (s *NotesStorage) GetNotes() []Note {
	s.mutex.RLock()
	defer s.mutex.RUnlock()
	return s.notes
}

func (s *NotesStorage) AddNote(content string) Note {
	s.mutex.Lock()
	defer s.mutex.Unlock()
	
	note := Note{
		ID:        strconv.FormatInt(time.Now().UnixNano(), 10),
		Content:   content,
		CreatedAt: time.Now(),
	}
	s.notes = append(s.notes, note)
	return note
}

func (s *NotesStorage) DeleteNote(id string) bool {
	s.mutex.Lock()
	defer s.mutex.Unlock()
	
	for i, note := range s.notes {
		if note.ID == id {
			s.notes = append(s.notes[:i], s.notes[i+1:]...)
			return true
		}
	}
	return false
}

func notesHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	
	switch r.Method {
	case http.MethodGet:
		notes := storage.GetNotes()
		json.NewEncoder(w).Encode(notes)
		
	case http.MethodPost:
		var req CreateNoteRequest
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			http.Error(w, "Invalid JSON", http.StatusBadRequest)
			return
		}
		
		if req.Content == "" {
			http.Error(w, "Content is required", http.StatusBadRequest)
			return
		}
		
		note := storage.AddNote(req.Content)
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(note)
		
	case http.MethodDelete:
		noteID := r.URL.Query().Get("id")
		if noteID == "" {
			http.Error(w, "Note ID is required", http.StatusBadRequest)
			return
		}
		
		if storage.DeleteNote(noteID) {
			w.WriteHeader(http.StatusNoContent)
		} else {
			http.Error(w, "Note not found", http.StatusNotFound)
		}
		
	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"status": "healthy"})
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/notes", notesHandler)
	mux.HandleFunc("/health", healthHandler)
	
	// Setup CORS
	c := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:3000"},
		AllowedMethods: []string{"GET", "POST", "DELETE", "OPTIONS"},
		AllowedHeaders: []string{"Content-Type"},
	})
	
	handler := c.Handler(mux)
	
	port := ":8080"
	fmt.Printf("Server starting on port %s\n", port)
	log.Fatal(http.ListenAndServe(port, handler))
}
