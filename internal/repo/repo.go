package repo

import (
	"fmt"
	"github.com/openlyinc/civil"
	"github.com/srybnik/dme-dashboard/internal/databases"
	"time"
)

type Log struct {
	Date time.Time `db:"dt"`
	Msg  string    `db:"msg"`
}

type Repo struct {
	db *databases.Connection
}

func New(db *databases.Connection) *Repo {
	return &Repo{db: db}
}

func (r *Repo) Event(format string, a ...interface{}) error {
	msg := fmt.Sprintf(format, a...)
	query := "insert into events(dt, msg) values ($1, $2)"
	_, err := r.db.Exec(query, time.Now(), msg)
	return err
}

func (r *Repo) GetData(startDate civil.Date, endDate civil.Date) ([]Log, error) {
	query := `select dt, msg
		from events
		where dt between $1 and $2`
	var data []Log
	err := r.db.Select(&data, query, startDate, endDate.AddDays(1))
	return data, err
}
