export default function parseExt(ext) {
    switch (ext) {
        case 'ada':
        case 'adb':
            return 'ada';
        case 'cpp':
        case 'c':
        case 'cc':
        case 'cxx':
        case 'h':
        case 'hh':
        case 'hpp':
        case 'hxx':
        case 'ino':
            return 'c_cpp';
        case 'cljs':
            return 'clojure';
        case 'CBL':
        case 'COB':
            return 'cobol';
        case 'coffee':
        case 'cf':
        case 'cson':
            return 'coffee';
        case 'cfm':
            return 'coldfusion';
        case 'cs':
            return 'csharp';
        case 'd':
        case 'di':
            return 'd';
        case 'dart':
            return 'dart';
        case 'e':
        case 'ge':
            return 'eiffel';
        case 'ejs':
            return 'ejs';
        case 'erl':
        case 'hrl':
            return 'erlang';
        case 'f':
        case 'f90':
            return 'fortran';
        case 'go':
            return 'golang';
        case 'groovy':
            return 'groovy';
        case 'hs':
            return 'haskell';
        case 'hx':
            return 'haxe';
        case 'java':
            return 'java';
        case 'js':
        case 'jsm':
            return 'javascript';
        case 'jsx':
            return 'jsx';
        case 'jl':
            return 'julia';
        case 'kt':
        case 'kts':
            return 'kotlin';
        case 'lisp':
            return 'lisp';
        case 'ls':
            return 'livescript';
        case 'lua':
            return 'lua';
        case 'matlab':
            return 'matlab';
        case 'm':
        case 'mm':
            return 'objectivec';
        case 'pas':
        case 'p':
            return 'pascal';
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
            return 'php';
        case 'ps1':
            return 'powershell';
        case 'py':
            return 'python';
        case 'r':
            return 'r';
        case 'rb':
        case 'ru':
        case 'gemspec':
        case 'rake':
            return 'ruby';
        case 'rs':
            return 'rust';
        case 'scala':
            return 'scala';
        case 'swift':
            return 'swift';
        case 'ts':
        case 'typescript':
        case 'str':
            return 'typescript';
        default:
            return '';
    }
}
