export default function parseExt(ext) {
    switch (ext) {
        case 'c' : return 'c_cpp';
        case 'cpp' : return 'c_cpp';
        case 'java' : return 'java';
        case 'js' : return 'javascript';
        case 'py' : return 'python';
        case 'css' : return 'css';
        case 'sass' : return 'sass';
        case 'cs' : return 'csharp';
        default : return ''
    }
}