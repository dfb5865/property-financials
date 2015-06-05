package main

import (
	"fmt"
	"log"
	"net/http"
	"regexp"
	"strings"

	"github.com/PuerkitoBio/goquery"
	"github.com/gorilla/mux"
)

func main() {

	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/API/property", GetPropertyData).Queries("url", "")
	log.Fatal(http.ListenAndServe(":8080", router))
}

func GetPropertyData(w http.ResponseWriter, r *http.Request) {
	params := r.URL.Query()
	url := params.Get("url")
	fmt.Fprintln(w, "request url:", url)

	doc, err := goquery.NewDocument(url)
	if err != nil {
		log.Fatal(err)
	}

	doc.Find(".zsg-content-header.addr h1").Each(func(_ int, node *goquery.Selection) {
		text := node.Text()
		fmt.Fprintln(w, "Address:", text)
	})

	doc.Find(".main-row.home-summary-row").Each(func(_ int, node *goquery.Selection) {
		text := node.Text()
		fmt.Fprintln(w, "Price:", strings.TrimSpace(text))
	})

	hoaRegex := regexp.MustCompile(`(?i)hoa fee: \$[0-9]*\/mo`)
	dollarAmountRegex := regexp.MustCompile(`\$[0-9]*\/mo`)

	doc.Find(".fact-group-container.zsg-content-component.top-facts").Each(func(_ int, node *goquery.Selection) {
		text := node.Text()
		if hoaRegex.MatchString(text) {
			fmt.Fprintln(w, "HOA:", dollarAmountRegex.FindStringSubmatch(text)[0])
		}
	})

	doc.Find(".description.zsg-h4").Each(func(_ int, node *goquery.Selection) {
		text := node.Text()
		if text == "Property tax" {
			parent := node.Parent()
			price := parent.Find(".vendor-cost").Text()
			fmt.Fprintln(w, "Taxes:", price)
		}
	})

}
