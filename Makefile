all:
	@doctoc README.md
	@sed -e "s/<!--\\s*\(.*\)\\s*-->/\1/g" README.md | litpro -b . -i

clean:
	@git stash -u && git clean -xdf -e node_modules
