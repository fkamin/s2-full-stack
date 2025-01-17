import { Navbar } from "../components/Navbar"

const myStyle = {
    textAlign: "center",
    color: "white"
}

export function NotFoundPage() {
    return (
        <>
            <Navbar />
            <h1 style={myStyle}>404</h1>
            <h1 style={myStyle}>Szukana strona nie istnieje</h1>
        </>
    )
}