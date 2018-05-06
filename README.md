# Github Star Tagger

System to tag your stared github projects

## Getting Started

This project is all developed with nodejs ans is separeted in two folters, `backend` and `frontend`.   
Each have their own package.json

## Prototypes

The project prototypes can be found here: https://www.figma.com/file/Qf4g96gHj59UrL6nqyNrtFbB/Github-Star-Tagger

### Prerequisites

As prerequisites you will need nodejs 8 or higher and sqlite

You will need also to generate a github key and insert into `backend/.env`   
Follow these instructions with below information: https://developer.github.com/apps/building-oauth-apps/creating-an-oauth-app/

```
Homepage URL: http://localhost:9005
Authorization callback URL: http://localhost:8080/auth/github/callback
```

### Installing

To each project, exeute the folowing commands in backend and frontend respectively:

```
npm install
npm start
```

After that your project should be running on http://localhost:9005