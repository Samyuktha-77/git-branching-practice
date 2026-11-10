# Git Branching Practice

Day 1 of my daily skill learning challenge.

## Skill Learned

Git Branching

## Commands Practiced

- git init
- git status
- git add
- git commit
- git branch
- git switch
- git merge
- git push

## Day 2
Today I learned how Pull Requests work in GitHub.


## Day 3: Using .gitignore

### What I Learned
- How to prevent unnecessary files from being tracked by Git.
- How to ignore files using patterns in `.gitignore`.
- How to verify ignored files using `git status --ignored`.

### Practical Task
Created a `.gitignore` file with these rules:
- `.env` — ignore environment configuration files.
- `__pycache__/` — ignore Python cache folders.
- `*.log` — ignore files ending in `.log`.

### Result
Created a test file named `test.log` and verified that Git ignored it successfully.


## Day 4: Learning Git and GitHub

### About This Repository
This repository documents my daily Git and GitHub practice.

### Skills Practiced
- Git initialization and commits
- Branching and merging
- GitHub Pull Requests
- Using .gitignore

### Tools Used
- Git
- GitHub
- Visual Studio Code

### Goal
To improve my software development workflow through daily hands-on practice.


## Day 5: Resolving Git Merge Conflicts

### What I Learned
- Why merge conflicts happen when branches modify the same part of a file.
- How to identify conflict markers in a file.
- How to resolve conflicts and complete a merge commit.

### Practical Task
- Created two branches with different changes to the same line.
- Triggered a merge conflict in `conflict.txt`.
- Resolved the conflict by combining both versions.
- Staged the resolved file and committed the merge.

### Result
Successfully resolved a Git merge conflict and verified that the working tree was clean.

## Day 6: Learning Git Stash

### What I Learned
- How to temporarily save unfinished changes using `git stash`.
- How to include untracked files using `git stash push -u`.
- How to restore saved changes using `git stash pop`.
- How to check saved stashes using `git stash list`.

### Practical Task
- Created an untracked practice file named `stash-practice.txt`.
- Stashed my README changes and the untracked file.
- Verified that the working tree became clean.
- Restored the changes using `git stash pop`.

### Result
Successfully practised saving and restoring unfinished changes without creating a commit.

### Day 7: Git Log and Git Diff

**What I learned:**
- Used `git log` to view commit history.
- Used `git diff` to inspect file changes.
- Compared previous and current versions of files.

**Key takeaway:** Git Log helps me understand the project's history, while Git Diff helps me review changes before committing them.

### Day 8: Git Reset and Git Revert

**What I learned:**
- Used `git revert` to reverse a previous commit while preserving history.
- Used `git reset --soft HEAD~1` to move HEAD back one commit while keeping changes staged.
- Recommitted the staged changes with a new commit message.

**Key takeaway:** Git Revert creates a new commit to reverse changes, while Git Reset moves the branch pointer.

### Day 9: Git Cherry-pick

**What I learned:**
- Used `git cherry-pick` to apply a specific commit from another branch.
- Created a source branch and made a commit.
- Switched to another branch and applied the selected commit.
- Verified the new commit using `git log --oneline`.

**Key takeaway:** Git Cherry-pick allows me to copy the changes from a specific commit onto my current branch without merging the entire source branch.

### Day 10: Git Rebase

**What I learned:**
- Created a feature branch and committed a change.
- Added a separate commit to the main branch.
- Used `git rebase main` to replay my feature commit on top of main.
- Checked the commit history using `git log --oneline --graph --all`.

**Key takeaway:**
Git Rebase replays commits onto a new base, creating a linear project history. It changes the commit IDs of the replayed commits.

### Day 11: Git Tags

**What I learned:**
- Learned what Git tags are and why they are used.
- Created a lightweight tag using `git tag v1.0`.
- Inspected a tag using `git show v1.0`.
- Pushed a tag to GitHub using `git push origin v1.0`.
- Created an annotated tag using `git tag -a v1.1 -m "Day 11 annotated tag practice"`.
- Pushed the annotated tag to GitHub.

**Key takeaway:**

Git tags mark important commits in a repository, such as project releases. Lightweight tags are simple labels, while annotated tags store additional information like a message, tagger and date.

## Day 13 – GitHub Issues Practice

### What I learned
- Creating GitHub Issues
- Adding labels to issues
- Tracking tasks using Issues
- Closing completed issues
- Understanding basic project management

### Key takeaway
GitHub Issues help developers track bugs,
features, tasks, and improvements.

## Day 14 – GitHub Projects

### What I Learned
- What GitHub Projects are and why they are useful.
- How to create a project board.
- How to organize tasks using a Kanban board.
- How to track tasks using Todo, In Progress, and Done.
- How GitHub Issues can be connected to project tasks.

### Practical Work
- Created a GitHub Project named **Git & GitHub – 30 Days Learning Journey**.
- Added daily learning tasks to the board.
- Moved the Day 14 task into In Progress.
- Practised organizing work using a Kanban workflow.

### Key Takeaway
GitHub Projects helps developers organize tasks, track progress, and manage projects efficiently.

**Status:** Day 14 completed.



## Day 16 - React Components & Props

### What I Learned
- Understanding React components.
- Creating reusable components.
- Passing data using props.
- Displaying dynamic student information.

### Practical Work
Created a Student component and displayed different student details using props.

### Technologies
- React
- JavaScript
- JSX
