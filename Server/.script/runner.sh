#!/bin/bash
set -e

echo "Starting deployment..."

git stash
git pull
git checkout -f master
git clean -f

echo "Task completed!"
