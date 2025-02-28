export default async function HashString(password:string){
    const encoder = new TextEncoder().encode(password)
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", encoder)
    const hashArray = await Array.from(new Uint8Array(hashBuffer))
    const hash = hashArray.map((b)=>b.toString(16).padStart(2, "0")).join("")
    return hash
}

