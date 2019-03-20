export default function parseExt(ext) {
    switch (ext) {
        case 'abap' : return 'abap';
        case 'abc' : return 'abc';
        case 'as' : return 'actionscript';
        case 'ada' : return 'ada';
        case 'adb' : return 'ada';
        case 'htaccess' : return 'apache_conf';
        case 'htgroups' : return 'apache_conf';
        case 'htpasswd' : return 'apache_conf';
        case 'asciidoc' : return 'asciidoc';
        case 'adoc' : return 'asciidoc';
        case 'dsl' : return 'asl';
        case 'asl' : return 'asl';
        case 'asm' : return 'assembly_x86';
        case 'a' : return 'assembly_x86';
        case 'ahk' : return 'autohotkey';
        case 'apex' : return 'apex';
        case 'cls' : return 'apex';
        case 'trigger' : return 'apex';
        case 'tgr' : return 'apex';
        case 'bat' : return 'batchfile';
        case 'cmd' : return 'batchfile';
        case 'bro' : return 'bro';
        case 'cpp' : return 'c_cpp';
        case 'c' : return 'c_cpp';
        case 'cc' : return 'c_cpp';
        case 'cxx' : return 'c_cpp';
        case 'h' : return 'c_cpp';
        case 'hh' : return 'c_cpp';
        case 'hpp' : return 'c_cpp';
        case 'ino' : return 'c_cpp';
        case 'c9search_results' : return 'c9search';
        case 'cirru' : return 'cirru';
        case 'cr' : return 'cirru';
        case 'clj' : return 'clojure';
        case 'cljs' : return 'clojure';
        case 'CBL' : return 'cobol';
        case 'COB' : return 'cobol';
        case 'coffee' : return 'coffee';
        case 'cf' : return 'coffee';
        case 'cson' : return 'coffee';
        case 'cfm' : return 'coldfusion';
        case 'cs' : return 'csharp';
        case 'csd' : return 'csound_document';
        case 'orc' : return 'csound_orchestra';
        case 'sco' : return 'csound_score';
        case 'css' : return 'css';
        case 'curly' : return 'curly';
        case 'd' : return 'd';
        case 'di' : return 'd';
        case 'dart' : return 'dart';
        case 'diff' : return 'diff';
        case 'patch' : return 'diff';
        case '^Dockerfile' : return 'dockerfile';
        case 'dot' : return 'dot';
        case 'drl' : return 'drools';
        case 'edi' : return 'edifact';
        case 'e' : return 'eiffel';
        case 'ge' : return 'eiffel';
        case 'ejs' : return 'ejs';
        case 'ex' : return 'elixir';
        case 'exs' : return 'elixir';
        case 'elm' : return 'elm';
        case 'erl' : return 'erlang';
        case 'hrl' : return 'erlang';
        case 'frt' : return 'forth';
        case 'fs' : return 'forth';
        case 'ldr' : return 'forth';
        case 'fth' : return 'forth';
        case '4th' : return 'forth';
        case 'f' : return 'fortran';
        case 'f90' : return 'fortran';
        case 'fsi' : return 'fsharp';
        case 'ml' : return 'fsharp';
        case 'mli' : return 'fsharp';
        case 'fsx' : return 'fsharp';
        case 'fsscript' : return 'fsharp';
        case 'fsl' : return 'fsl';
        case 'ftl' : return 'ftl';
        case 'gcode' : return 'gcode';
        case 'feature' : return 'gherkin';
        case '^.gitignore' : return 'gitignore';
        case 'glsl' : return 'glsl';
        case 'frag' : return 'glsl';
        case 'vert' : return 'glsl';
        case 'gbs' : return 'gobstones';
        case 'go' : return 'golang';
        case 'gql' : return 'graphqlschema';
        case 'groovy' : return 'groovy';
        case 'haml' : return 'haml';
        case 'hbs' : return 'handlebars';
        case 'handlebars' : return 'handlebars';
        case 'mustache' : return 'handlebars';
        case 'hs' : return 'haskell';
        case 'cabal' : return 'haskell_cabal';
        case 'hx' : return 'haxe';
        case 'hjson' : return 'hjson';
        case 'html' : return 'html';
        case 'htm' : return 'html';
        case 'xhtml' : return 'html';
        case 'vue' : return 'html';
        case 'we' : return 'html';
        case 'wpy' : return 'html';
        case 'eex' : return 'html_elixir';
        case 'html.eex' : return 'html_elixir';
        case 'erb' : return 'html_ruby';
        case 'rhtml' : return 'html_ruby';
        case 'html.erb' : return 'html_ruby';
        case 'ini' : return 'ini';
        case 'conf' : return 'ini';
        case 'cfg' : return 'ini';
        case 'prefs' : return 'ini';
        case 'io' : return 'io';
        case 'jack' : return 'jack';
        case 'jade' : return 'jade';
        case 'pug' : return 'jade';
        case 'java' : return 'java';
        case 'js' : return 'javascript';
        case 'jsm' : return 'javascript';
        case 'jsx' : return 'javascript';
        case 'json' : return 'json';
        case 'jq' : return 'jsoniq';
        case 'jsp' : return 'jsp';
        case 'jssm' : return 'jssm';
        case 'jssm_state' : return 'jssm';
        case 'jl' : return 'julia';
        case 'kt|kts' : return 'kotlin';
        case 'latex' : return 'latex';
        case 'ltx' : return 'latex';
        case 'bib' : return 'latex';
        case 'less' : return 'less';
        case 'liquid' : return 'liquid';
        case 'lisp' : return 'lisp';
        case 'ls' : return 'livescript';
        case 'logic' : return 'logiql';
        case 'lql' : return 'logiql';
        case 'lsl' : return 'lsl';
        case 'lua' : return 'lua';
        case 'lp' : return 'luapage';
        case 'lucene' : return 'lucene';
        case '^Makefile' : return 'makefile';
        case '^GNUmakefile' : return 'makefile';
        case '^makefile' : return 'makefile';
        case '^OCamlMakefile' : return 'makefile';
        case 'make' : return 'makefile';
        case 'md' : return 'markdown';
        case 'markdown' : return 'markdown';
        case 'mask' : return 'mask';
        case 'matlab' : return 'matlab';
        case 'mz' : return 'maze';
        case 'mel' : return 'mel';
        case 'mixal' : return 'mixal';
        case 'mc' : return 'mushcode';
        case 'mush' : return 'mushcode';
        case 'mysql' : return 'mysql';
        case 'nix' : return 'nix';
        case 'nsi' : return 'nsis';
        case 'nsh' : return 'nsis';
        case 'm' : return 'objectivec';
        case 'mm' : return 'objectivec';
        case 'pas' : return 'pascal';
        case 'p' : return 'pascal';
        case 'pl' : return 'perl';
        case 'pm' : return 'perl';
        case 'p6' : return 'perl6';
        case 'pl6' : return 'perl6';
        case 'pm6' : return 'perl6';
        case 'pgsql' : return 'pgsql';
        case 'blade.php' : return 'php_laravel_blade';
        case 'php' : return 'php';
        case 'inc' : return 'php';
        case 'phtml' : return 'php';
        case 'shtml' : return 'php';
        case 'php3' : return 'php';
        case 'php4' : return 'php';
        case 'php5' : return 'php';
        case 'phps' : return 'php';
        case 'phpt' : return 'php';
        case 'aw' : return 'php';
        case 'ctp' : return 'php';
        case 'module' : return 'php';
        case 'epp' : return 'puppet';
        case 'pp' : return 'puppet';
        case 'pig' : return 'pig';
        case 'ps1' : return 'powershell';
        case 'praat' : return 'praat';
        case 'praatscript' : return 'praat';
        case 'psc' : return 'praat';
        case 'proc' : return 'praat';
        case 'plg' : return 'prolog';
        case 'prolog' : return 'prolog';
        case 'properties' : return 'properties';
        case 'proto' : return 'protobuf';
        case 'py' : return 'python';
        case 'r' : return 'r';
        case 'cshtml' : return 'razor';
        case 'asp' : return 'razor';
        case 'Rd' : return 'rdoc';
        case 'red' : return 'red';
        case 'reds' : return 'red';
        case 'Rhtml' : return 'rhtml';
        case 'rst' : return 'rst';
        case 'rb' : return 'ruby';
        case 'ru' : return 'ruby';
        case 'gemspec' : return 'ruby';
        case 'rake' : return 'ruby';
        case '^Guardfile' : return 'ruby';
        case '^Rakefile' : return 'ruby';
        case '^Gemfile' : return 'ruby';
        case 'rs' : return 'rust';
        case 'sass' : return 'sass';
        case 'scad' : return 'scad';
        case 'scala' : return 'scala';
        case 'scm' : return 'scheme';
        case 'sm' : return 'scheme';
        case 'rkt' : return 'scheme';
        case 'oak' : return 'scheme';
        case 'scheme' : return 'scheme';
        case 'scss' : return 'scss';
        case 'sh' : return 'sh';
        case 'bash' : return 'sh';
        case '^.bashrc' : return 'sh';
        case 'sjs' : return 'sjs';
        case 'slim' : return 'slim';
        case 'skim' : return 'slim';
        case 'smarty' : return 'smarty';
        case 'tpl' : return 'smarty';
        case 'snippets' : return 'snippets';
        case 'soy' : return 'soy_template';
        case 'space' : return 'space';
        case 'sql' : return 'sql';
        case 'sqlserver' : return 'sqlserver';
        case 'styl' : return 'stylus';
        case 'stylus' : return 'stylus';
        case 'svg' : return 'svg';
        case 'swift' : return 'swift';
        case 'tcl' : return 'tcl';
        case 'tf, tfvars, terragrunt' : return 'terraform';
        case 'tex' : return 'tex';
        case 'txt' : return 'text';
        case 'textile' : return 'textile';
        case 'toml' : return 'toml';
        case 'tsx' : return 'tsx';
        case 'latte' : return 'twig';
        case 'twig' : return 'twig';
        case 'swig' : return 'twig';
        case 'ts' : return 'typescript';
        case 'typescript' : return 'typescript';
        case 'str' : return 'typescript';
        case 'vala' : return 'vala';
        case 'vbs' : return 'vbscript';
        case 'vb' : return 'vbscript';
        case 'vm' : return 'velocity';
        case 'v' : return 'verilog';
        case 'vh' : return 'verilog';
        case 'sv' : return 'verilog';
        case 'svh' : return 'verilog';
        case 'vhd' : return 'vhdl';
        case 'vhdl' : return 'vhdl';
        case 'vfp' : return 'visualforce';
        case 'component' : return 'visualforce';
        case 'page' : return 'visualforce';
        case 'wlk' : return 'wollok';
        case 'wpgm' : return 'wollok';
        case 'wtest' : return 'wollok';
        case 'xml' : return 'xml';
        case 'rdf' : return 'xml';
        case 'rss' : return 'xml';
        case 'wsdl' : return 'xml';
        case 'xslt' : return 'xml';
        case 'atom' : return 'xml';
        case 'mathml' : return 'xml';
        case 'mml' : return 'xml';
        case 'xul' : return 'xml';
        case 'xbl' : return 'xml';
        case 'xaml' : return 'xml';
        case 'xq' : return 'xquery';
        case 'yaml' : return 'yaml';
        case 'yml' : return 'yaml';
        default : return ''
    }
}