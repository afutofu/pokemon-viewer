import styled from "styled-components";

const Spinner = styled.div`
  position: relative;
  border: 16px solid #009565;
  border-top: 16px #004931 solid;
  border-radius: 50%;
  height: 120px;
  width: 120px;
  animation: spin 1s linear infinite;

  @media only screen and (max-width: 450px) {
    top: 0;
    left: 0;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Spinner;
