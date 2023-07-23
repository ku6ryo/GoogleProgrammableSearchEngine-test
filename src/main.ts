import "dotenv/config"
import axios from "axios"
import readline from "readline"

type SearchResponsePartial = {
  items: {
    kind: string,
    title:string,
    htmlTitle: string,
    link: string,
    displayLink: string,
    snippet: string,
    htmlSnippet: string,
    cacheId: string,
    formattedUrl: string,
    htmlFormattedUrl: string,
  }[]
}

async function search(query: string) {
  const url = "https://customsearch.googleapis.com/customsearch/v1"
  const { data } = await axios.get<SearchResponsePartial>(url, {
    params: {
      cx: process.env.GOOGLE_SEARCH_ENGINE_ID,
      key: process.env.GOOGLE_API_KEY,
      q: query,
    }
  })
  return data
}

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  while(true) {
    const query = await new Promise<string>(resolve => {
      rl.question("query: ", text => {
        resolve(text)
      })
    })
    const result = await search(query)
    result.items.forEach((item, i) => {
      console.log(`[${i + 1}]`)
      console.log(item.title)
      console.log(item.link)
      console.log(item.snippet)
      console.log()
    })
  }
}

main()