package models

type Msg struct {
	ID     int    `json:"id,string"`
	TypeID int    `json:"typeID"`
	Value  string `json:"value"`
}
