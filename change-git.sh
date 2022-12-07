git filter-branch --env-filter'

oldEmail="869653722@qq.com"
newName="jzfai"
newEmail="869653722@qq.com"

if [ "$GIT_COMMITTER_EMAIL" = "$oldEmail" ]; then
    export GIT_COMMITTER_NAME="$newName"
    export GIT_COMMITTER_EMAIL="$newEmail"
fi

if [ "$GIT_AUTHOR_EMAIL" = "$oldEmail" ]; then
    export GIT_AUTHOR_NAME="$newName"
    export GIT_AUTHOR_EMAIL="$newEmail"
fi

' --tag-name-filter cat -- --branches --tags
