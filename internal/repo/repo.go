package repo

import (
	"encoding/json"
	"fmt"
	"os"
	"sync"
)

type Repo struct {
	Cache map[int]bool `json:"data,omitempty"`
	mu    sync.RWMutex
}

const fileName = "config/values.json"

func New() *Repo {
	m := make(map[int]bool)
	file, err := os.Open(fileName)
	if err == nil {
		_ = json.NewDecoder(file).Decode(&m)
	}
	return &Repo{Cache: m}
}

func (r *Repo) SetValue(id int, value bool) {
	r.mu.Lock()
	defer r.mu.Unlock()
	r.Cache[id] = value
	go r.saveValues()
}

func (r *Repo) GetValue(id int) bool {
	r.mu.RLock()
	defer r.mu.RUnlock()
	return r.Cache[id]
}

func (r *Repo) saveValues() {
	r.mu.Lock()
	defer r.mu.Unlock()

	body, err := json.Marshal(&r.Cache)
	if err != nil {
		fmt.Println("can not marshal cache:", err)
		return
	}

	file, err := os.Create(fileName)
	if err != nil {
		fmt.Println("can not create file:", err)
		return
	}

	if _, err = file.Write(body); err != nil {
		fmt.Println("can not write file:", err)
	}
}
