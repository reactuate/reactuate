all:
	@doctoc README.md
	@litpro -b . README.md

clean:
	@git stash -u && git clean -xdf -e node_modules
