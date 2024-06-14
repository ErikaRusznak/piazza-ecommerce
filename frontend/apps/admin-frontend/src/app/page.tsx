"use client";

const Home = () => {
    return (
        <div style={{margin: 100}}>
            <ButtonsWithDifferentLabels />
        </div>
    );
}

const StyledButton = ({label} : {label: string}) => {
    return (
        <button style={{backgroundColor: "plum", color: "white"}}>
            {label}
        </button>
    );
};

const ButtonsWithDifferentLabels = () => {
    return (
        <div style={{display: "flex", gap: 10}}>
            <StyledButton label="First Button" />
            <StyledButton label="Second Button" />
        </div>
    );
};

export default Home;