export async function GET(_:Request,{params}:{params:Promise<{name:string}>}){
 await params;
 return new Response(null,{status:404});
}
