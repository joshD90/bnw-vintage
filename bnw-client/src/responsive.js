import { css } from "styled-components";
//sets up an easy to use function that creates a breakpoint
//breakpoint for mobile phone
export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 480px) {
      ${props}
    } ;
  `;
};
//breakpoint for ipad
export const ipad = (props) => {
  return css`
    @media only screen and (max-width: 767px) and (min-width: 481px) {
      ${props}
    }
  `;
};
//breakpoint to include both mobile and ipad
export const ipadAndMobile = (props) => {
  return css`
    @media only screen and (max-width: 767px) {
      ${props}
    }
  `;
};
//breakpoint to only relate to something larger than ipad (computer)
export const computer = (props) => {
  return css`
    @media only screen and (min-width: 768px) {
      ${props}
    }
  `;
};
