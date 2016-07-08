## Contributing

### Clone the Project from GitHub

Clone the project's development branch on github

```
git clone -b development https://github.com/AngryPulpGophers/fairshare.git
cd fairshare
```

### Start the Database

If you don't have Postgres on your computer run
```
brew install postgres
```
Run npm install
and then run:
```
npm install -g knex
```
Then to start your database run:
```
postgres -D /usr/local/var/postgres
```
To create your tables and seed data run in a new tab:
```
createdb fairshare
knex migrate:latest
```
Do not CTRL-C to stop Postgres
To stop your database:
```
pg_ctl -D /usr/local/var/postgres stop -s -m fast
```

To start the server, run in a new tab:
```
npm run start
```

To drop the database, stop your server and run:
```
dropdb fairshare
```

### Setup Test Suite

Create the test database
```
createuser fairshare --password
createdb fairshare-test
knex migrate:latest --env test
```
**important
When prompted give the user fairshare a password of "password".

Run the test
```
npm run test
```

### Create a new branch

Checkout a new branch for what you're working on:
```
git checkout -b feat/newfeature
git checkout -b bug/somebug
git checkout -b doc/styleguide
```

### Work on your own branch

Make changes and commits on your branch, and make sure that you
only make changes that are relevant to this branch. If you find
yourself making unrelated changes, make a new branch for those
changes.

### Commit Message Guidelines

- Commit messages should be written in the present tense; e.g. "Fix continuous
  integration script".
- The first line of your commit message should be a brief summary of what the
  commit changes. Aim for about 70 characters max. Remember: This is a summary,
  not a detailed description of everything that changed.
- If you want to explain the commit in more depth, following the first line should
  be a blank line and then a more detailed description of the commit. This can be
  as detailed as you want, so dig into details here and keep the first line short.

### Before Pushing to GitHub

This will start the rebase process. You must commit all of your changes
before doing this. If there are no conflicts, this should just roll all
of your changes back on top of the changes from upstream, leading to a
nice, clean, linear commit history.

```
git pull --rebase origin development
```

### Handling Conflicts

If there are conflicting changes, git will start yelling at you part way
through the rebasing process. Git will pause rebasing to allow you to sort
out the conflicts. You do this the same way you solve merge conflicts,
by checking all of the files git says have been changed in both histories
and picking the versions you want. Be aware that these changes will show
up in your pull request, so try and incorporate upstream changes as much
as possible.

You pick a file by `git add` it - you do not make commits during a
rebase.

Once you are done fixing conflicts for a specific commit, run:

```
git rebase --continue
```
This will continue the rebasing process. Once you are done fixing all
conflicts you should run the existing tests to make sure you didn't break
anything, then run your new tests and make sure they work also.

If rebasing broke anything, fix it, then repeat the above process until
you get here again and nothing is broken and all the tests pass.

### Making a pull request

Only ever push to your feature branch on github, never to master or development.
```
git push origin feat/newfeature
```

Submit a pull request on Github from the feature branch to development

The scrum master must review and merge.

After merging the pull request the scrum master will slack @channel REBASE.

Once you see this it is important to do another: 

```
git pull --rebase origin development
```
