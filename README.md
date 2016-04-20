# Bill-Buddy

## Press Release

>For anyone who is going on a trip with a group of people, to keep track of who owes who what instead of having to keep track on their own.

### Summary

For a group of people who go on a trip together to keep track of who has paid for what and how much, so that everyone knows how much they owe each other. This way the cost is equal without having to try and keep track of it all trip

### Problem

How do you keep track of expenses on a trip without getting split checks for every single exspense, which isnt even possible a lot of the time.

### Solution

Users enter how much they spend on an expense and the app will evenly distribute how much the other members owe you.

### Quote from You

'Peace of mind during group travel'

### How to Get Started

Just make an account, add your buddies to your trip and get going.

### Customer Quote

'Bill-Buddy sure did stop us from having silly arguements and let us have more time for good times'

### Closing and Call to Action

Go download Bill-Buddy now and let us keep track of all the boring stuff for you today!

## Contributing

### Clone the Project from GitHub

Clone the project's development branch on github

```
git clone -b development https://github.com/AngryPulpGophers/bill-buddy.git
cd bill-buddy
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

### Guidelines

1. Uphold the current code standard:
    - Keep your code [DRY][].
    - Apply the [boy scout rule][].
    - Follow STYLE GUIDE (at the bottom)
2. Run the tests before submitting a pull request.
3. Tests are very, very important. Submit tests if your pull request contains
   new, testable behavior.
4. Your pull request is comprised of a single [squashed][] commit (encouraged).
  
## Style Guide

<!-- Links -->
[pull request]: https://help.github.com/articles/using-pull-requests/
[DRY]: http://en.wikipedia.org/wiki/Don%27t_repeat_yourself
[boy scout rule]: http://programmer.97things.oreilly.com/wiki/index.php/The_Boy_Scout_Rule
[squashed]: http://gitready.com/advanced/2009/02/10/squashing-commits-with-rebase.html
<!-- A link to your directory of tests on github -->
[tests]: tests/
