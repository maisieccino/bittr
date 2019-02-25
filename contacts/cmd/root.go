package cmd

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

var rootCmd = &cobra.Command{
	Use:   "bittr-contacts",
	Short: "bittr contacts microservice",
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println(cmd.Flags().Lookup("port").Value)
	},
}

var (
	port   = "8080"
	pgURL  = "localhost"
	pgPort = "5432"
	pgUser = "root"
	pgPass = "root"
	pgName = "db"
)

func init() {
	rootCmd.PersistentFlags().StringVarP(&port, "port", "p", "PORT", "Port to listen on (default: 8080)")
	rootCmd.PersistentFlags().StringVar(&pgURL, "pgurl", "POSTGRES_URL", "URL of postgresql server")
	rootCmd.PersistentFlags().StringVar(&pgPort, "pgport", "POSTGRES_PORT", "port to connect to postgresql server")
	rootCmd.PersistentFlags().StringVar(&pgUser, "pguser", "POSTGRES_USER", "Username for postgresql server")
	rootCmd.PersistentFlags().StringVar(&pgPass, "pgpass", "POSTGRES_DB", "Password for postgresql server")
	rootCmd.PersistentFlags().StringVar(&pgName, "pgname", "POSTGRES_NAME", "Name of postgresql database")
	viper.BindPFlag("port", rootCmd.Flags().Lookup("port"))
	viper.BindPFlag("postgres_url", rootCmd.Flags().Lookup("pgurl"))
	viper.BindPFlag("postgres_port", rootCmd.Flags().Lookup("pgport"))
	viper.BindPFlag("postgres_user", rootCmd.Flags().Lookup("pguser"))
	viper.BindPFlag("postgres_pass", rootCmd.Flags().Lookup("pgpass"))
	viper.BindPFlag("postgres_name", rootCmd.Flags().Lookup("pgname"))
}

// Execute executes the program
func Execute() {
	if err := rootCmd.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}
