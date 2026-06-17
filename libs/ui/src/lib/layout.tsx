import { PropsWithChildren  } from "react";

interface Props extends PropsWithChildren {
  gap?: boolean;
  column?: boolean;
  bgPrimary?: boolean;
  paddingBlockStart?: boolean;
  paddingBlockEnd?: boolean;
  paddingInlineStart?: boolean;
  paddingInlineEnd?: boolean;
  grow?: boolean;
  spaceBetween?: boolean;
}

export const Layout = (props: Props) => {
  return (
    <>
      <style jsx>
        {
          `
        .flex {
          display: flex;
        }

        .column {
          flex-direction: column;
        }

        .gap {
          gap: calc(var(--base-unit) / 8);
        }

        .bg-primary {
          background-color: var(--primary-color);
        }

        .padding-block-start {
          padding-block-start: var(--base-padding);
        }

        .padding-block-end {
          padding-block-end: var(--base-padding);
        }

        .padding-inline-start {
          padding-inline-start: var(--base-padding);
        }

        .padding-inline-end {
          padding-inline-end: calc(var(--base-unit) / 8);
        }

        .grow {
          flex-grow: 1;
        }

        .space-between {
          justify-content: space-between;
        }

          `
        }
      </style>

      <section className={
        'flex'
        + (props.column?' column':'')
        + (props.gap?' gap':'')
        + (props.bgPrimary?' bg-primary':'')
        + (props.paddingBlockStart?' padding-block-start':'')
        + (props.paddingBlockEnd?' padding-block-end':'')
        + (props.paddingInlineStart?' padding-inline-start':'')
        + (props.paddingInlineEnd?' padding-inline-end':'')
        + (props.grow?' grow':'')
        + (props.spaceBetween?' space-between':'')
      }>
        {props.children}
      </section>
    </>
  )
}
