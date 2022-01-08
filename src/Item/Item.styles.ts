import styled from "styled-components";

export const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	width: 100%;
	border: 1px solid light blue;
	border-radius: 20px;
	height: 100%;

	button {
        display: block;
        width: 100%;
        border-radius:20px;
        padding: 0.5em 0.75em
	}

    button:hover,
    button:focus {
        background-color: lightgray;
        border-color: darkgray;
        color: white
    }

    img {
        max-height: 250px;
        object-fit: cover;
        border-radius: 20px 20px 0 0;
    }

    div {
    font-family: Arial, Helvetica, sans-serif;
    padding: 1rem;
    height: 100%;

    }
}
`;
