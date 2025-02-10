A simple GitHub username typeahead application built with React and Vite. This project demonstrates how to implement an autocomplete search for GitHub users using the GitHub API with a personal access token for authentication.

## Overview
The application uses a personal access token (stored in an environment variable) to authenticate API requests to GitHub. This keeps your sensitive credentials private and secure. If you clone this project, you'll need to create your own GitHub token to use the app.

## 1. Clone the Repository
git clone git@github.com:klau55/github_username_typeaheads.git

cd github_username_typeaheads

## 2. Install Dependencies
npm install

## 3. Create and add a GitHub Personal Access Token
go to https://github.com/settings/personal-access-tokens

generate a personal classic token (any duration, just make sure to select USER tickbox)

create .env file in root folder

in .env file paste your token instead of your-token in format VITE_TOKEN=your token

## 4.Run
npm run dev
