# 📝 Quote Filter App for GazaSkeyGeeks "NodeJs" training.

A simple web application that fetches quotes from a public API and lets users filter them in real-time using a search input.

## 🚀 Features

- Fetches quotes from [dummyjson.com/quotes](https://dummyjson.com/quotes)
- Displays each quote in a styled card
- Includes a search bar to filter quotes as the user types
- Handles loading state and errors gracefully

## 🛠️ Tech Stack

- HTML
- CSS
- JavaScript (Vanilla)

## 🔧 How It Works

1. On page load, the app fetches all quotes from the API.
2. While fetching, a loading message or spinner is displayed.
3. Once fetched, quotes are rendered in the DOM.
4. As the user types into the search input, the app filters and displays only the matching quotes.

## 📦 Setup

Just open `index.html` in a browser – no build tools needed.

## 💡 Example API Response

```json
{
  "quotes": [
    {
      "id": 1,
      "quote": "Time is a great healer.",
      "author": "Author Name"
    },
    ...
  ]
}
