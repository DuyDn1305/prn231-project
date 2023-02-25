interface GlobalProps {
    children: JSX.Element
}

function GlobalStyles({children} : GlobalProps) {
    return children;
}

export default GlobalStyles;