Get-ChildItem -Recurse -Filter *.pug | Where-Object { $_.FullName -notlike "*\node_modules\*" } | ForEach-Object {
    pug $_.FullName --out $_.DirectoryName
}
