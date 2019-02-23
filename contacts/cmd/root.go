package cmd

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

var rootCmd = &cobra.Command{
	Use:   "bittr-contacts",
	Short: "bittr contacts microservice",
	Run: func(cmd *cobra.Command, args []string) {
	},
}

var (
	port = "8080"
)

func init() {
	rootCmd.PersistentFlags().StringVarP(&port, "port", "p", "PORT", "Port to listen on (default: 8080)")
}

// Execute executes the program
func Execute() {
	if err := rootCmd.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}
