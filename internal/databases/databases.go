package databases

import (
	"github.com/jmoiron/sqlx"
)

type Connection struct {
	*sqlx.DB
}

func New(driverName string, connectionString string) (*Connection, error) {
	db, err := sqlx.Open(driverName, connectionString)
	if err != nil {
		return nil, err
	}
	err = db.Ping()
	return &Connection{DB: db}, err
}
