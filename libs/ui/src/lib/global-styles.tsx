import { PropsWithChildren } from "react";

export const GlobalStyles = (props: PropsWithChildren) => {
  return (
    <>
      <style jsx global>
        {
          `
            @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Condensed:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap');
          body {
            display: flex;
            width: 100vw;
            height: 100vh;
            font-family: "IBM Plex Sans Condensed", sans-serif;
          }

          :root {
            --base-unit: 48px;
            --base-radius: 4px;
            --base-padding: calc(var(--base-unit) / 8);


            --primary-color: #2050DD;
            --secondary-color: #747B91;
            --text-color: #1E1E11E;
            --text-color-invert: #FFFFFF;

            --severity-low-color: #F3CA33;
            --severity-mid-color: #F37333;
            --severity-high-color: #F33333;
            --severity-critical-color: #7033F3;
          }

          .grow {
            flex-grow: 1;
          }

          @media screen and (max-width: 768px) {
            :root {
              --base-unit: 32px;
            }
          }
          `
        }
      </style>
      {props.children}
    </>
  )
};
