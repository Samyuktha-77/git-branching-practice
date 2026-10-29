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

**What I learned**
- `git log --oneline` — displays a short history of commits.
- `git log --oneline --graph --all` — shows commit history and branch relationships.
- `git diff` — displays changes made to files before committing.

**Practice**
- Created a Day 7 practice branch.
- Modified `stash-practice.txt`.
- Used `git diff` to inspect the changes.

**Key takeaway:** Git Log helps me understand the project's history, while Git Diff helps me review changes before committing them.