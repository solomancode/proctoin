import { PropsWithChildren  } from "react";
import { useState } from 'react';

export const Aside = (props: PropsWithChildren) => {
  const [open, setOpen] = useState(false);
  const toggle = () => { setOpen(o => !o) }
  return (
    <>
      <style jsx>
        {
          `
          .aside {
            min-width: 300px;
          }


          @media screen and (max-width: 768px) {
            .aside {
              background-color: color-mix(in srgb, var(--secondary-color), white 90%);
              min-width: auto;
              width: var(--base-unit);
              border-inline-start: 3px solid var(--primary-color);
            }

            .aside.open {
              min-width: auto;
              position: fixed;
              right: 0;
              width: 80vw;
              height: 100vh;
            }

            .hide {
              display: none;
            }
          }
          `
        }
      </style>

      <section onClick={toggle} className={"aside" + (open?' open': '')}>
        <section className={open?'': 'hide'}>
          {props.children}
        </section>
      </section>
    </>
  )
}
