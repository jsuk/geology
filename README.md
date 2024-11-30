# geology
# packages installed on linux
- texlive
- texlive-pictures
- texlive-latex-extra
- texlive-luatex
# file generation
 $ uname -a
 $ pdflatex geotable.tex
 $ PLANTUML_JAR=/data/data/com.termux/files/usr/share/java/plantuml.jar lualatex -shell-escape geotable.tex
 $ termux-open geotable.pdf
