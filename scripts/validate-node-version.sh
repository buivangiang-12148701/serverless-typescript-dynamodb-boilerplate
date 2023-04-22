#!/usr/bin/env bash

my_dir="$(dirname "$0")"

# include colors
. "$my_dir/colors.sh"

# validate nodejs should be version 16.x or higher will exit 0 else exit 1
if [ -z "$(which node)" ]; then
  echo -e "${RED}nodejs is not installed${NC}"
  exit 1
fi

# validate nodejs version
NODE_VERSION=$(node -v)

if [[ $NODE_VERSION =~ ^v([0-9]+)\.([0-9]+)\.([0-9]+)$ ]]; then
  NODE_MAJOR_VERSION=${BASH_REMATCH[1]}
  if [ "$NODE_MAJOR_VERSION" -lt 16 ]; then
    echo -e "${RED}nodejs version should be 16 or higher${NC}"
    exit 1
  fi
fi
echo -e "${GREEN}nodejs version is ${NODE_VERSION}${NC}"
exit 0;
