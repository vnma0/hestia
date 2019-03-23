export default function parseExt(ext) {
    switch (ext) {
        case 'abap':
            return 'abap'
        case 'abc':
            return 'abc'
        case 'as':
            return 'actionscript'
        case 'ada':
            return 'ada'
        case 'adb':
            return 'ada'
        case 'htaccess':
        case 'htgroups':
        case 'htpasswd':
            return 'apache_conf'
        case 'asciidoc':
        case 'adoc':
            return 'asciidoc'
        case 'dsl':
            return 'asl'
        case 'asl':
            return 'asl'
        case 'asm':
        case 'a':
            return 'assembly_x86'
        case 'ahk':
            return 'autohotkey'
        case 'apex':
        case 'cls':
        case 'trigger':
        case 'tgr':
            return 'apex'
        case 'bat':
        case 'cmd':
            return 'batchfile'
        case 'bro':
            return 'bro'
        case 'cpp':
        case 'c':
        case 'cc':
        case 'cxx':
        case 'h':
        case 'hh':
        case 'hpp':
        case 'hxx':
        case 'ino':
            return 'c_cpp'
        case 'c9search_results':
            return 'c9search'
        case 'cirru':
        case 'cr':
            return 'cirru'
        case 'clj':
        case 'cljs':
            return 'clojure'
        case 'CBL':
        case 'COB':
            return 'cobol'
        case 'coffee':
        case 'cf':
        case 'cson':
            return 'coffee'
        case 'cfm':
            return 'coldfusion'
        case 'cs':
            return 'csharp'
        case 'csd':
            return 'csound_document'
        case 'orc':
            return 'csound_orchestra'
        case 'sco':
            return 'csound_score'
        case 'css':
            return 'css'
        case 'curly':
            return 'curly'
        case 'd':
        case 'di':
            return 'd'
        case 'dart':
            return 'dart'
        case 'diff':
        case 'patch':
            return 'diff'
        case 'dot':
            return 'dot'
        case 'drl':
            return 'drools'
        case 'edi':
            return 'edifact'
        case 'e':
        case 'ge':
            return 'eiffel'
        case 'ejs':
            return 'ejs'
        case 'ex':
        case 'exs':
            return 'elixir'
        case 'elm':
            return 'elm'
        case 'erl':
        case 'hrl':
            return 'erlang'
        case 'frt':
        case 'fs':
        case 'ldr':
        case 'fth':
        case '4th':
            return 'forth'
        case 'f':
        case 'f90':
            return 'fortran'
        case 'fsi':
        case 'ml':
        case 'mli':
        case 'fsx':
        case 'fsscript':
            return 'fsharp'
        case 'fsl':
            return 'fsl'
        case 'ftl':
            return 'ftl'
        case 'gcode':
            return 'gcode'
        case 'feature':
            return 'gherkin'
        case 'glsl':
        case 'frag':
        case 'vert':
            return 'glsl'
        case 'gbs':
            return 'gobstones'
        case 'go':
            return 'golang'
        case 'gql':
            return 'graphqlschema'
        case 'groovy':
            return 'groovy'
        case 'haml':
            return 'haml'
        case 'hbs':
        case 'handlebars':
        case 'mustache':
            return 'handlebars'
        case 'hs':
            return 'haskell'
        case 'cabal':
            return 'haskell_cabal'
        case 'hx':
            return 'haxe'
        case 'hjson':
            return 'hjson'
        case 'html':
        case 'htm':
        case 'xhtml':
        case 'vue':
        case 'we':
        case 'wpy':
            return 'html'
        case 'eex':
            return 'html_elixir'
        case 'erb':
        case 'rhtml':
            return 'html_ruby'
        case 'ini':
        case 'conf':
        case 'cfg':
        case 'prefs':
            return 'ini'
        case 'io':
            return 'io'
        case 'jack':
            return 'jack'
        case 'jade':
        case 'pug':
            return 'jade'
        case 'java':
            return 'java'
        case 'js':
        case 'jsm':
        case 'jsx':
            return 'javascript'
        case 'json':
            return 'json'
        case 'jq':
            return 'jsoniq'
        case 'jsp':
            return 'jsp'
        case 'jssm':
        case 'jssm_state':
            return 'jssm'
        case 'jl':
            return 'julia'
        case 'kt':
        case 'kts':
            return 'kotlin'
        case 'latex':
        case 'ltx':
        case 'bib':
            return 'latex'
        case 'less':
            return 'less'
        case 'liquid':
            return 'liquid'
        case 'lisp':
            return 'lisp'
        case 'ls':
            return 'livescript'
        case 'logic':
        case 'lql':
            return 'logiql'
        case 'lsl':
            return 'lsl'
        case 'lua':
            return 'lua'
        case 'lp':
            return 'luapage'
        case 'lucene':
            return 'lucene'
        case 'make':
            return 'makefile'
        case 'md':
        case 'markdown':
            return 'markdown'
        case 'mask':
            return 'mask'
        case 'matlab':
            return 'matlab'
        case 'mz':
            return 'maze'
        case 'mel':
            return 'mel'
        case 'mixal':
            return 'mixal'
        case 'mc':
        case 'mush':
            return 'mushcode'
        case 'mysql':
            return 'mysql'
        case 'nix':
            return 'nix'
        case 'nsi':
        case 'nsh':
            return 'nsis'
        case 'm':
        case 'mm':
            return 'objectivec'
        case 'pas':
        case 'p':
            return 'pascal'
        case 'pl':
        case 'pm':
            return 'perl'
        case 'p6':
        case 'pl6':
        case 'pm6':
            return 'perl6'
        case 'pgsql':
            return 'pgsql'
        case 'php':
        case 'inc':
        case 'phtml':
        case 'shtml':
        case 'php3':
        case 'php4':
        case 'php5':
        case 'phps':
        case 'phpt':
        case 'aw':
        case 'ctp':
        case 'module':
            return 'php'
        case 'epp':
        case 'pp':
            return 'puppet'
        case 'pig':
            return 'pig'
        case 'ps1':
            return 'powershell'
        case 'praat':
        case 'praatscript':
        case 'psc':
        case 'proc':
            return 'praat'
        case 'plg':
        case 'prolog':
            return 'prolog'
        case 'properties':
            return 'properties'
        case 'proto':
            return 'protobuf'
        case 'py':
            return 'python'
        case 'r':
            return 'r'
        case 'cshtml':
        case 'asp':
            return 'razor'
        case 'Rd':
            return 'rdoc'
        case 'red':
        case 'reds':
            return 'red'
        case 'Rhtml':
            return 'rhtml'
        case 'rst':
            return 'rst'
        case 'rb':
        case 'ru':
        case 'gemspec':
        case 'rake':
            return 'ruby'
        case 'rs':
            return 'rust'
        case 'sass':
            return 'sass'
        case 'scad':
            return 'scad'
        case 'scala':
            return 'scala'
        case 'scm':
        case 'sm':
        case 'rkt':
        case 'oak':
        case 'scheme':
            return 'scheme'
        case 'scss':
            return 'scss'
        case 'sh':
        case 'bash':
            return 'sh'
        case 'sjs':
            return 'sjs'
        case 'slim':
        case 'skim':
            return 'slim'
        case 'smarty':
        case 'tpl':
            return 'smarty'
        case 'snippets':
            return 'snippets'
        case 'soy':
            return 'soy_template'
        case 'space':
            return 'space'
        case 'sql':
            return 'sql'
        case 'sqlserver':
            return 'sqlserver'
        case 'styl':
        case 'stylus':
            return 'stylus'
        case 'svg':
            return 'svg'
        case 'swift':
            return 'swift'
        case 'tcl':
            return 'tcl'
        case 'tf':
        case 'tfvars':
        case 'terragrunt':
            return 'terraform'
        case 'tex':
            return 'tex'
        case 'txt':
            return 'text'
        case 'textile':
            return 'textile'
        case 'toml':
            return 'toml'
        case 'tsx':
            return 'tsx'
        case 'latte':
        case 'twig':
        case 'swig':
            return 'twig'
        case 'ts':
        case 'typescript':
        case 'str':
            return 'typescript'
        case 'vala':
            return 'vala'
        case 'vbs':
        case 'vb':
            return 'vbscript'
        case 'vm':
            return 'velocity'
        case 'v':
        case 'vh':
        case 'sv':
        case 'svh':
            return 'verilog'
        case 'vhd':
        case 'vhdl':
            return 'vhdl'
        case 'vfp':
        case 'component':
        case 'page':
            return 'visualforce'
        case 'wlk':
        case 'wpgm':
        case 'wtest':
            return 'wollok'
        case 'xml':
        case 'rdf':
        case 'rss':
        case 'wsdl':
        case 'xslt':
        case 'atom':
        case 'mathml':
        case 'mml':
        case 'xul':
        case 'xbl':
        case 'xaml':
            return 'xml'
        case 'xq':
            return 'xquery'
        case 'yaml':
        case 'yml':
            return 'yaml'
        default:
            return ''
    }
}
