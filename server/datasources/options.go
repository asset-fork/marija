package datasources

type SearchOptions struct {
	Size  int
	From  int
	Query string

	AdvancedQueries []AdvancedQuery
	Fields          []string
}
