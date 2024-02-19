package models

type PinValue struct {
	Device int64 `json:"device"`
	Pin    int64 `json:"pin"`
	Value  bool  `json:"value"`
	HasErr bool  `json:"err"`
}
