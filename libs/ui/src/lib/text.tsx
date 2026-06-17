interface Props {
  text: string;
  invert?: boolean;
  setHeight?: boolean;
}

export const Text = (props: Props) => {
  return (
    <>
      <style jsx>
      {
        `
        .text {
          color: var(--text-color);
        }

        .invert {
          color: var(--text-color-invert);
        }

        .set-height {
          height: var(base-unit);
        }

        `
      }
      </style>
      <span className={
        'text'
        + (props.invert?' invert':'')
        + (props.setHeight?' set-height':'')
      }>{props.text}</span>
    </>
  )
}
