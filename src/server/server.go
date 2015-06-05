package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {

	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/API/seed-data/{url}", GetSeedData)
	log.Fatal(http.ListenAndServe(":8080", router))
}

func GetSeedData(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	url := "http://" + vars["url"]
	fmt.Fprintln(w, "request url:", url)

	req, err := http.NewRequest("GET", url, nil)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)

	fmt.Fprintln(w, "response status:", resp.Status)
	fmt.Fprintln(w, "response body:", string(body))
}
