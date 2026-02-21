export function verifiyPageNumber(arg?: string){
    return arg ? parseInt(arg as string) : 1;
}
