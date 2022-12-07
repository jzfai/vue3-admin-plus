git filter-branch --env-filter '

OLD_EMAIL="869653722@qq.com" // 要替换的邮箱
CORRECT_NAME="jzfai" // 新的用户名
CORRECT_EMAIL="869653722@qq.com" // 新的邮箱

if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_AUTHOR_NAME="$CORRECT_NAME"
    export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi
'
